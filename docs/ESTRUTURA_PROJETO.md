# Documentação do Projeto: Guia Pokémon para Iniciantes

Este documento apresenta a estrutura e funcionamento do aplicativo "Guia Pokémon para Iniciantes", desenvolvido em React Native com Expo. O aplicativo tem como objetivo servir como uma plataforma educativa sobre o universo Pokémon para pessoas que não estão familiarizadas com este universo.

## Estrutura de Pastas

```
pokedex/
├── App.js                  # Ponto de entrada da aplicação
├── app.json                # Configurações do Expo
├── index.js                # Registro do componente principal
├── package.json            # Dependências do projeto
├── assets/                 # Arquivos estáticos (imagens, fontes, etc.)
├── components/             # Componentes React originais (legado)
└── src/                    # Código fonte principal
    ├── components/         # Componentes reutilizáveis
    │   ├── PokemonCard.js          # Card para exibir Pokémon na lista
    │   ├── PokemonEvolution.js     # Visualização de cadeia evolutiva
    │   ├── PokemonStat.js          # Barras de estatísticas
    │   ├── StatBar.js              # Componente de barra de estatística
    │   └── TypeBadge.js            # Badge de tipo de Pokémon
    ├── context/            # Contextos para gerenciamento de estado
    │   └── PokemonContext.js       # Contexto para dados de Pokémon e favoritos
    ├── hooks/              # Hooks personalizados
    ├── navigation/         # Configuração de navegação
    │   ├── index.js                # Exporta navegador principal
    │   ├── MainNavigator.js        # Navegação por tabs
    │   ├── drawerNavigator.js      # Navegação por drawer
    │   ├── navigatorConfig.js      # Configurações de navegação
    │   ├── types.js                # Constantes de navegação
    │   └── stacks/                 # Stacks individuais de navegação
    ├── screens/            # Telas do aplicativo
    │   ├── HomeScreen.js           # Tela inicial
    │   ├── PokemonListScreen.js    # Lista de Pokémon
    │   ├── PokemonDetailScreen.js  # Detalhes do Pokémon (versão 1)
    │   ├── PokemonDetailsScreen.js # Detalhes do Pokémon (versão 2)
    │   ├── TypesScreen.js          # Lista de tipos
    │   ├── TypeDetailScreen.js     # Detalhes de um tipo
    │   ├── GuideScreen.js          # Guia para iniciantes
    │   ├── GuideDetailScreen.js    # Artigos do guia
    │   ├── FavoritesScreen.js      # Pokémon favoritos
    │   └── SearchScreen.js         # Busca avançada
    ├── services/           # Serviços para comunicação com APIs
    │   └── pokeApi.js              # Funções para a PokeAPI
    └── utils/              # Funções utilitárias
        ├── helpers.js              # Funções auxiliares de formatação
        └── evolutionUtils.js       # Processamento de cadeias evolutivas
```

## Descrição dos Arquivos Principais

### Arquivos Raiz

- **App.js**: Componente raiz que configura o provedor de contexto, a navegação e o tema da aplicação.
- **app.json**: Configurações do Expo, como nome do app, versão, ícones, splash screen e configuração de entryPoint.
- **index.js**: Registra o componente App como raiz da aplicação usando registerRootComponent do Expo.
- **package.json**: Lista de dependências e scripts do projeto.

### Pasta `src/components`

Contém componentes reutilizáveis em toda a aplicação:

- **PokemonCard.js**: Card para exibir informações básicas de um Pokémon na lista.
- **PokemonEvolution.js**: Componente melhorado para visualizar a cadeia evolutiva com detalhes sobre como ocorre a evolução (nível, itens, etc.).
- **PokemonStat.js**: Componente para visualizar estatísticas de um Pokémon com barras de progresso.
- **TypeBadge.js**: Badge colorido que representa um tipo de Pokémon.

### Pasta `src/context`

Gerenciamento de estado centralizado:

- **PokemonContext.js**: Provê dados e funções relacionadas aos Pokémon para toda a aplicação, incluindo:
  - Lista de Pokémon com paginação
  - Gerenciamento de busca
  - Gerenciamento de favoritos com persistência local (AsyncStorage)
  - Estados de loading e error

### Pasta `src/navigation`

Configuração do sistema de navegação:

