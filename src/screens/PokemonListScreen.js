import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import { Ionicons } from '@expo/vector-icons';

/**
 * Tela de listagem de Pokémon com busca integrada
 */
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
    clearSearch,
    refreshing
  } = usePokemonContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  // Verificar o estado inicial da lista de Pokémon
  useEffect(() => {
    if (pokemonList.length > 0 && initialLoad) {
      setInitialLoad(false);
      console.log(`Lista inicial carregada com ${pokemonList.length} Pokémon`);
    }
  }, [pokemonList, initialLoad]);

  // Função para lidar com a busca
  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log(`Realizando busca por: "${searchTerm}"`);
      searchPokemon(searchTerm);
    } else {
      console.log('Termo de busca vazio, limpando resultados');
      handleClearSearch();
    }
  };

  // Função para limpar a busca
  const handleClearSearch = () => {
    console.log('Limpando campo de busca e resultados');
    setSearchTerm('');
    clearSearch();
  };

  // Função para navegar para a tela de detalhes
  const handlePokemonPress = (id) => {
    console.log(`Navegando para detalhes do Pokémon #${id}`);
    navigation.navigate('PokemonDetail', { id });
  };

  // Função para tentar novamente após erro
  const handleRetry = () => {
    console.log('Tentando recarregar a lista de Pokémon');
    Alert.alert(
      'Recarregar dados',
      'Tentando recarregar os dados do servidor. Por favor, aguarde...',
      [{ text: 'OK' }]
    );
    refreshPokemonList();
  };

  // Renderizar o rodapé da lista (indicador de carregamento)
  const renderFooter = () => {
    if (!loading || isSearching) return null;
    
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color="#E63F34" />
        <Text style={styles.loadingText}>Carregando mais Pokémon...</Text>
      </View>
    );
  };

  // Renderizar mensagem de erro, se houver
  const renderError = () => {
    if (!error) return null;
    
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={50} color="#E63F34" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={handleRetry}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Determinar qual lista mostrar com base no estado de busca
  const displayList = isSearching ? searchResults : pokemonList;

  // Renderizar tela de carregamento inicial
  if (initialLoad && loading && pokemonList.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E63F34" />
        <Text style={styles.loadingText}>Carregando Pokédex...</Text>
      </View>
    );
  }

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
            autoCapitalize="none"
            autoCorrect={false}
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
          <Ionicons name="search-outline" size={50} color="#666" />
          <Text style={styles.noResultsText}>
            Nenhum Pokémon encontrado com "{searchTerm}".
          </Text>
          <TouchableOpacity 
            style={styles.clearSearchButton}
            onPress={handleClearSearch}
          >
            <Text style={styles.clearSearchButtonText}>Limpar Busca</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      
      {/* Lista de Pokémon */}
      {displayList.length > 0 || loading ? (
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
            if (!isSearching && hasMore) {
              console.log('Fim da lista atingido, carregando mais itens...');
              loadMorePokemon();
            }
          }}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={() => {
            console.log('Atualizando lista por pull-to-refresh');
            refreshPokemonList();
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      ) : (
        // Lista vazia quando não há resultados de busca nem itens na lista principal
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={50} color="#666" />
          <Text style={styles.emptyText}>Nenhum Pokémon encontrado.</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Recarregar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
    marginTop: 10,
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
    marginTop: 10,
    marginBottom: 20,
  },
  clearSearchButton: {
    backgroundColor: '#666',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearSearchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  }
});

export default PokemonListScreen; 