// Serviço para comunicação com a PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2';

// Função para obter dados de um Pokémon específico por ID ou nome
export const getPokemonDetails = async (idOrName) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    const data = await response.json();
    
    return {
      id: data.id,
      nome: data.name,
      tipos: data.types.map(type => type.type.name),
      altura: data.height,
      peso: data.weight,
      vida: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defesa: data.stats[2].base_stat,
      velocidade: data.stats[5].base_stat,
      img: data.sprites.other["official-artwork"].front_default,
      habilidades: data.abilities.map(ability => ability.ability.name),
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
    throw error;
  }
};

// Função para obter lista de Pokémon com paginação
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    
    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results,
    };
  } catch (error) {
    console.error("Erro ao buscar lista de Pokémon:", error);
    throw error;
  }
};

// Função para obter tipos de Pokémon
export const getPokemonTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/type`);
    const data = await response.json();
    
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar tipos de Pokémon:", error);
    throw error;
  }
};

// Função para obter informações de um tipo específico
export const getTypeDetails = async (typeId) => {
  try {
    const response = await fetch(`${BASE_URL}/type/${typeId}`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do tipo:", error);
    throw error;
  }
};

// Função para obter informações sobre as evoluções de um Pokémon
export const getEvolutionChain = async (pokemonId) => {
  try {
    // Primeiro precisamos obter a espécie do Pokémon
    const speciesResponse = await fetch(`${BASE_URL}/pokemon-species/${pokemonId}`);
    const speciesData = await speciesResponse.json();
    
    // A partir da espécie, obtemos a URL da cadeia evolutiva
    const evolutionUrl = speciesData.evolution_chain.url;
    const evolutionResponse = await fetch(evolutionUrl);
    const evolutionData = await evolutionResponse.json();
    
    return evolutionData;
  } catch (error) {
    console.error("Erro ao buscar cadeia evolutiva:", error);
    throw error;
  }
};

// Função para obter informações sobre regiões de Pokémon
export const getRegions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/region`);
    const data = await response.json();
    
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar regiões:", error);
    throw error;
  }
};

// Função para obter informações detalhadas sobre uma região específica
export const getRegionDetails = async (regionId) => {
  try {
    const response = await fetch(`${BASE_URL}/region/${regionId}`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da região:", error);
    throw error;
  }
}; 