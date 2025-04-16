import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { usePokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

const FavoritesScreen = ({ navigation }) => {
  const { pokemonList, favorites, isFavorite } = usePokemonContext();
  
  // Filtrar apenas os Pokémon favoritos
  const favoritePokemon = pokemonList.filter(pokemon => isFavorite(pokemon.id));
  
  // Navegar para detalhes do Pokémon
  const handlePokemonPress = (id) => {
    navigation.navigate('PokemonDetail', { id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Favoritos</Text>
        <Text style={styles.subtitle}>
          Seus Pokémon favoritos salvos em um só lugar.
        </Text>
      </View>
      
      {favoritePokemon.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{ uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' }}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>
            Você ainda não adicionou nenhum Pokémon aos favoritos.
          </Text>
          <Text style={styles.emptySubtext}>
            Visite a Pokédex e toque no ícone de coração para adicionar favoritos.
          </Text>
          <TouchableOpacity 
            style={styles.pokedexButton}
            onPress={() => navigation.navigate('Pokedex')}
          >
            <Text style={styles.pokedexButtonText}>Ir para Pokédex</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favoritePokemon}
          renderItem={({ item }) => (
            <PokemonCard 
              pokemon={item}
              onPress={handlePokemonPress}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#E63F34',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  pokedexButton: {
    backgroundColor: '#E63F34',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  pokedexButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FavoritesScreen; 