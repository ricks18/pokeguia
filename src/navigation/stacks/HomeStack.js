import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import HomeScreen from '../../screens/HomeScreen';
import PokemonDetailScreen from '../../screens/PokemonDetailScreen';
import { SCREENS } from '../types';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={SCREENS.HOME_SCREEN} 
        component={HomeScreen} 
        options={{ title: 'Guia Pokémon', headerShown: false }}
      />
      <Stack.Screen 
        name={SCREENS.POKEMON_DETAIL} 
        component={PokemonDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.name || 'Detalhes do Pokémon',
          headerBackTitle: 'Voltar' 
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack; 