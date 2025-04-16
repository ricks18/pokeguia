import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemonDetails } from '../services/pokeApi';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SCREENS } from '../navigation/types';

/**
 * Componente para exibir a cadeia evolutiva de um Pokémon
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.evolutionChain - Lista de objetos contendo dados de cada evolução
 * @param {Object} props.navigation - Objeto de navegação para ir para outros Pokémon
 * @returns {React.Component} Componente de cadeia evolutiva
 */
const PokemonEvolution = ({ evolutionChain, navigation }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validação dos dados de entrada
    if (!Array.isArray(evolutionChain)) {
      setError('Formato de dados inválido');
      setLoading(false);
      return;
    }
    
    const loadEvolutionData = async () => {
      if (!evolutionChain || evolutionChain.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Verificar se cada item da cadeia tem a propriedade necessária
        const hasValidFormat = evolutionChain.every(item => 
          item && typeof item.species_name === 'string'
        );
        
        if (!hasValidFormat) {
          setError('Dados de evolução em formato inválido');
          setLoading(false);
          return;
        }
        
        const pokemonPromises = evolutionChain.map(async (evolution) => {
          try {
            const details = await getPokemonDetails(evolution.species_name);
            return {
              ...details,
              trigger: evolution.trigger,
              min_level: evolution.min_level,
              item: evolution.item
            };
          } catch (err) {
            // Retornamos um objeto com dados básicos para não quebrar a renderização
            return {
              id: evolution.species_id || 0,
              nome: evolution.species_name,
              img: null,
              error: true,
              trigger: evolution.trigger,
              min_level: evolution.min_level,
              item: evolution.item
            };
          }
        });

        const results = await Promise.all(pokemonPromises);
        setPokemonData(results.filter(p => p !== null));
      } catch (err) {
        setError('Falha ao carregar detalhes da evolução');
      } finally {
        setLoading(false);
      }
    };

    loadEvolutionData();
  }, [evolutionChain]);

  const handlePokemonPress = (id) => {
    navigation.push(SCREENS.POKEMON_DETAIL, { id });
  };

  // Função para gerar texto de evolução com base no trigger e detalhes
  const getEvolutionDetails = (pokemon, index) => {
    if (index === 0) return null; // Primeiro Pokémon na cadeia não tem detalhes de evolução

    const { trigger, min_level, item } = pokemon;

    if (!trigger) return 'Evolui';

    let detailText = '';

    switch (trigger) {
      case 'level-up':
        detailText = min_level ? `Nível ${min_level}` : 'Subir de nível';
        break;
      case 'use-item':
        detailText = item ? `Usar ${formatItemName(item)}` : 'Usar item';
        break;
      case 'trade':
        detailText = 'Trocar';
        break;
      default:
        detailText = 'Evolui';
    }

    return detailText;
  };

  // Formatar nome do item
  const formatItemName = (itemName) => {
    if (!itemName) return '';
    
    // Substituir hífens por espaços e capitalizar cada palavra
    return itemName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#3B4CCA" />
        <Text style={styles.loadingText}>Carregando evoluções...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!pokemonData || pokemonData.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Nenhuma evolução encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pokemonData.map((pokemon, index) => (
        <React.Fragment key={pokemon.id || index}>
          {index > 0 && (
            <View style={styles.evolutionDetailsContainer}>
              <Icon name="arrow-right" size={24} color="#666" />
              <View style={styles.evolutionInfo}>
                <Text style={styles.evolutionMethod}>
                  {getEvolutionDetails(pokemon, index)}
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.pokemonContainer}
            onPress={() => handlePokemonPress(pokemon.id)}
          >
            <View style={styles.imageWrapper}>
              {pokemon.img ? (
                <Image
                  source={{ uri: pokemon.img }}
                  style={styles.pokemonImage}
                />
              ) : (
                <View style={styles.noImageContainer}>
                  <Icon name="image-off" size={30} color="#CCC" />
                </View>
              )}
            </View>
            <Text style={styles.pokemonName}>
              {pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1)}
            </Text>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  pokemonContainer: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    width: 100,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  noImageContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 35,
  },
  pokemonName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  evolutionDetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  evolutionInfo: {
    backgroundColor: '#e8e8e8',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 5,
  },
  evolutionMethod: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 5,
    color: '#666',
    fontSize: 14,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#CC0000',
    fontSize: 14,
  },
});

export default PokemonEvolution; 