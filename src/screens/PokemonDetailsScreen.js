import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getPokemonDetails, getEvolutionChain } from '../services/pokeApi';
import { usePokemonContext } from '../context/PokemonContext';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import PokemonEvolution from '../components/PokemonEvolution';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { processEvolutionChain } from '../utils/evolutionUtils';
import { SCREENS } from '../navigation/types';

const PokemonDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = usePokemonContext();

  const pokemonIsFavorite = pokemon ? isFavorite(pokemon.id) : false;

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonDetails(id);
        setPokemon(data);

        // Carregar dados da evolução
        try {
          const evolutionData = await getEvolutionChain(id);
          
          // Processar cadeia evolutiva para formato correto
          const processedEvolution = processEvolutionChain(evolutionData);
          setEvolution(processedEvolution);
        } catch (evolutionError) {
          // Não definimos o erro principal aqui para não interromper 
          // a exibição do Pokemon mesmo sem evolução
        }
      } catch (err) {
        setError(`Erro ao carregar Pokémon: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonData();
  }, [id]);

  const toggleFavorite = () => {
    if (pokemon) {
      if (pokemonIsFavorite) {
        removeFavorite(pokemon.id);
      } else {
        addFavorite(pokemon);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B4CCA" />
        <Text style={styles.loadingText}>Carregando dados do Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={50} color="#CC0000" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Pokémon não encontrado.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.retryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
        <Text style={styles.pokemonName}>{pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1)}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Icon
            name={pokemonIsFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color={pokemonIsFavorite ? '#CC0000' : '#666'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {pokemon.img ? (
          <Image
            source={{ uri: pokemon.img }}
            style={styles.pokemonImage}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Icon name="image-off" size={100} color="#CCC" />
            <Text style={styles.noImageText}>Imagem não disponível</Text>
          </View>
        )}
      </View>

      <View style={styles.typesContainer}>
        {pokemon.tipos.map((tipo, index) => (
          <TypeBadge key={index} type={tipo} />
        ))}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Altura</Text>
            <Text style={styles.infoValue}>{(pokemon.altura / 10).toFixed(1)} m</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Peso</Text>
            <Text style={styles.infoValue}>{(pokemon.peso / 10).toFixed(1)} kg</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Estatísticas Base</Text>
        <StatBar label="HP" value={pokemon.vida} maxValue={255} color="#FF0000" />
        <StatBar label="Ataque" value={pokemon.ataque} maxValue={255} color="#F08030" />
        <StatBar label="Defesa" value={pokemon.defesa} maxValue={255} color="#F8D030" />
        <StatBar label="Velocidade" value={pokemon.velocidade} maxValue={255} color="#F85888" />
      </View>

      <View style={styles.abilitiesContainer}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.abilitiesList}>
          {pokemon.habilidades.map((habilidade, index) => (
            <View key={index} style={styles.abilityItem}>
              <Text style={styles.abilityText}>
                {habilidade.charAt(0).toUpperCase() + habilidade.slice(1).replace('-', ' ')}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {evolution && evolution.length > 0 && (
        <View style={styles.evolutionContainer}>
          <Text style={styles.sectionTitle}>Cadeia Evolutiva</Text>
          <PokemonEvolution evolutionChain={evolution} navigation={navigation} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#CC0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3B4CCA',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pokemonId: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginHorizontal: 10,
    color: '#333',
  },
  favoriteButton: {
    padding: 5,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  noImageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  noImageText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  abilitiesContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  abilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  abilityItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  abilityText: {
    color: '#333',
    fontSize: 14,
  },
  evolutionContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 20,
  },
});

export default PokemonDetailsScreen; 