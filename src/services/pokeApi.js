// Serviço para comunicação com a PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Função para obter dados de um Pokémon específico por ID ou nome
 * @param {string|number} idOrName - ID ou nome do Pokémon
 * @returns {Promise<Object>} - Dados do Pokémon formatados
 */
export const getPokemonDetails = async (idOrName) => {
  try {
    // Validação de entrada
    if (!idOrName) {
      throw new Error('ID ou nome do Pokémon é obrigatório');
    }
    
    const url = `${BASE_URL}/pokemon/${idOrName}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorMsg = `Erro ao buscar Pokémon: ${response.status}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const data = await response.json();
    
    // Verificação de segurança para sprites com fallbacks adicionais
    const officialArtwork = data.sprites?.other?.["official-artwork"]?.front_default;
    const dreamWorld = data.sprites?.other?.dream_world?.front_default;
    const fallbackImage = data.sprites?.front_default;
    const homeImage = data.sprites?.other?.home?.front_default;
    
    const pokemonData = {
      id: data.id,
      nome: data.name,
      tipos: data.types?.map(type => type.type.name) || [],
      altura: data.height || 0,
      peso: data.weight || 0,
      vida: data.stats?.[0]?.base_stat || 0,
      ataque: data.stats?.[1]?.base_stat || 0,
      defesa: data.stats?.[2]?.base_stat || 0,
      velocidade: data.stats?.[5]?.base_stat || 0,
      img: officialArtwork || homeImage || dreamWorld || fallbackImage || null,
      habilidades: data.abilities?.map(ability => ability.ability.name) || [],
    };
    
    return pokemonData;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do Pokémon ${idOrName}:`, error.message);
    throw error;
  }
};

/**
 * Função para obter lista de Pokémon com paginação
 * @param {number} limit - Limite de registros a serem retornados
 * @param {number} offset - Registro inicial
 * @returns {Promise<Object>} - Lista de Pokémon
 */
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    // Cache em memória para resultados
    if (!getPokemonList.cache) {
      getPokemonList.cache = {};
    }
    
    const cacheKey = `list_${limit}_${offset}`;
    
    // Verificar se os dados já estão em cache
    if (getPokemonList.cache[cacheKey]) {
      return getPokemonList.cache[cacheKey];
    }
    
    const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorMsg = `Erro ao buscar lista de Pokémon: ${response.status}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const data = await response.json();
    
    const result = {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results,
    };
    
    // Salvar no cache
    getPokemonList.cache[cacheKey] = result;
    
    return result;
  } catch (error) {
    console.error(`Erro ao buscar lista de Pokémon (limit: ${limit}, offset: ${offset}):`, error.message);
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

/**
 * Função para obter informações sobre as evoluções de um Pokémon
 * @param {number|string} pokemonId - ID do Pokémon
 * @returns {Promise<Object>} - Dados da cadeia evolutiva
 */
export const getEvolutionChain = async (pokemonId) => {
  try {
    // Cache em memória
    if (!getEvolutionChain.cache) {
      getEvolutionChain.cache = {};
    }
    
    // Verificar se os dados já estão em cache
    if (getEvolutionChain.cache[pokemonId]) {
      return getEvolutionChain.cache[pokemonId];
    }
    
    // Primeiro precisamos obter a espécie do Pokémon
    const speciesUrl = `${BASE_URL}/pokemon-species/${pokemonId}`;
    
    const speciesResponse = await fetch(speciesUrl);
    
    if (!speciesResponse.ok) {
      const errorMsg = `Erro ao buscar espécie: ${speciesResponse.status}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const speciesData = await speciesResponse.json();
    
    if (!speciesData.evolution_chain || !speciesData.evolution_chain.url) {
      console.warn(`Dados de cadeia evolutiva não disponíveis para o Pokémon ${pokemonId}`);
      throw new Error('Dados de cadeia evolutiva não disponíveis');
    }
    
    // A partir da espécie, obtemos a URL da cadeia evolutiva
    const evolutionUrl = speciesData.evolution_chain.url;
    
    const evolutionResponse = await fetch(evolutionUrl);
    
    if (!evolutionResponse.ok) {
      const errorMsg = `Erro ao buscar cadeia evolutiva: ${evolutionResponse.status}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const evolutionData = await evolutionResponse.json();
    
    // Salvar no cache
    getEvolutionChain.cache[pokemonId] = evolutionData;
    
    return evolutionData;
  } catch (error) {
    console.error(`Erro ao buscar cadeia evolutiva do Pokémon ${pokemonId}:`, error.message);
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