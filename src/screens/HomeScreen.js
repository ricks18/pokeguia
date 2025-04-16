import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { usePokemonContext } from '../context/PokemonContext';
import { getPokemonDetails } from '../services/pokeApi';
import { capitalize, formatPokemonId } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Dados para os cards de introdução ao mundo Pokémon
const guideCards = [
  {
    id: 'basics',
    title: 'O que são Pokémon?',
    description: 'Aprenda o básico sobre estas criaturas incríveis.',
    icon: 'help-circle-outline',
    color: '#4CAF50',
    bgImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  },
  {
    id: 'types',
    title: 'Tipos de Pokémon',
    description: 'Conheça os diferentes tipos e suas características.',
    icon: 'format-list-bulleted',
    color: '#2196F3',
    bgImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
  },
  {
    id: 'evolution',
    title: 'Evolução',
    description: 'Descubra como os Pokémon evoluem e se transformam.',
    icon: 'arrow-up-bold',
    color: '#9C27B0',
    bgImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
  },
  {
    id: 'regions',
    title: 'Regiões',
    description: 'Explore os diferentes mundos onde vivem os Pokémon.',
    icon: 'map-marker',
    color: '#FF9800',
    bgImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/384.png',
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
      <StatusBar style="light" />
      
      {/* Cabeçalho */}
      <ImageBackground 
        source={{ uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png' }}
        style={styles.headerBg}
        blurRadius={8}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Guia Pokémon</Text>
          <Text style={styles.subtitle}>Explore o mundo dos Pokémon</Text>
        </View>
      </ImageBackground>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Seção de Boas-vindas */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <Ionicons name="information-circle" size={22} color="#E63F34" />
            <Text style={styles.welcomeTitle}>Bem-vindo ao Mundo Pokémon!</Text>
          </View>
          <Text style={styles.welcomeText}>
            Este guia vai ajudar você a conhecer o incrível universo dos Pokémon, 
            mesmo se você nunca teve contato com eles antes.
          </Text>
        </View>
        
        {/* Cards do Guia */}
        <View style={styles.sectionHeader}>
          <Ionicons name="book-outline" size={22} color="#333" />
          <Text style={styles.sectionTitle}>Comece a Aprender</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.guideCardsScrollContainer}
        >
          {guideCards.map((card) => (
            <TouchableOpacity 
              key={card.id} 
              style={styles.guideCard}
              onPress={() => navigateToGuide(card.id)}
            >
              <ImageBackground 
                source={{ uri: card.bgImage }}
                style={styles.guideCardBg}
                imageStyle={styles.guideCardBgImage}
              >
                <View style={[styles.guideCardContent, { backgroundColor: `${card.color}CC` }]}>
                  <Ionicons name={card.icon} size={24} color="white" style={styles.guideCardIcon} />
                  <Text style={styles.guideCardTitle}>{card.title}</Text>
                  <Text style={styles.guideCardDescription}>{card.description}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Pokémon do Dia */}
        <View style={styles.sectionHeader}>
          <Ionicons name="star-outline" size={22} color="#333" />
          <Text style={styles.sectionTitle}>Pokémon do Dia</Text>
        </View>
        
        <View style={styles.pokemonOfDayContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#E63F34" />
          ) : pokemonOfDay ? (
            <TouchableOpacity 
              style={styles.pokemonOfDayCard}
              onPress={() => navigateToPokemonDetail(pokemonOfDay.id)}
              activeOpacity={0.7}
            >
              <View style={styles.pokemonOfDayInfo}>
                <Text style={styles.pokemonOfDayId}>
                  {formatPokemonId(pokemonOfDay.id)}
                </Text>
                <Text style={styles.pokemonOfDayName}>
                  {capitalize(pokemonOfDay.nome)}
                </Text>
                
                <View style={styles.pokemonOfDayTypes}>
                  {pokemonOfDay.tipos && pokemonOfDay.tipos.map((tipo, index) => (
                    <View key={index} style={styles.typeChip}>
                      <Text style={styles.typeChipText}>{capitalize(tipo)}</Text>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity 
                  style={styles.pokemonOfDayButton}
                  onPress={() => navigateToPokemonDetail(pokemonOfDay.id)}
                >
                  <Text style={styles.pokemonOfDayButtonText}>Ver Detalhes</Text>
                </TouchableOpacity>
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
          <Ionicons name="search" size={18} color="white" style={{marginRight: 8}} />
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
  headerBg: {
    width: '100%',
  },
  header: {
    backgroundColor: 'rgba(230, 63, 52, 0.90)',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  welcomeSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  guideCardsScrollContainer: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  guideCard: {
    width: width * 0.75,
    height: 180,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  guideCardBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  guideCardBgImage: {
    opacity: 0.7,
  },
  guideCardContent: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  guideCardIcon: {
    marginBottom: 8,
  },
  guideCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  guideCardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  pokemonOfDayContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  pokemonOfDayCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  pokemonOfDayInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  pokemonOfDayId: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  pokemonOfDayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  pokemonOfDayTypes: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeChip: {
    backgroundColor: '#E63F34',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  typeChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pokemonOfDayButton: {
    backgroundColor: '#E63F34',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  pokemonOfDayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pokemonOfDayImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonOfDayImage: {
    width: 120,
    height: 120,
  },
  errorText: {
    fontSize: 16,
    color: '#E63F34',
    textAlign: 'center',
    marginTop: 16,
  },
  exploreButton: {
    backgroundColor: '#E63F34',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default HomeScreen; 