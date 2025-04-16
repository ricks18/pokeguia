import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import GuideScreen from '../../screens/GuideScreen';
import GuideDetailScreen from '../../screens/GuideDetailScreen';
import PokemonDetailScreen from '../../screens/PokemonDetailScreen';
import { SCREENS } from '../types';
import { STACK_SCREEN_OPTIONS } from '../navigatorConfig';

const Stack = createNativeStackNavigator();

const GuideStack = () => {
  return (
    <Stack.Navigator
      screenOptions={STACK_SCREEN_OPTIONS}
    >
      <Stack.Screen 
        name={SCREENS.GUIDE_LIST} 
        component={GuideScreen} 
        options={{ title: 'Guia para Iniciantes', headerShown: false }}
      />
      <Stack.Screen 
        name={SCREENS.GUIDE_DETAIL} 
        component={GuideDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.title || 'Guia Pokémon',
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

export default GuideStack; 