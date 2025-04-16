import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Componente para exibir uma barra de estatística de Pokémon
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Nome da estatística
 * @param {number} props.value - Valor da estatística
 * @param {number} props.maxValue - Valor máximo possível (para calcular a porcentagem)
 * @param {string} props.color - Cor da barra de progresso
 */
const StatBar = ({ label, value, maxValue = 255, color = '#FF0000' }) => {
  // Calcular a porcentagem para a largura da barra
  const percentage = Math.min(100, (value / maxValue) * 100);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.bar, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  label: {
    width: 80,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  barContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 6,
  },
  value: {
    width: 40,
    textAlign: 'right',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
});

export default StatBar; 