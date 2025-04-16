import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const PokemonStat = ({ label, value, maxValue = 255, color = '#FF5722' }) => {
  // Calcular a porcentagem do valor em relação ao máximo (usado para a barra de progresso)
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <View style={styles.barContainer}>
          <View 
            style={[
              styles.bar, 
              { width: `${percentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 100,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    color: '#666',
    width: 30,
    textAlign: 'right',
    marginRight: 8,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default PokemonStat; 