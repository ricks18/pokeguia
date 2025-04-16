import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemonList, getPokemonDetails, getPokemonTypes } from '../services/pokeApi';

// Chave para armazenamento dos favoritos
const FAVORITES_STORAGE_KEY = '@pokedex:favorites';

// Criando o contexto
const PokemonContext = createContext();

// Hook personalizado para usar o contexto
export const usePokemonContext = () => useContext(PokemonContext);

// Provedor do contexto
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

  // Função para carregar tipos de Pokémon
  const loadTypes = async () => {
    try {
      const typesData = await getPokemonTypes();
      setTypes(typesData);
    } catch (err) {
      setError('Não foi possível carregar os tipos de Pokémon');
    }
  };

  // Função para carregar lista de Pokémon
  const loadPokemonList = async (reset = false) => {
    if (loading) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const newOffset = reset ? 0 : offset;
      const limit = 20;
      
      const data = await getPokemonList(limit, newOffset);
      
      // Verificar se há mais Pokémon para carregar
      setHasMore(data.next !== null);
      
      // Buscar detalhes de cada Pokémon na lista
      const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          // Extrair ID do Pokémon da URL
          const urlParts = pokemon.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2]);
          
          try {
            const details = await getPokemonDetails(id);
            return details;
          } catch (detailError) {
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
      
      if (reset) {
        setPokemonList(detailedPokemonList);
      } else {
        setPokemonList(prevList => [...prevList, ...detailedPokemonList]);
      }
      
      setOffset(newOffset + limit);
    } catch (err) {
      setError('Não foi possível carregar a lista de Pokémon');
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar favoritos no AsyncStorage
  const saveFavorites = async (favoritesToSave) => {
    try {
      const jsonValue = JSON.stringify(favoritesToSave);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, jsonValue);
    } catch (err) {
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
      }
    } catch (err) {
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
      
      // Buscar na lista já carregada primeiro (otimização)
      const filteredList = pokemonList.filter(pokemon => 
        pokemon.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(filteredList);
    } catch (err) {
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
      loadPokemonList();
    }
  };

  // Recarregar a lista
  const refreshPokemonList = () => {
    setOffset(0);
    loadPokemonList(true);
  };

  // Limpar pesquisa
  const clearSearch = () => {
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