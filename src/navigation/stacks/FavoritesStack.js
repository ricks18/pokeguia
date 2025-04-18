import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import FavoritesScreen from '../../screens/FavoritesScreen';
import PokemonDetailScreen from '../../screens/PokemonDetailScreen';
import { SCREENS } from '../types';
import { STACK_SCREEN_OPTIONS } from '../navigatorConfig';

const Stack = createNativeStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={STACK_SCREEN_OPTIONS}
    >
      <Stack.Screen 
        name={SCREENS.FAVORITES_LIST} 
        component={FavoritesScreen} 
        options={{ title: 'Meus Favoritos', headerShown: false }}
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

export default FavoritesStack; 