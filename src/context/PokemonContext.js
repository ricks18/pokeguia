import React, { createContext, useState, useEffect, useContext } from 'react';
import { getPokemonList, getPokemonDetails, getPokemonTypes } from '../services/pokeApi';

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

  // Carregar tipos de Pokémon ao iniciar
  useEffect(() => {
    loadTypes();
  }, []);

  // Carregar lista inicial de Pokémon
  useEffect(() => {
    loadPokemonList();
  }, []);

  // Carregar favoritos do armazenamento local
  useEffect(() => {
    loadFavorites();
  }, []);

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
  const loadPokemonList = async (reset = false) => {
    if (loading) return;
    
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
          
          return await getPokemonDetails(id);
        })
      );
      
      if (reset) {
        setPokemonList(detailedPokemonList);
      } else {
        setPokemonList(prevList => [...prevList, ...detailedPokemonList]);
      }
      
      setOffset(newOffset + limit);
    } catch (err) {
      console.error('Erro ao carregar Pokémon:', err);
      setError('Não foi possível carregar a lista de Pokémon');
    } finally {
      setLoading(false);
    }
  };

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
      console.error('Erro ao buscar Pokémon:', err);
      setError('Não foi possível buscar o Pokémon');
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar favoritos do armazenamento local
  const loadFavorites = async () => {
    try {
      // Implementar lógica de armazenamento local (AsyncStorage)
      // Por enquanto, apenas inicializa vazio
      setFavorites([]);
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  // Função para alternar um Pokémon como favorito
  const toggleFavorite = async (pokemonId) => {
    try {
      if (favorites.includes(pokemonId)) {
        // Remover dos favoritos
        setFavorites(prevFavorites => 
          prevFavorites.filter(id => id !== pokemonId)
        );
      } else {
        // Adicionar aos favoritos
        setFavorites(prevFavorites => [...prevFavorites, pokemonId]);
      }
      
      // Implementar lógica para salvar no armazenamento local (AsyncStorage)
    } catch (err) {
      console.error('Erro ao atualizar favoritos:', err);
    }
  };

  // Verificar se um Pokémon é favorito
  const isFavorite = (pokemonId) => {
    return favorites.includes(pokemonId);
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
    loadMorePokemon,
    refreshPokemonList,
    searchPokemon,
    toggleFavorite,
    clearSearch,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContext; 