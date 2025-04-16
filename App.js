import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PokemonProvider } from './src/context/PokemonContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <PokemonProvider>
        <StatusBar style="auto" />
        <Navigation />
      </PokemonProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
