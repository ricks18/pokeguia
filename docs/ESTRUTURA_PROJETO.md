# Documentação do Projeto: Guia Pokémon para Iniciantes

Este documento apresenta a estrutura e funcionamento do aplicativo "Guia Pokémon para Iniciantes", desenvolvido em React Native com Expo. O aplicativo tem como objetivo servir como uma plataforma educativa sobre o universo Pokémon para pessoas que não estão familiarizadas com este universo.

## Estrutura de Pastas

```
pokedex/
├── App.js                  # Ponto de entrada da aplicação
├── app.json                # Configurações do Expo
├── package.json            # Dependências do projeto
├── assets/                 # Arquivos estáticos (imagens, fontes, etc.)
├── components/             # Componentes React originais (legado)
└── src/                    # Código fonte principal
    ├── components/         # Componentes reutilizáveis
    ├── context/            # Contextos para gerenciamento de estado
    ├── hooks/              # Hooks personalizados
    ├── navigation/         # Configuração de navegação
    ├── screens/            # Telas do aplicativo
    ├── services/           # Serviços para comunicação com APIs
    └── utils/              # Funções utilitárias
```

## Descrição dos Arquivos Principais

### Arquivos Raiz

- **App.js**: Componente raiz que configura o provedor de contexto, a navegação e o tema da aplicação.
- **app.json**: Configurações do Expo, como nome do app, versão, ícones, splash screen, etc.
- **package.json**: Lista de dependências e scripts do projeto.

### Pasta `src/components`

Contém componentes reutilizáveis em toda a aplicação:

- **PokemonCard.js**: Card para exibir informações básicas de um Pokémon na lista.
- **PokemonStat.js**: Componente para visualizar estatísticas de um Pokémon com barras de progresso.
- **TypeBadge.js**: Badge colorido que representa um tipo de Pokémon.

### Pasta `src/context`

Gerenciamento de estado centralizado:

- **PokemonContext.js**: Provê dados e funções relacionadas aos Pokémon para toda a aplicação, incluindo:
  - Lista de Pokémon com paginação
  - Gerenciamento de busca
  - Gerenciamento de favoritos
  - Estados de loading e error

### Pasta `src/navigation`

Configuração do sistema de navegação:

- **Rotas.js**: Configuração do Drawer Navigator e Stack Navigators aninhados para diferentes seções do app.

### Pasta `src/screens`

Telas da aplicação:

- **HomeScreen.js**: Tela inicial com introdução ao mundo Pokémon e links para seções principais.
- **PokemonListScreen.js**: Exibe a Pokédex com lista de Pokémon e busca.
- **PokemonDetailScreen.js**: Mostra detalhes completos de um Pokémon específico.
- **TypesScreen.js**: Lista os 18 tipos de Pokémon.
- **TypeDetailScreen.js**: Detalhes sobre um tipo específico, incluindo Pokémon desse tipo.
- **GuideScreen.js**: Índice do guia para iniciantes com tópicos educativos.
- **GuideDetailScreen.js**: Conteúdo educativo sobre um tópico específico.
- **FavoritesScreen.js**: Lista de Pokémon favoritos do usuário.
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
  - `processEvolutionChain`: Processa dados da cadeia evolutiva
  - `getPokemonDescription`: Busca descrição do Pokémon em português

## Fluxo de Navegação

O aplicativo utiliza um Drawer Navigator como navegação principal, com Stack Navigators aninhados para cada seção:

1. **Drawer Navigator**:
   - Início (Home)
   - Pokédex
   - Tipos de Pokémon
   - Guia para Iniciantes
   - Meus Favoritos

2. **Stack Navigators**:
   - Cada item do menu drawer tem seu próprio Stack Navigator
   - Isso permite navegar para telas detalhadas dentro de cada seção
   - Mantém histórico de navegação separado para cada seção

## Gerenciamento de Estado

O aplicativo utiliza o Context API do React para gerenciar o estado global:

- **PokemonContext**: Gerencia todos os dados relacionados a Pokémon
  - Estado de carregamento
  - Lista de Pokémon
  - Favoritos
  - Resultados de busca
  - Erros

## Comunicação com a API

Todas as comunicações com a PokeAPI são feitas através do arquivo `src/services/pokeApi.js`:

- Utiliza `fetch` para fazer requisições HTTP
- Transforma os dados da API em estruturas mais simples para uso na aplicação
- Trata erros e exceções

## Estilização

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
   
2. Instale as dependências extras de navegação:
   ```
   npm install @react-navigation/native @react-navigation/drawer @react-navigation/native-stack react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
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
   - Cadeia evolutiva
   - Habilidades

4. **Tipos**: Guia sobre os 18 tipos de Pokémon e suas características.

5. **Guia para Iniciantes**: Conteúdo educativo sobre o mundo Pokémon.

6. **Favoritos**: Permite salvar e acessar rapidamente seus Pokémon favoritos.

## Próximos Passos

Melhorias planejadas para o futuro:

1. Implementar armazenamento local com AsyncStorage para favoritos
2. Adicionar temas claro/escuro
3. Melhorar a acessibilidade
4. Adicionar mais conteúdo educativo
5. Implementar recursos offline

## Considerações de Manutenção

- **Performance**: Usar `FlatList` com paginação para listas grandes
- **Memória**: Implementar cache para requisições frequentes
- **Escalabilidade**: Estrutura modular facilita a adição de novas funcionalidades 