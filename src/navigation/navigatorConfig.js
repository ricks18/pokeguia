/**
 * Configurações globais de navegação
 */

// Tipo de navegação a ser utilizada: 'tabs' ou 'drawer'
export const NAVIGATOR_TYPE = 'tabs';

// Cores utilizadas na navegação
export const NAVIGATION_COLORS = {
  primary: '#E63F34',
  inactive: '#888',
  background: '#fff',
  border: '#eee',
  headerText: '#fff',
  headerBackground: '#E63F34',
  cardBackground: '#fff',
};

// Opções comuns para todos os navegadores
export const COMMON_SCREEN_OPTIONS = {
  headerShown: false,
};

// Opções para os stacks 
export const STACK_SCREEN_OPTIONS = {
  headerStyle: {
    backgroundColor: NAVIGATION_COLORS.headerBackground,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: NAVIGATION_COLORS.headerText,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleVisible: false,
  animation: 'slide_from_right',
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: NAVIGATION_COLORS.cardBackground,
  },
};

// Opções para as tabs
export const TAB_SCREEN_OPTIONS = {
  tabBarActiveTintColor: NAVIGATION_COLORS.primary,
  tabBarInactiveTintColor: NAVIGATION_COLORS.inactive,
  tabBarLabelStyle: {
    fontSize: 12,
    marginBottom: 4,
  },
  tabBarStyle: {
    backgroundColor: NAVIGATION_COLORS.background,
    borderTopColor: NAVIGATION_COLORS.border,
    paddingTop: 5,
    elevation: 8,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { height: -2, width: 0 },
  },
  tabBarHideOnKeyboard: true,
  ...COMMON_SCREEN_OPTIONS,
};

// Opções para o drawer
export const DRAWER_SCREEN_OPTIONS = {
  drawerActiveTintColor: NAVIGATION_COLORS.primary,
  drawerInactiveTintColor: NAVIGATION_COLORS.inactive,
  drawerLabelStyle: {
    fontSize: 16,
    marginLeft: -10,
  },
  ...COMMON_SCREEN_OPTIONS,
}; 