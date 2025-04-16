import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { formatPokemonId, capitalize, getTypeColor } from '../utils/helpers';

const PokemonCard = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(pokemon.id)}>
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
        {pokemon.img && (
          <Image 
            source={{ uri: pokemon.img }} 
            style={styles.image} 
            resizeMode="contain"
          />
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  id: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default PokemonCard; 