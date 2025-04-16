import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getPokemonTypes } from '../services/pokeApi';
import TypeBadge from '../components/TypeBadge';

const TypesScreen = ({ navigation }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const typesData = await getPokemonTypes();
      setTypes(typesData);
    } catch (err) {
      console.error('Erro ao carregar tipos:', err);
      setError('Não foi possível carregar os tipos de Pokémon.');
    } finally {
      setLoading(false);
    }
  };

  const handleTypePress = (type) => {
    navigation.navigate('TypeDetail', { typeId: type.name, name: type.name });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E63F34" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadTypes}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tipos de Pokémon</Text>
        <Text style={styles.subtitle}>
          Cada Pokémon pertence a um ou dois tipos, o que determina suas fraquezas e resistências.
        </Text>
      </View>
      
      <FlatList
        data={types}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.typeCard}
            onPress={() => handleTypePress(item)}
          >
            <TypeBadge type={item.name} large />
          </TouchableOpacity>
        )}
        numColumns={2}
      />
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
  listContainer: {
    padding: 16,
  },
  typeCard: {
    flex: 1,
    margin: 8,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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

export default TypesScreen; 