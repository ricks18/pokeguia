/**
 * Utilidades para processamento de cadeias evolutivas de Pokémon
 */

/**
 * Processa os dados brutos da cadeia evolutiva retornados pela API
 * e converte em um formato adequado para o componente PokemonEvolution
 * 
 * @param {Object} evolutionChain - Dados brutos da cadeia evolutiva
 * @returns {Array} - Array de objetos contendo dados de cada evolução
 */
export const processEvolutionChain = (evolutionChain) => {
  if (!evolutionChain || !evolutionChain.chain) {
    return [];
  }

  const evolutions = [];
  
  // Função recursiva para extrair evoluções
  const extractEvolutions = (currentChain) => {
    if (!currentChain.species) {
      return;
    }
    
    const speciesUrl = currentChain.species.url;
    const urlParts = speciesUrl.split('/');
    const speciesId = parseInt(urlParts[urlParts.length - 2]);
    
    evolutions.push({
      species_id: speciesId,
      species_name: currentChain.species.name,
      min_level: currentChain.evolution_details && currentChain.evolution_details[0]
        ? currentChain.evolution_details[0].min_level
        : null,
      trigger: currentChain.evolution_details && currentChain.evolution_details[0] 
        ? currentChain.evolution_details[0].trigger?.name
        : null,
      item: currentChain.evolution_details && currentChain.evolution_details[0]
        ? currentChain.evolution_details[0].item?.name
        : null
    });
    
    // Processar próximas evoluções recursivamente
    if (currentChain.evolves_to && currentChain.evolves_to.length > 0) {
      currentChain.evolves_to.forEach(nextEvolution => {
        extractEvolutions(nextEvolution);
      });
    }
  };
  
  // Iniciar a extração a partir da raiz da cadeia
  extractEvolutions(evolutionChain.chain);
  
  return evolutions;
}; 