import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { formatPokemonId, capitalize, getTypeColor } from '../utils/helpers';

/**
 * Componente de card para exibir informações básicas de um Pokémon
 * 
 * @param {Object} pokemon - Dados do Pokémon a ser exibido
 * @param {Function} onPress - Função a ser chamada ao clicar no card
 */
const PokemonCard = ({ pokemon, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Determina a cor de fundo do card com base no primeiro tipo do Pokémon
  const backgroundColor = pokemon.tipos && pokemon.tipos.length > 0
    ? `${getTypeColor(pokemon.tipos[0])}33` // Adiciona transparência à cor
    : '#f5f5f5';

  // Função para tratar erros de carregamento da imagem
  const handleImageError = () => {
    console.log(`Erro ao carregar imagem do Pokémon #${pokemon.id}`);
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor }]} 
      activeOpacity={0.7}
      onPress={() => onPress(pokemon.id)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        
        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator 
              size="small" 
              color={pokemon.tipos && pokemon.tipos.length > 0 ? getTypeColor(pokemon.tipos[0]) : '#666'}
              style={styles.loader}
            />
          )}
          
          {pokemon.img && !imageError ? (
            <Image 
              source={{ uri: pokemon.img }} 
              style={[styles.image, imageLoading ? { opacity: 0 } : { opacity: 1 }]} 
              resizeMode="contain"
              onLoad={() => setImageLoading(false)}
              onError={handleImageError}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {capitalize(pokemon.nome)}
        </Text>
        
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    maxWidth: '47%',
  },
  cardContent: {
    alignItems: 'center',
  },
  id: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 4,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    margin: 3,
  },
  typeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  image: {
    width: 80,
    height: 80,
  },
  loader: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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