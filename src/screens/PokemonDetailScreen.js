import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { usePokemonContext } from '../context/PokemonContext';
import { getPokemonDetails, getEvolutionChain } from '../services/pokeApi';
import { getPokemonDescription } from '../utils/helpers';
import { processEvolutionChain } from '../utils/evolutionUtils';
import TypeBadge from '../components/TypeBadge';
import PokemonStat from '../components/PokemonStat';
import { capitalize, formatPokemonId, formatWeight, formatHeight } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

const PokemonDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState('');
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite, removeFavorite, addFavorite } = usePokemonContext();

  // Carregar dados do Pokémon quando a tela for montada
  useEffect(() => {
    loadPokemonData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Função para carregar dados do Pokémon
  const loadPokemonData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obter detalhes do Pokémon
      const pokemonData = await getPokemonDetails(id);
      setPokemon(pokemonData);
      
      // Definir o título da tela para o nome do Pokémon
      navigation.setOptions({ 
        title: capitalize(pokemonData.nome) 
      });
      
      // Obter descrição do Pokémon
      const desc = await getPokemonDescription(id);
      setDescription(desc);
      
      // Obter a cadeia evolutiva
      try {
        const evolutionData = await getEvolutionChain(id);
        const processedEvolution = processEvolutionChain(evolutionData);
        setEvolutionChain(processedEvolution);
      } catch (evolError) {
        // Silenciosamente falhar na cadeia evolutiva
      }
      
    } catch (err) {
      setError('Não foi possível carregar os detalhes deste Pokémon.');
    } finally {
      setLoading(false);
    }
  };

  // Alternar estado de favorito
  const handleToggleFavorite = () => {
    if (pokemon) {
      if (isFavorite(pokemon.id)) {
        removeFavorite(pokemon.id);
      } else {
        addFavorite(pokemon);
      }
    }
  };

  // Navegar para o detalhe de outro Pokémon da cadeia evolutiva
  const navigateToPokemon = (pokemonId) => {
    if (pokemonId === id) return;
    navigation.push('PokemonDetail', { id: pokemonId });
  };

  // Exibir indicador de carregamento
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E63F34" />
      </View>
    );
  }

  // Exibir mensagem de erro
  if (error || !pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Erro desconhecido.'}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={loadPokemonData}
        >
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho com imagem e informações básicas */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.idContainer}>
            <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
            >
              <Ionicons 
                name={isFavorite(pokemon.id) ? "heart" : "heart-outline"} 
                size={28} 
                color={isFavorite(pokemon.id) ? "#E63F34" : "#FFF"}
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{capitalize(pokemon.nome)}</Text>
          
          <View style={styles.typesContainer}>
            {pokemon.tipos && pokemon.tipos.map((tipo, index) => (
              <TypeBadge key={index} type={tipo} large />
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
      </View>
      
      {/* Descrição */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      
      {/* Informações básicas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Altura</Text>
            <Text style={styles.infoValue}>{formatHeight(pokemon.altura)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Peso</Text>
            <Text style={styles.infoValue}>{formatWeight(pokemon.peso)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Habilidades</Text>
            <Text style={styles.infoValue}>
              {pokemon.habilidades.map(ability => capitalize(ability)).join(', ')}
            </Text>
          </View>
        </View>
      </View>
      
      {/* Estatísticas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estatísticas</Text>
        <PokemonStat label="Vida" value={pokemon.vida} color="#FF5722" />
        <PokemonStat label="Ataque" value={pokemon.ataque} color="#FF9800" />
        <PokemonStat label="Defesa" value={pokemon.defesa} color="#4CAF50" />
        <PokemonStat label="Velocidade" value={pokemon.velocidade} color="#2196F3" />
      </View>
      
      {/* Cadeia evolutiva */}
      {evolutionChain.length > 1 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evolução</Text>
          <View style={styles.evolutionChain}>
            {evolutionChain.map((evo, index) => (
              <TouchableOpacity 
                key={evo.id} 
                style={styles.evolutionItem}
                onPress={() => navigateToPokemon(evo.id)}
                disabled={evo.id === pokemon.id}
              >
                <View 
                  style={[
                    styles.evolutionImageContainer,
                    evo.id === pokemon.id ? styles.activeEvolution : null
                  ]}
                >
                  <Image 
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png` }} 
                    style={styles.evolutionImage} 
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.evolutionName}>{capitalize(evo.name)}</Text>
                
                {index < evolutionChain.length - 1 && (
                  <Ionicons 
                    name="arrow-forward" 
                    size={20} 
                    color="#666"
                    style={styles.evolutionArrow}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      
      {/* Espaço adicional no final da tela */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  header: {
    flexDirection: 'row',
    backgroundColor: '#E63F34',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  id: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 'bold',
    marginRight: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: 5,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  evolutionChain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  evolutionItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  evolutionImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeEvolution: {
    backgroundColor: 'rgba(230, 63, 52, 0.2)',
    borderWidth: 2,
    borderColor: '#E63F34',
  },
  evolutionImage: {
    width: 50,
    height: 50,
  },
  evolutionName: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  evolutionArrow: {
    marginHorizontal: 5,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default PokemonDetailScreen; 