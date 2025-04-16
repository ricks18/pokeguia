import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import PokemonListScreen from '../../screens/PokemonListScreen';
import PokemonDetailScreen from '../../screens/PokemonDetailScreen';
import SearchScreen from '../../screens/SearchScreen';
import { SCREENS } from '../types';

const Stack = createNativeStackNavigator();

const PokedexStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={SCREENS.POKEMON_LIST} 
        component={PokemonListScreen} 
        options={{ title: 'Pokédex', headerShown: false }}
      />
      <Stack.Screen 
        name={SCREENS.POKEMON_DETAIL} 
        component={PokemonDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.name || 'Detalhes do Pokémon',
          headerBackTitle: 'Voltar' 
        })}
      />
      <Stack.Screen 
        name={SCREENS.SEARCH} 
        component={SearchScreen} 
        options={{ title: 'Buscar Pokémon' }}
      />
    </Stack.Navigator>
  );
};

export default PokedexStack; 