import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import TypesScreen from '../../screens/TypesScreen';
import TypeDetailScreen from '../../screens/TypeDetailScreen';
import PokemonDetailScreen from '../../screens/PokemonDetailScreen';
import { SCREENS } from '../types';
import { STACK_SCREEN_OPTIONS } from '../navigatorConfig';

const Stack = createNativeStackNavigator();

const TypesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={STACK_SCREEN_OPTIONS}
    >
      <Stack.Screen 
        name={SCREENS.TYPES_LIST} 
        component={TypesScreen} 
        options={{ title: 'Tipos de Pokémon', headerShown: false }}
      />
      <Stack.Screen 
        name={SCREENS.TYPE_DETAIL} 
        component={TypeDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.name || 'Detalhes do Tipo',
          headerShown: true
        })}
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

export default TypesStack; 