import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importar stacks
import { 
  HomeStack, 
  PokedexStack, 
  TypesStack, 
  GuideStack, 
  FavoritesStack 
} from './stacks';

import { ROUTES } from './types';
import { TAB_SCREEN_OPTIONS } from './navigatorConfig';

const Tab = createBottomTabNavigator();

/**
 * Navegação principal do aplicativo com Tab Navigator
 */
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={TAB_SCREEN_OPTIONS}
    >
      <Tab.Screen 
        name={ROUTES.HOME} 
        component={HomeStack} 
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES.POKEDEX} 
        component={PokedexStack} 
        options={{
          tabBarLabel: 'Pokédex',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pokeball" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES.TYPES} 
        component={TypesStack} 
        options={{
          tabBarLabel: 'Tipos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES.GUIDE} 
        component={GuideStack} 
        options={{
          tabBarLabel: 'Guia',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES.FAVORITES} 
        component={FavoritesStack} 
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator; 