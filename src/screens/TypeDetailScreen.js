import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getTypeDetails } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard';
import TypeBadge from '../components/TypeBadge';
import { capitalize } from '../utils/helpers';

const TypeDetailScreen = ({ route, navigation }) => {
  const { typeId, name } = route.params;
  const [typeData, setTypeData] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTypeDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]);

  // Função para carregar detalhes do tipo
  const loadTypeDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getTypeDetails(typeId);
      setTypeData(data);
      
      // Filtrar apenas os 20 primeiros Pokémon para não sobrecarregar
      const pokemonList = data.pokemon.slice(0, 20).map(p => {
        const urlParts = p.pokemon.url.split('/');
        return {
          id: parseInt(urlParts[urlParts.length - 2]),
          nome: p.pokemon.name,
          url: p.pokemon.url,
        };
      });
      
      setPokemon(pokemonList);
    } catch (err) {
      console.error('Erro ao carregar detalhes do tipo:', err);
      setError('Não foi possível carregar os detalhes deste tipo.');
    } finally {
      setLoading(false);
    }
  };

  // Navegar para a tela de detalhes do Pokémon
  const handlePokemonPress = (id) => {
    navigation.navigate('PokemonDetail', { id });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E63F34" />
      </View>
    );
  }

  if (error || !typeData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Ocorreu um erro inesperado.'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadTypeDetails}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TypeBadge type={typeId} large />
        <Text style={styles.title}>{capitalize(name)} Type</Text>
        
        <View style={styles.relationsContainer}>
          <View style={styles.relationSection}>
            <Text style={styles.relationTitle}>Forte Contra:</Text>
            <View style={styles.typesList}>
              {typeData.damage_relations.double_damage_to.map((type) => (
                <TypeBadge key={type.name} type={type.name} />
              ))}
            </View>
          </View>
          
          <View style={styles.relationSection}>
            <Text style={styles.relationTitle}>Fraco Contra:</Text>
            <View style={styles.typesList}>
              {typeData.damage_relations.double_damage_from.map((type) => (
                <TypeBadge key={type.name} type={type.name} />
              ))}
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Pokémon do Tipo {capitalize(name)}</Text>
        
        <FlatList
          data={pokemon}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.pokemonItem}
              onPress={() => handlePokemonPress(item.id)}
            >
              <Text style={styles.pokemonName}>{capitalize(item.nome)}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerStyle={styles.pokemonList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: '#E63F34',
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  relationsContainer: {
    marginTop: 10,
    width: '100%',
  },
  relationSection: {
    marginVertical: 5,
  },
  relationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  typesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  pokemonList: {
    paddingBottom: 20,
  },
  pokemonItem: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pokemonName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
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
});

export default TypeDetailScreen; 