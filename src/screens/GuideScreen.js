import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      <View style={styles.header}>
        <Text style={styles.title}>Guia para Iniciantes</Text>
        <Text style={styles.subtitle}>
          Comece sua jornada no mundo Pokémon com este guia completo para novos treinadores.
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Tópicos Essenciais</Text>
        
        {guideArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => navigateToArticle(article.id, article.title)}
          >
            <View style={styles.articleContent}>
              <View style={[styles.iconContainer, { backgroundColor: article.color }]}>
                <Ionicons name={article.icon} size={28} color="white" />
              </View>
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleDescription}>{article.description}</Text>
                <Text style={styles.readMore}>Ler mais</Text>
              </View>
            </View>
            
            {article.image && (
              <Image
                source={{ uri: article.image }}
                style={styles.articleImage}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        ))}
        
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  articleContent: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  articleTextContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    color: '#E63F34',
    fontWeight: 'bold',
  },
  articleImage: {
    width: '100%',
    height: 120,
    marginTop: 12,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default GuideScreen; 