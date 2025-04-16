/**
 * Tipos de navegação do aplicativo
 * Define as constantes para todas as rotas da aplicação
 */

// Nomes das rotas principais (tabs/drawer)
export const ROUTES = {
  HOME: 'Home',
  POKEDEX: 'Pokedex',
  TYPES: 'Types',
  GUIDE: 'Guide',
  FAVORITES: 'Favorites',
  SEARCH: 'Search',
  SETTINGS: 'Settings',
};

// Nomes das rotas de detalhes (screens dentro de cada stack)
export const SCREENS = {
  // Home Stack
  HOME_SCREEN: 'HomeScreen',
  
  // Pokedex Stack
  POKEMON_LIST: 'PokemonList',
  POKEMON_DETAIL: 'PokemonDetail',
  POKEMON_SEARCH: 'PokemonSearch',
  
  // Types Stack
  TYPES_LIST: 'TypesList',
  TYPE_DETAIL: 'TypeDetail',
  
  // Guide Stack
  GUIDE_HOME: 'GuideHome',
  GUIDE_DETAIL: 'GuideDetail',
  
  // Favorites Stack
  FAVORITES_LIST: 'FavoritesList',
  
  // Settings Stack
  SETTINGS_SCREEN: 'SettingsScreen',
}; 