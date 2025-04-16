import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import { Ionicons } from '@expo/vector-icons';

const PokemonListScreen = ({ navigation }) => {
  const { 
    pokemonList, 
    loading, 
    error, 
    hasMore, 
    loadMorePokemon, 
    refreshPokemonList,
    searchPokemon,
    searchResults,
    isSearching,
    clearSearch
  } = usePokemonContext();
  
  const [searchTerm, setSearchTerm] = useState('');

  // Função para lidar com a busca
  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchPokemon(searchTerm);
    } else {
      clearSearch();
    }
  };

  // Função para limpar a busca
  const handleClearSearch = () => {
    setSearchTerm('');
    clearSearch();
  };

  // Função para navegar para a tela de detalhes
  const handlePokemonPress = (id) => {
    navigation.navigate('PokemonDetail', { id });
  };

  // Renderizar o rodapé da lista (indicador de carregamento)
  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color="#E63F34" />
      </View>
    );
  };

  // Renderizar mensagem de erro, se houver
  const renderError = () => {
    if (!error) return null;
    
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={refreshPokemonList}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Determinar qual lista mostrar com base no estado de busca
  const displayList = isSearching ? searchResults : pokemonList;

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar Pokémon por nome"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchTerm ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      
      {/* Mensagem de erro */}
      {renderError()}
      
      {/* Lista vazia quando buscando e não há resultados */}
      {isSearching && searchResults.length === 0 && !loading ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            Nenhum Pokémon encontrado com esse nome.
          </Text>
        </View>
      ) : null}
      
      {/* Lista de Pokémon */}
      <FlatList
        data={displayList}
        renderItem={({ item }) => (
          <PokemonCard 
            pokemon={item} 
            onPress={handlePokemonPress}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (!isSearching) {
            loadMorePokemon();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={loading && displayList.length > 0}
        onRefresh={refreshPokemonList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#E63F34',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 8,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#E63F34',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#E63F34',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});

export default PokemonListScreen; 