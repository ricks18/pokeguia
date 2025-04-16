// Serviço para comunicação com a PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2';

// Função para obter dados de um Pokémon específico por ID ou nome
export const getPokemonDetails = async (idOrName) => {
  try {
    const url = `${BASE_URL}/pokemon/${idOrName}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorMsg = `Erro ao buscar Pokémon: ${response.status}`;
      throw new Error(errorMsg);
    }
    
    const data = await response.json();
    
    // Verificação de segurança para sprites
    const officialArtwork = data.sprites?.other?.["official-artwork"]?.front_default;
    const fallbackImage = data.sprites?.front_default;
    
    const pokemonData = {
      id: data.id,
      nome: data.name,
      tipos: data.types.map(type => type.type.name),
      altura: data.height,
      peso: data.weight,
      vida: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defesa: data.stats[2].base_stat,
      velocidade: data.stats[5].base_stat,
      img: officialArtwork || fallbackImage || null,
      habilidades: data.abilities.map(ability => ability.ability.name),
    };
    
    return pokemonData;
  } catch (error) {
    throw error;
  }
};

// Função para obter lista de Pokémon com paginação
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorMsg = `Erro ao buscar lista de Pokémon: ${response.status}`;
      throw new Error(errorMsg);
    }
    
    const data = await response.json();
    
    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results,
    };
  } catch (error) {
    throw error;
  }
};

// Função para obter tipos de Pokémon
export const getPokemonTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/type`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar tipos: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.results;
  } catch (error) {
    throw error;
  }
};

// Função para obter informações de um tipo específico
export const getTypeDetails = async (typeId) => {
  try {
    const response = await fetch(`${BASE_URL}/type/${typeId}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes do tipo: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    throw error;
  }
};

// Função para obter informações sobre as evoluções de um Pokémon
export const getEvolutionChain = async (pokemonId) => {
  try {
    // Primeiro precisamos obter a espécie do Pokémon
    const speciesUrl = `${BASE_URL}/pokemon-species/${pokemonId}`;
    
    const speciesResponse = await fetch(speciesUrl);
    
    if (!speciesResponse.ok) {
      const errorMsg = `Erro ao buscar espécie: ${speciesResponse.status}`;
      throw new Error(errorMsg);
    }
    
    const speciesData = await speciesResponse.json();
    
    if (!speciesData.evolution_chain || !speciesData.evolution_chain.url) {
      throw new Error('Dados de cadeia evolutiva não disponíveis');
    }
    
    // A partir da espécie, obtemos a URL da cadeia evolutiva
    const evolutionUrl = speciesData.evolution_chain.url;
    
    const evolutionResponse = await fetch(evolutionUrl);
    
    if (!evolutionResponse.ok) {
      const errorMsg = `Erro ao buscar cadeia evolutiva: ${evolutionResponse.status}`;
      throw new Error(errorMsg);
    }
    
    const evolutionData = await evolutionResponse.json();
    
    return evolutionData;
  } catch (error) {
    throw error;
  }
};

// Função para obter informações sobre regiões de Pokémon
export const getRegions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/region`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar regiões: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.results;
  } catch (error) {
    throw error;
  }
};

// Função para obter informações detalhadas sobre uma região específica
export const getRegionDetails = async (regionId) => {
  try {
    const response = await fetch(`${BASE_URL}/region/${regionId}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes da região: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    throw error;
  }
}; 