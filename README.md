# Pokedex API

Um aplicativo React Native que utiliza a PokeAPI para fornecer informações sobre Pokémon, incluindo detalhes, tipos, guias e favoritos.

## Estrutura de Navegação

O aplicativo utiliza uma estrutura de navegação modular e flexível que permite alternar facilmente entre diferentes tipos de navegadores (Tab ou Drawer) conforme necessário.

### Organização dos Arquivos

```
src/
  ├── navigation/
  │   ├── index.js                # Exporta o navegador e determina o tipo (Tab ou Drawer)
  │   ├── MainNavigator.js        # Navegador de abas (Tab Navigator)
  │   ├── drawerNavigator.js      # Navegador lateral (Drawer Navigator)
  │   ├── navigatorConfig.js      # Configurações globais de navegação
  │   ├── types.js                # Constantes para nomes de rotas
  │   └── stacks/                 # Pasta com os stacks de navegação
  │       ├── index.js            # Exporta todos os stacks
  │       ├── HomeStack.js        # Stack de navegação para a tela inicial
  │       ├── PokedexStack.js     # Stack para a lista de Pokémon
  │       ├── TypesStack.js       # Stack para os tipos de Pokémon
  │       ├── GuideStack.js       # Stack para o guia de iniciantes
  │       └── FavoritesStack.js   # Stack para os favoritos
```

### Como alternar entre os tipos de navegação

Para alternar entre a navegação por abas (Tab) e a navegação lateral (Drawer), edite o arquivo `src/navigation/navigatorConfig.js` e altere o valor da constante `NAVIGATOR_TYPE` para `'tabs'` ou `'drawer'`:

```js
// Tipo de navegação a ser utilizada: 'tabs' ou 'drawer'
export const NAVIGATOR_TYPE = 'tabs';
```

### Cores e configurações globais

As cores e outras configurações de navegação são centralizadas no arquivo `navigatorConfig.js`, facilitando a manutenção e personalização do tema:

```js
// Cores utilizadas na navegação
export const NAVIGATION_COLORS = {
  primary: '#E63F34',
  inactive: '#888',
  background: '#fff',
  border: '#eee',
};
```

## Telas Disponíveis

O aplicativo contém as seguintes telas principais:

1. **Início (Home)** - Tela inicial com destaque e acesso rápido
2. **Pokédex** - Lista completa de Pokémon com busca
3. **Tipos** - Informações sobre os diferentes tipos de Pokémon
4. **Guia** - Guia para iniciantes com informações úteis
5. **Favoritos** - Pokémon marcados como favoritos pelo usuário

## Desenvolvimento

Para instalar as dependências e executar o projeto:

```
npm install
npm start
```
