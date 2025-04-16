import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importar stacks
import { 
  HomeStack, 
  PokedexStack, 
  TypesStack, 
  GuideStack, 
  FavoritesStack 
} from './stacks';

import { ROUTES } from './types';
import { NAVIGATION_COLORS, COMMON_SCREEN_OPTIONS } from './navigatorConfig';

const Drawer = createDrawerNavigator();

/**
 * Navegação alternativa do aplicativo usando Drawer
 * Pode ser ativada no lugar do TabNavigator conforme necessidade
 */
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: NAVIGATION_COLORS.primary,
        drawerInactiveTintColor: NAVIGATION_COLORS.inactive,
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
        ...COMMON_SCREEN_OPTIONS,
      }}
    >
      <Drawer.Screen 
        name={ROUTES.HOME} 
        component={HomeStack} 
        options={{
          title: 'Início',
        }}
      />
      <Drawer.Screen 
        name={ROUTES.POKEDEX} 
        component={PokedexStack} 
        options={{
          title: 'Pokédex',
        }}
      />
      <Drawer.Screen 
        name={ROUTES.TYPES} 
        component={TypesStack} 
        options={{
          title: 'Tipos de Pokémon',
        }}
      />
      <Drawer.Screen 
        name={ROUTES.GUIDE} 
        component={GuideStack} 
        options={{
          title: 'Guia para Iniciantes',
        }}
      />
      <Drawer.Screen 
        name={ROUTES.FAVORITES} 
        component={FavoritesStack} 
        options={{
          title: 'Meus Favoritos',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 