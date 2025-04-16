import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemonList, getPokemonDetails, getPokemonTypes } from '../services/pokeApi';

// Chave para armazenamento dos favoritos
const FAVORITES_STORAGE_KEY = '@pokedex:favorites';

// Criando o contexto
const PokemonContext = createContext();

// Hook personalizado para usar o contexto
export const usePokemonContext = () => useContext(PokemonContext);

/**
 * Provedor do contexto de Pokémon
 * Gerencia o estado global da aplicação relacionado aos Pokémon
 */
export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [types, setTypes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Função para carregar tipos de Pokémon
  const loadTypes = async () => {
    try {
      const typesData = await getPokemonTypes();
      setTypes(typesData);
    } catch (err) {
      console.error('Erro ao carregar tipos:', err);
      setError('Não foi possível carregar os tipos de Pokémon');
    }
  };

  // Função para carregar lista de Pokémon
  const loadPokemonList = useCallback(async (reset = false) => {
    if (loading && !refreshing) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const newOffset = reset ? 0 : offset;
      const limit = 20;
      
      console.log(`Carregando lista de Pokémon: limit=${limit}, offset=${newOffset}`);
      const data = await getPokemonList(limit, newOffset);
      
      // Verificar se há mais Pokémon para carregar
      setHasMore(data.next !== null);
      
      console.log(`Total de Pokémon disponíveis: ${data.count}`);
      console.log(`Resultados obtidos: ${data.results.length}`);
      
      // Buscar detalhes de cada Pokémon na lista
      const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          // Extrair ID do Pokémon da URL
          const urlParts = pokemon.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2]);
          
          try {
            console.log(`Carregando detalhes do Pokémon #${id}: ${pokemon.name}`);
            const details = await getPokemonDetails(id);
            return details;
          } catch (detailError) {
            console.error(`Erro ao carregar detalhes do Pokémon #${id}:`, detailError);
            return {
              id,
              nome: pokemon.name,
              tipos: [],
              img: null,
              habilidades: []
            };
          }
        })
      );
      
      console.log(`Pokémon carregados com detalhes: ${detailedPokemonList.length}`);
      
      if (reset) {
        setPokemonList(detailedPokemonList);
      } else {
        setPokemonList(prevList => [...prevList, ...detailedPokemonList]);
      }
      
      setOffset(newOffset + limit);
    } catch (err) {
      console.error('Erro ao carregar lista de Pokémon:', err);
      setError('Não foi possível carregar a lista de Pokémon');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading, offset, refreshing]);

  // Função para salvar favoritos no AsyncStorage
  const saveFavorites = async (favoritesToSave) => {
    try {
      const jsonValue = JSON.stringify(favoritesToSave);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, jsonValue);
      console.log(`${favoritesToSave.length} Pokémon favoritos salvos com sucesso`);
    } catch (err) {
      console.error('Erro ao salvar favoritos:', err);
      // Falha ao salvar favoritos localmente será tratada silenciosamente
    }
  };

  // Função para carregar favoritos do armazenamento local
  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (jsonValue !== null) {
        const storedFavorites = JSON.parse(jsonValue);
        setFavorites(storedFavorites);
        console.log(`${storedFavorites.length} Pokémon favoritos carregados`);
      }
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
      // Tratar erro silenciosamente
    }
  };

  // Carregar tipos de Pokémon ao iniciar
  useEffect(() => {
    loadTypes();
  }, []);

  // Carregar lista inicial de Pokémon
  useEffect(() => {
    loadPokemonList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Carregar favoritos do armazenamento local
  useEffect(() => {
    loadFavorites();
  }, []);

  // Função para buscar Pokémon por nome
  const searchPokemon = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);
      
      console.log(`Buscando Pokémon com termo: "${searchTerm}"`);
      
      // Buscar na lista já carregada primeiro (otimização)
      const filteredList = pokemonList.filter(pokemon => 
        pokemon.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      console.log(`Resultados encontrados: ${filteredList.length}`);
      setSearchResults(filteredList);
    } catch (err) {
      console.error('Erro na busca:', err);
      setError('Não foi possível buscar o Pokémon');
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar um Pokémon aos favoritos
  const addFavorite = (pokemon) => {
    if (!pokemon) return;
    
    setFavorites(prevFavorites => {
      // Verificar se o Pokémon já está nos favoritos
      const exists = prevFavorites.some(fav => fav.id === pokemon.id);
      if (exists) return prevFavorites;
      
      console.log(`Adicionando Pokémon #${pokemon.id} aos favoritos`);
      
      // Criar nova lista com o Pokémon adicionado
      const newFavorites = [...prevFavorites, pokemon];
      
      // Salvar no armazenamento local
      saveFavorites(newFavorites);
      
      return newFavorites;
    });
  };

  // Função para remover um Pokémon dos favoritos
  const removeFavorite = (pokemonId) => {
    setFavorites(prevFavorites => {
      console.log(`Removendo Pokémon #${pokemonId} dos favoritos`);
      
      // Filtrar o Pokémon a ser removido
      const newFavorites = prevFavorites.filter(pokemon => pokemon.id !== pokemonId);
      
      // Salvar no armazenamento local
      saveFavorites(newFavorites);
      
      return newFavorites;
    });
  };

  // Verificar se um Pokémon é favorito
  const isFavorite = (pokemonId) => {
    return favorites.some(pokemon => pokemon.id === parseInt(pokemonId));
  };

  // Carregar mais Pokémon (para paginação)
  const loadMorePokemon = () => {
    if (!loading && hasMore) {
      console.log('Carregando mais Pokémon...');
      loadPokemonList();
    }
  };

  // Recarregar a lista
  const refreshPokemonList = () => {
    console.log('Recarregando lista de Pokémon...');
    setRefreshing(true);
    setOffset(0);
    loadPokemonList(true);
  };

  // Limpar pesquisa
  const clearSearch = () => {
    console.log('Limpando busca');
    setIsSearching(false);
    setSearchResults([]);
  };

  // Valores e funções expostos pelo contexto
  const value = {
    pokemonList,
    loading,
    error,
    hasMore,
    types,
    favorites,
    searchResults,
    isSearching,
    refreshing,
    isFavorite,
    addFavorite,
    removeFavorite,
    loadMorePokemon,
    refreshPokemonList,
    searchPokemon,
    clearSearch,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext; 