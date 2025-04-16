import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainNavigator from './MainNavigator';
import DrawerNavigator from './drawerNavigator';
import { NAVIGATOR_TYPE } from './navigatorConfig';

/**
 * Componente principal de navegação que determina o tipo de navegação utilizado
 */
export default function Navigation() {
  // Escolhe entre TabNavigator e DrawerNavigator com base na configuração
  const Navigator = NAVIGATOR_TYPE === 'drawer' ? DrawerNavigator : MainNavigator;

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

export * from './stacks';
export * from './types'; 