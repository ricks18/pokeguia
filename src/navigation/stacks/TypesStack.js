import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import TypesScreen from '../../screens/TypesScreen';
import TypeDetailScreen from '../../screens/TypeDetailScreen';
import PokemonDetailScreen from '../../screens/PokemonDetailScreen';
import { SCREENS } from '../types';

const Stack = createNativeStackNavigator();

const TypesStack = () => {
  return (
    <Stack.Navigator>
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
          headerBackTitle: 'Voltar' 
        })}
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

export default TypesStack; 