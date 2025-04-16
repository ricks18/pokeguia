import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import HomeScreen from '../../screens/HomeScreen';
import PokemonDetailScreen from '../../screens/PokemonDetailScreen';
import { SCREENS } from '../types';
import { STACK_SCREEN_OPTIONS } from '../navigatorConfig';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={STACK_SCREEN_OPTIONS}
    >
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
          headerShown: true
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack; 