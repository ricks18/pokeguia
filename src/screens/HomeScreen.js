import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePokemonContext } from '../context/PokemonContext';
import { getPokemonDetails } from '../services/pokeApi';
import { capitalize, formatPokemonId } from '../utils/helpers';

// Dados para os cards de introdução ao mundo Pokémon
const guideCards = [
  {
    id: 'basics',
    title: 'O que são Pokémon?',
    description: 'Aprenda o básico sobre estas criaturas incríveis.',
    icon: 'help-circle-outline',
    color: '#4CAF50',
  },
  {
    id: 'types',
    title: 'Tipos de Pokémon',
    description: 'Conheça os diferentes tipos e suas características.',
    icon: 'format-list-bulleted',
    color: '#2196F3',
  },
  {
    id: 'evolution',
    title: 'Evolução',
    description: 'Descubra como os Pokémon evoluem e se transformam.',
    icon: 'arrow-up-bold',
    color: '#9C27B0',
  },
  {
    id: 'regions',
    title: 'Regiões',
    description: 'Explore os diferentes mundos onde vivem os Pokémon.',
    icon: 'map-marker',
    color: '#FF9800',
  },
];

const HomeScreen = ({ navigation }) => {
  const [pokemonOfDay, setPokemonOfDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pokemonList } = usePokemonContext();

  useEffect(() => {
    loadPokemonOfDay();
  }, []);

  // Função para carregar o Pokémon do dia
  const loadPokemonOfDay = async () => {
    try {
      setLoading(true);
      
      // Gera um ID aleatório entre 1 e 151 (primeira geração)
      const randomId = Math.floor(Math.random() * 151) + 1;
      
      const pokemon = await getPokemonDetails(randomId);
      setPokemonOfDay(pokemon);
    } catch (error) {
      console.error('Erro ao carregar Pokémon do dia:', error);
    } finally {
      setLoading(false);
    }
  };

  // Navegar para a tela de detalhes do Pokémon
  const navigateToPokemonDetail = (id) => {
    navigation.navigate('PokemonDetail', { id });
  };

  // Navegar para o guia específico
  const navigateToGuide = (guideId) => {
    navigation.navigate('Guide', { 
      screen: 'GuideDetail', 
      params: { guideId, title: guideCards.find(card => card.id === guideId)?.title } 
    });
  };

  // Navegar para a lista de Pokémon
  const navigateToPokedex = () => {
    navigation.navigate('Pokedex');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Guia Pokémon</Text>
        <Text style={styles.subtitle}>Para Iniciantes</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Seção de Boas-vindas */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bem-vindo ao Mundo Pokémon!</Text>
          <Text style={styles.welcomeText}>
            Este guia vai ajudar você a conhecer o incrível universo dos Pokémon, 
            mesmo se você nunca teve contato com eles antes.
          </Text>
        </View>
        
        {/* Cards do Guia */}
        <Text style={styles.sectionTitle}>Comece a Aprender</Text>
        <View style={styles.guideCardsContainer}>
          {guideCards.map((card) => (
            <TouchableOpacity 
              key={card.id} 
              style={[styles.guideCard, { backgroundColor: card.color }]}
              onPress={() => navigateToGuide(card.id)}
            >
              <Text style={styles.guideCardTitle}>{card.title}</Text>
              <Text style={styles.guideCardDescription}>{card.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Pokémon do Dia */}
        <Text style={styles.sectionTitle}>Pokémon do Dia</Text>
        <View style={styles.pokemonOfDayContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#E63F34" />
          ) : pokemonOfDay ? (
            <TouchableOpacity 
              style={styles.pokemonOfDayCard}
              onPress={() => navigateToPokemonDetail(pokemonOfDay.id)}
            >
              <View style={styles.pokemonOfDayInfo}>
                <Text style={styles.pokemonOfDayId}>
                  {formatPokemonId(pokemonOfDay.id)}
                </Text>
                <Text style={styles.pokemonOfDayName}>
                  {capitalize(pokemonOfDay.nome)}
                </Text>
                <Text style={styles.pokemonOfDaySubtitle}>
                  Clique para conhecer mais!
                </Text>
              </View>
              
              <View style={styles.pokemonOfDayImageContainer}>
                {pokemonOfDay.img && (
                  <Image 
                    source={{ uri: pokemonOfDay.img }} 
                    style={styles.pokemonOfDayImage} 
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={styles.errorText}>
              Não foi possível carregar o Pokémon do dia.
            </Text>
          )}
        </View>
        
        {/* Botão para explorar a Pokédex */}
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={navigateToPokedex}
        >
          <Text style={styles.exploreButtonText}>Explorar a Pokédex</Text>
        </TouchableOpacity>
        
        {/* Espaço adicional no final da tela */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  welcomeSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
    color: '#333',
  },
  guideCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  guideCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  guideCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  guideCardDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  pokemonOfDayContainer: {
    marginBottom: 24,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonOfDayCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonOfDayInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  pokemonOfDayId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pokemonOfDayName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  pokemonOfDaySubtitle: {
    fontSize: 14,
    color: '#E63F34',
  },
  pokemonOfDayImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonOfDayImage: {
    width: 100,
    height: 100,
  },
  errorText: {
    color: '#E63F34',
    fontSize: 16,
    textAlign: 'center',
  },
  exploreButton: {
    backgroundColor: '#E63F34',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen; 