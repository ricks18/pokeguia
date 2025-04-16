// Utilidades para ajudar na formatação e processamento de dados

// Função para capitalizar a primeira letra de uma string
export const capitalize = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Formatação do ID do Pokémon para exibição (ex: #001)
export const formatPokemonId = (id) => {
  return `#${id.toString().padStart(3, '0')}`;
};

// Mapear tipos de Pokémon para cores
export const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  return typeColors[type] || '#777777';
};

// Converter hectogramas para quilogramas (peso do Pokémon)
export const formatWeight = (weight) => {
  return (weight / 10).toFixed(1) + ' kg';
};

// Converter decímetros para metros (altura do Pokémon)
export const formatHeight = (height) => {
  return (height / 10).toFixed(1) + ' m';
};

// Agrupar Pokémon por tipo
export const groupPokemonByType = (pokemonList, types) => {
  const grouped = {};
  
  types.forEach(type => {
    grouped[type.name] = [];
  });
  
  pokemonList.forEach(pokemon => {
    pokemon.tipos.forEach(tipo => {
      if (grouped[tipo]) {
        grouped[tipo].push(pokemon);
      }
    });
  });
  
  return grouped;
};

// Obter a descrição de um Pokémon em português
export const getPokemonDescription = async (pokemonId) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar descrição: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Tenta encontrar uma descrição em português
    const descriptions = data.flavor_text_entries.filter(
      entry => entry.language.name === 'pt-br' || entry.language.name === 'pt'
    );
    
    // Se não encontrar em português, usa inglês
    if (descriptions.length === 0) {
      const englishDescriptions = data.flavor_text_entries.filter(
        entry => entry.language.name === 'en'
      );
      return englishDescriptions.length > 0 
        ? englishDescriptions[0].flavor_text 
        : 'Descrição não disponível';
    }
    
    // Limpar caracteres de nova linha e tabulação que podem estar presentes na API
    return descriptions[0].flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
  } catch (error) {
    console.error('Erro ao buscar descrição do Pokémon:', error);
    return 'Descrição não disponível';
  }
}; 