- **index.js**: Exporta o navegador principal e determina o tipo (Tab ou Drawer).
- **MainNavigator.js**: Implementação do Tab Navigator.
- **drawerNavigator.js**: Implementação do Drawer Navigator.
- **navigatorConfig.js**: Configurações compartilhadas para navegação.
- **types.js**: Constantes para nomes de rotas.
- **stacks/**: Stacks de navegação para cada seção do app.

### Pasta `src/screens`

Telas da aplicação:

- **HomeScreen.js**: Tela inicial com introdução ao mundo Pokémon e links para seções principais.
- **PokemonListScreen.js**: Exibe a Pokédex com lista de Pokémon e busca.
- **PokemonDetailScreen.js** e **PokemonDetailsScreen.js**: Duas versões da tela de detalhes de Pokémon (pendente unificação).
- **TypesScreen.js**: Lista os 18 tipos de Pokémon.
- **TypeDetailScreen.js**: Detalhes sobre um tipo específico, incluindo Pokémon desse tipo.
- **GuideScreen.js**: Índice do guia para iniciantes com tópicos educativos.
- **GuideDetailScreen.js**: Conteúdo educativo sobre um tópico específico.
- **FavoritesScreen.js**: Lista de Pokémon favoritos do usuário com persistência.
- **SearchScreen.js**: Tela de busca avançada.

### Pasta `src/services`

Comunicação com APIs externas:

- **pokeApi.js**: Funções para interagir com a PokeAPI, incluindo:
  - `getPokemonDetails`: Busca detalhes de um Pokémon específico
  - `getPokemonList`: Busca lista paginada de Pokémon
  - `getPokemonTypes`: Busca tipos de Pokémon
  - `getTypeDetails`: Busca detalhes de um tipo específico
  - `getEvolutionChain`: Busca cadeia evolutiva de um Pokémon
  - `getRegions`: Busca regiões do mundo Pokémon
  - `getRegionDetails`: Busca detalhes de uma região específica

### Pasta `src/utils`

Funções utilitárias:

- **helpers.js**: Funções auxiliares para formatação e processamento de dados, incluindo:
  - `capitalize`: Capitaliza a primeira letra de uma string
  - `formatPokemonId`: Formata o ID do Pokémon (ex: #001)
  - `getTypeColor`: Retorna a cor correspondente a um tipo de Pokémon
  - `formatWeight`: Converte unidades de peso
  - `formatHeight`: Converte unidades de altura
  - `getPokemonDescription`: Busca descrição do Pokémon em português

- **evolutionUtils.js**: Funções para processamento de cadeias evolutivas:
  - `processEvolutionChain`: Converte dados brutos da API em um formato adequado para o componente PokemonEvolution

## Fluxo de Navegação

O aplicativo utiliza um sistema de navegação flexível que pode alternar entre:

1. **Tab Navigator (padrão)**:
   - Navegação principal por abas na parte inferior
   - Cada aba tem seu próprio stack navigator para navegação interna

2. **Drawer Navigator (alternativa)**:
   - Menu lateral deslizante
   - Mesmo sistema de stacks aninhados para navegação interna

A escolha do tipo de navegação é configurada em `navigatorConfig.js`.

## Gerenciamento de Estado

O aplicativo utiliza o Context API do React para gerenciar o estado global:

- **PokemonContext**: Gerencia todos os dados relacionados a Pokémon
  - Lista de Pokémon
  - Busca
  - Favoritos com persistência local usando AsyncStorage
  - Estados de carregamento e erros

## Persistência de Dados

O aplicativo agora implementa armazenamento local para:

- **Favoritos**: Pokémon marcados como favoritos são armazenados usando AsyncStorage
  - `addFavorite`: Adiciona um Pokémon aos favoritos
  - `removeFavorite`: Remove um Pokémon dos favoritos
  - `isFavorite`: Verifica se um Pokémon está nos favoritos
  - `saveFavorites`: Salva a lista de favoritos no armazenamento
  - `loadFavorites`: Carrega favoritos do armazenamento local

## Comunicação com a API

Todas as comunicações com a PokeAPI são feitas através do arquivo `src/services/pokeApi.js`:

- Utiliza `fetch` para fazer requisições HTTP
- Transforma os dados da API em estruturas mais simples para uso na aplicação
- Trata erros e exceções
- Validação robusta de dados retornados

## Detalhes de Implementação

### Cadeia Evolutiva

- O componente `PokemonEvolution` foi aprimorado para mostrar detalhes sobre como ocorre a evolução
- Exibe informações como nível necessário, item requerido ou método de evolução
- Formatação visual melhorada para mostrar a sequência de evoluções
- Uso de ícones para representar o processo evolutivo

### Validação de Dados

- Todos os componentes agora implementam validação robusta dos dados de entrada
- Verificação de tipos e formatos para evitar erros em tempo de execução
- Tratamento gracioso de falhas na API
- Feedback visual adequado para o usuário em caso de erro

### Estilização

O aplicativo utiliza StyleSheet do React Native para estilização:

- Cores principais:
  - Vermelho primário: `#E63F34` (tom de vermelho Pokémon)
  - Cores de fundo: `#F5F5F5` (cinza claro), `#FFFFFF` (branco)
  - Cores de texto: `#333` (quase preto), `#666` (cinza)

- O design é responsivo e se adapta a diferentes tamanhos de tela

## Como Executar o Projeto

1. Instale as dependências:
   ```
   npm install
   ```
   
2. Instale as dependências extras de navegação e AsyncStorage:
   ```
   npm install @react-navigation/native @react-navigation/drawer @react-navigation/native-stack react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated @react-native-async-storage/async-storage
   ```

3. Inicie o projeto:
   ```
   npm start
   ```

4. Use o Expo Go no seu dispositivo para testar o aplicativo ou execute em um emulador.

## Funcionalidades Principais

1. **Início**: Apresenta o conceito de Pokémon e oferece acesso às principais seções do app.

2. **Pokédex**: Lista completa de Pokémon com busca e filtragem.

3. **Detalhes do Pokémon**: Visualização detalhada de cada Pokémon, incluindo:
   - Estatísticas
   - Tipos
   - Descrição
   - Cadeia evolutiva com detalhes de evolução
   - Habilidades

4. **Tipos**: Guia sobre os 18 tipos de Pokémon e suas características.

5. **Guia para Iniciantes**: Conteúdo educativo sobre o mundo Pokémon.

6. **Favoritos**: Sistema completo de favoritos com persistência local.

## Próximos Passos

Melhorias planejadas para o futuro:

1. Unificar as telas de detalhes (PokemonDetailScreen e PokemonDetailsScreen)
2. Implementar cache para requisições frequentes
3. Adicionar temas claro/escuro
4. Melhorar a acessibilidade
5. Adicionar mais conteúdo educativo
6. Implementar recursos offline
7. Adicionar testes automatizados

## Considerações de Manutenção

- **Performance**: Usar `FlatList` com paginação para listas grandes
- **Memória**: Implementar cache para requisições frequentes
- **Escalabilidade**: Estrutura modular facilita a adição de novas funcionalidades
- **Manutenção**: Código limpo e organizado após remoção de logs de depuração 