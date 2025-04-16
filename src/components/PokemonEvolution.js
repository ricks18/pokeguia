import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { capitalize, formatPokemonId } from '../utils/helpers';
import { ROUTES } from '../navigation/types';

/**
 * Componente para exibir a cadeia evolutiva de um Pokémon
 * 
 * @param {Object} props
 * @param {Array} props.evolutionChain - Array de objetos da cadeia evolutiva processada
 * @param {Object} props.navigation - Objeto de navegação
 */
const PokemonEvolution = ({ evolutionChain, navigation }) => {
  if (!evolutionChain || evolutionChain.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Informações de evolução não disponíveis</Text>
      </View>
    );
  }

  // Função para navegar para a tela de detalhes de um Pokémon
  const navigateToPokemon = (id) => {
    console.log(`Navegando para Pokémon #${id} a partir da cadeia evolutiva`);
    navigation.navigate(ROUTES.POKEDEX, {
      screen: 'PokemonDetail',
      params: { id }
    });
  };

  // Função para formatar o nome do item
  const formatItemName = (itemName) => {
    if (!itemName) return '';
    return itemName.split('-').map(capitalize).join(' ');
  };

  // Função para renderizar o detalhe da evolução
  const renderEvolutionDetails = (pokemon, nextPokemon) => {
    if (!nextPokemon) return null;

    let evolutionMethod = '';

    if (nextPokemon.min_level) {
      evolutionMethod = `Nível ${nextPokemon.min_level}`;
    } else if (nextPokemon.item) {
      evolutionMethod = `${formatItemName(nextPokemon.item)}`;
    } else if (nextPokemon.trigger === 'trade') {
      evolutionMethod = 'Troca';
    } else if (nextPokemon.trigger === 'use-item') {
      evolutionMethod = `Item: ${formatItemName(nextPokemon.item) || '???'}`;
    } else if (nextPokemon.trigger === 'level-up') {
      evolutionMethod = 'Subir de Nível';
    } else if (nextPokemon.trigger === 'shed') {
      evolutionMethod = 'Evolução Especial';
    } else {
      evolutionMethod = 'Evolução';
    }

    return (
      <View style={styles.evolutionDetails}>
        <Ionicons name="arrow-forward" size={20} color="#666" />
        <Text style={styles.evolutionMethod}>{evolutionMethod}</Text>
      </View>
    );
  };

  // Renderizar cada fase da evolução
  return (
    <View style={styles.container}>
      {evolutionChain.map((pokemon, index) => (
        <View key={pokemon.species_id} style={styles.evolutionRow}>
          <TouchableOpacity
            style={styles.pokemonContainer}
            onPress={() => navigateToPokemon(pokemon.species_id)}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ 
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.species_id}.png` 
                }}
                style={styles.pokemonImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.pokemonId}>{formatPokemonId(pokemon.species_id)}</Text>
            <Text style={styles.pokemonName}>{capitalize(pokemon.species_name)}</Text>
          </TouchableOpacity>

          {/* Mostrar método de evolução entre Pokémon */}
          {index < evolutionChain.length - 1 && renderEvolutionDetails(pokemon, evolutionChain[index + 1])}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  evolutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pokemonContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    width: 120,
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImage: {
    width: 70,
    height: 70,
  },
  pokemonId: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3,
    textAlign: 'center',
  },
  evolutionDetails: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  evolutionMethod: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  }
});

export default PokemonEvolution; 