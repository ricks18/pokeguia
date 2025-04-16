import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    searchPokemon, 
    searchResults, 
    isSearching, 
    loading, 
    clearSearch 
  } = usePokemonContext();

  // Realizar busca
  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchPokemon(searchTerm);
    }
  };

  // Limpar busca
  const handleClearSearch = () => {
    setSearchTerm('');
    clearSearch();
  };

  // Navegar para detalhes do Pokémon
  const handlePokemonPress = (id) => {
    navigation.navigate('PokemonDetail', { id });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Buscar Pokémon</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do Pokémon"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus={true}
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
          disabled={!searchTerm.trim() || loading}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E63F34" />
        </View>
      ) : isSearching && searchResults.length === 0 ? (
        <View style={styles.centerContainer}>
          <Image
            source={{ uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/129.png' }}
            style={styles.notFoundImage}
            resizeMode="contain"
          />
          <Text style={styles.notFoundText}>
            Nenhum Pokémon encontrado para "{searchTerm}".
          </Text>
          <Text style={styles.notFoundSubtext}>
            Tente verificar a ortografia ou busque por outro nome.
          </Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={handlePokemonPress}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.initialText}>
            Digite o nome do Pokémon que deseja encontrar.
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E63F34',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  searchInputContainer: {
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
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.7,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  notFoundSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  initialText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 16,
  },
});

export default SearchScreen; 