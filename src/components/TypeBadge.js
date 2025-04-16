import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getTypeColor, capitalize } from '../utils/helpers';

const TypeBadge = ({ type, large = false }) => {
  return (
    <View 
      style={[
        styles.badge, 
        { backgroundColor: getTypeColor(type) },
        large ? styles.large : null
      ]}
    >
      <Text style={[styles.text, large ? styles.largeText : null]}>
        {capitalize(type)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  largeText: {
    fontSize: 16,
  }
});

export default TypeBadge; 