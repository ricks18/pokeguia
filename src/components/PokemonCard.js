import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { formatPokemonId, capitalize, getTypeColor } from '../utils/helpers';

const PokemonCard = ({ pokemon, onPress }) => {
  // Determina a cor de fundo do card com base no primeiro tipo do Pokémon
  const backgroundColor = pokemon.tipos && pokemon.tipos.length > 0
    ? `${getTypeColor(pokemon.tipos[0])}33` // Adiciona transparência à cor
    : '#f5f5f5';

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor }]} 
      activeOpacity={0.7}
      onPress={() => onPress(pokemon.id)}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.nome)}</Text>
        
        <View style={styles.typesContainer}>
          {pokemon.tipos && pokemon.tipos.map((tipo, index) => (
            <View 
              key={index} 
              style={[styles.typeTag, { backgroundColor: getTypeColor(tipo) }]}
            >
              <Text style={styles.typeText}>{capitalize(tipo)}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        {pokemon.img ? (
          <Image 
            source={{ uri: pokemon.img }} 
            style={styles.image} 
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 8,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  id: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 4,
    fontWeight: '600',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.3)',
  }
});

export default PokemonCard; 