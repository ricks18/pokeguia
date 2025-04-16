import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Dados para os artigos do guia
const guideArticles = [
  {
    id: 'basics',
    title: 'O que são Pokémon?',
    description: 'Conheça os fundamentos do mundo Pokémon e como estas criaturas se tornaram tão populares.',
    icon: 'help-circle-outline',
    color: '#4CAF50',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
  },
  {
    id: 'types',
    title: 'Tipos de Pokémon',
    description: 'Aprenda sobre os diferentes tipos de Pokémon e como eles interagem entre si.',
    icon: 'list',
    color: '#2196F3',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
  },
  {
    id: 'evolution',
    title: 'Evolução',
    description: 'Descubra como os Pokémon evoluem e se transformam em formas mais poderosas.',
    icon: 'arrow-up',
    color: '#9C27B0',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
  },
  {
    id: 'regions',
    title: 'Regiões do Mundo Pokémon',
    description: 'Explore as diferentes regiões onde os Pokémon vivem e são encontrados.',
    icon: 'map',
    color: '#FF9800',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/384.png',
  },
  {
    id: 'battle',
    title: 'Combates Pokémon',
    description: 'Entenda como funcionam as batalhas e quais estratégias você pode usar.',
    icon: 'flash',
    color: '#F44336',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png',
  },
  {
    id: 'items',
    title: 'Itens e Ferramentas',
    description: 'Conheça os diferentes itens que auxiliam na jornada Pokémon.',
    icon: 'briefcase',
    color: '#795548',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/079.png',
  },
];

const GuideScreen = ({ navigation }) => {
  const navigateToArticle = (articleId, title) => {
    navigation.navigate('GuideDetail', { guideId: articleId, title });
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png' }}
        style={styles.headerBg}
        blurRadius={8}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Guia para Iniciantes</Text>
          <Text style={styles.subtitle}>
            Comece sua jornada no mundo Pokémon com este guia completo para novos treinadores.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.contentContainer}>
        <View style={styles.sectionHeaderContainer}>
          <Ionicons name="book-outline" size={24} color="#333" />
          <Text style={styles.sectionTitle}>Tópicos Essenciais</Text>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.articlesGrid}>
            {guideArticles.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleCard}
                onPress={() => navigateToArticle(article.id, article.title)}
                activeOpacity={0.7}
              >
                <View style={[styles.articleIconContainer, { backgroundColor: article.color }]}>
                  <Ionicons name={article.icon} size={28} color="white" />
                </View>
                <View style={styles.articleTextContainer}>
                  <Text style={styles.articleTitle} numberOfLines={1}>{article.title}</Text>
                  <Text style={styles.articleDescription} numberOfLines={2}>{article.description}</Text>
                </View>
                <Image
                  source={{ uri: article.image }}
                  style={styles.articleImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: (width - 40) / 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  articleIconContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleTextContainer: {
    padding: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  articleDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    height: 32,
  },
  articleImage: {
    width: '100%',
    height: 80,
    backgroundColor: '#f9f9f9',
  },
});

export default GuideScreen; 