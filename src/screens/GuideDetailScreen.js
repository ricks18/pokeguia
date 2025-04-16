import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';

// Dados dos artigos do guia
const articleContent = {
  'basics': {
    title: 'O que são Pokémon?',
    banner: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    sections: [
      {
        title: 'Origem dos Pokémon',
        content: 'Pokémon, abreviação de "Pocket Monsters" (Monstros de Bolso), são criaturas fictícias que habitam o mundo dos jogos, animes e produtos da franquia Pokémon. O conceito foi criado por Satoshi Tajiri em 1996, inspirado em seu hobby de colecionar insetos quando criança.\n\nNo universo Pokémon, estas criaturas coexistem com humanos e podem ser capturadas, treinadas e usadas em batalhas por pessoas conhecidas como "Treinadores Pokémon".',
      },
      {
        title: 'Características dos Pokémon',
        content: 'Existem mais de 900 espécies de Pokémon, cada uma com características únicas. Eles vêm em diferentes formas, tamanhos e tipos, desde pequenos roedores elétricos como Pikachu até dragões enormes como Rayquaza.\n\nCada Pokémon possui estatísticas únicas (como Ataque, Defesa, Velocidade), habilidades especiais e podem aprender diversos movimentos. A maioria dos Pokémon também pode evoluir para formas mais poderosas ao longo do tempo.',
      },
      {
        title: 'Como eles se encaixam no mundo',
        content: 'No mundo Pokémon, estas criaturas são parte integrante da sociedade. Alguns são companheiros de estimação, outros ajudam em trabalhos, pesquisas ou são parceiros de batalha.\n\nPokémon são encontrados em diversos habitats naturais, como florestas, cavernas, oceanos, montanhas, e até mesmo em ambientes urbanos. Cada região do mundo Pokémon abriga espécies diferentes, adaptadas aos seus ambientes específicos.',
      },
      {
        title: 'A relação entre humanos e Pokémon',
        content: 'O relacionamento entre humanos e Pokémon é central para a franquia. Embora as batalhas sejam um elemento importante, a mensagem principal é sobre amizade, crescimento mútuo e respeito.\n\nTreinadores capturam Pokémon usando dispositivos chamados Pokébolas, e trabalham para fortalecer o vínculo com suas criaturas. Este vínculo é frequentemente representado como uma parceria mutuamente benéfica, onde ambos crescem e se desenvolvem juntos.',
      },
    ],
  },
  'types': {
    title: 'Tipos de Pokémon',
    banner: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
    sections: [
      {
        title: 'Sistema de Tipos',
        content: 'O sistema de tipos é um dos elementos mais importantes do mundo Pokémon. Cada Pokémon pertence a um ou dois tipos, que determinam suas fraquezas, resistências e imunidades. Atualmente, existem 18 tipos diferentes.',
      },
      {
        title: 'Tipos Elementais',
        content: 'Os tipos mais básicos são baseados em elementos naturais: Água, Fogo, Grama (Planta), Elétrico, Gelo e Terrestre. Estes formam um sistema de vantagens e desvantagens similar a "pedra, papel e tesoura".\n\nPor exemplo, Pokémon de Fogo são fortes contra Pokémon de Grama, mas fracos contra Água. Por sua vez, Pokémon de Água são fortes contra Fogo, mas fracos contra Elétrico e Grama.',
      },
      {
        title: 'Outros Tipos',
        content: 'Além dos tipos elementais, existem outros como Normal, Lutador, Voador, Venenoso, Psíquico, Inseto, Pedra, Fantasma, Dragão, Noturno, Metálico e Fada.\n\nAlguns tipos têm características especiais: Fantasma é imune a ataques do tipo Normal, Fada é imune a ataques do tipo Dragão, e Elétrico não afeta Pokémon do tipo Terrestre.',
      },
      {
        title: 'Pokémon com Dois Tipos',
        content: 'Muitos Pokémon possuem dois tipos, como Charizard (Fogo/Voador) ou Gyarados (Água/Voador). Isso lhes dá um conjunto único de fraquezas e resistências baseado na combinação dos dois tipos.\n\nEsta característica adiciona profundidade estratégica às batalhas, pois um segundo tipo pode neutralizar fraquezas do primeiro tipo ou adicionar novas vulnerabilidades.',
      },
    ],
  },
  'evolution': {
    title: 'Evolução',
    banner: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
    sections: [
      {
        title: 'O Conceito de Evolução',
        content: 'Evolução no mundo Pokémon é um processo de transformação onde um Pokémon muda para uma forma mais desenvolvida, geralmente ficando mais forte. Ao contrário da evolução biológica real, este processo é rápido e dramático, com o Pokémon mudando completamente sua aparência em segundos.',
      },
      {
        title: 'Métodos de Evolução',
        content: 'Existem diversos métodos para um Pokémon evoluir:\n\n- Por nível: o mais comum, onde o Pokémon evolui ao atingir certo nível de experiência\n- Por pedra: usando itens especiais como Pedra de Fogo ou Pedra da Água\n- Por amizade: quando o Pokémon atinge um alto nível de felicidade com seu treinador\n- Por troca: alguns Pokémon só evoluem quando são trocados entre jogadores\n- Por ambiente: alguns evoluem apenas em locais específicos ou horários do dia\n- Por movimentos: aprender certos movimentos pode desencadear evoluções',
      },
      {
        title: 'Cadeias Evolutivas',
        content: 'Muitos Pokémon possuem cadeias evolutivas com múltiplos estágios. Por exemplo, Charmander evolui para Charmeleon, que por sua vez evolui para Charizard.\n\nAlguns Pokémon, como Eevee, possuem evoluções ramificadas, podendo evoluir para diferentes formas dependendo do método usado.',
      },
      {
        title: 'Escolhendo Não Evoluir',
        content: 'Nem sempre evoluir é a melhor opção. Alguns Pokémon podem aprender movimentos mais cedo em suas formas pré-evoluídas, e outros, como Pikachu, têm formas pré-evoluídas que são culturalmente significativas.\n\nOs jogos permitem que os jogadores impeçam a evolução de seus Pokémon, dando-lhes controle sobre este aspecto do desenvolvimento de sua equipe.',
      },
    ],
  },
  'regions': {
    title: 'Regiões do Mundo Pokémon',
    banner: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/384.png',
    sections: [
      {
        title: 'O Mundo Pokémon',
        content: 'O universo Pokémon é dividido em várias regiões principais, cada uma inspirada em diferentes partes do mundo real. Cada região tem sua própria cultura, geografia e Pokémon nativos.',
      },
      {
        title: 'Regiões Principais',
        content: '- Kanto: A região original, baseada na região de Kanto do Japão, lar dos primeiros 151 Pokémon\n\n- Johto: Adjacente a Kanto, baseada na região de Kansai do Japão\n\n- Hoenn: Uma região insular, inspirada na ilha de Kyushu do Japão\n\n- Sinnoh: Uma região montanhosa, baseada na ilha de Hokkaido do Japão\n\n- Unova: A primeira região baseada fora do Japão, inspirada na área metropolitana de Nova York\n\n- Kalos: Inspirada na França, conhecida por sua elegância e beleza\n\n- Alola: Baseada no Havaí, composta por quatro ilhas principais\n\n- Galar: Inspirada no Reino Unido, conhecida por seus fenômenos Dynamax e Gigantamax',
      },
      {
        title: 'Características Regionais',
        content: 'Cada região possui:\n\n- Um conjunto de Pokémon nativos\n- Uma equipe vilã local\n- Um sistema de Liga Pokémon com oito Ginásios e Elite Four\n- Um Professor Pokémon regional que estuda algum aspecto específico dos Pokémon\n- Características geográficas únicas como vulcões, cavernas, montanhas, ou mares',
      },
      {
        title: 'Formas Regionais',
        content: 'Alguns Pokémon desenvolveram formas regionais adaptadas aos ambientes específicos. Por exemplo, em Alola, certos Pokémon de Kanto adaptaram-se ao clima tropical, resultando em aparências e tipos diferentes. Da mesma forma, Galar tem suas próprias variantes de Pokémon existentes.\n\nEstas adaptações refletem como as diferentes regiões do mundo Pokémon têm seus próprios ecossistemas distintos.',
      },
    ],
  },
  'battle': {
    title: 'Combates Pokémon',
    banner: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png',
    sections: [
      {
        title: 'Fundamentos das Batalhas',
        content: 'As batalhas Pokémon são competições onde os Treinadores comandam seus Pokémon para enfrentar outros Pokémon. Estas batalhas são baseadas em turnos, onde cada Pokémon pode atacar, usar habilidades especiais, trocar de posição ou usar itens.',
      },
      {
        title: 'Sistema de Tipos e Vantagens',
        content: 'A mecânica mais fundamental das batalhas é o sistema de tipos, onde cada ataque e cada Pokémon têm tipos específicos. Alguns tipos são eficazes contra outros ("super efetivo"), enquanto outros são ineficazes ("não muito efetivo") ou completamente inúteis.\n\nPor exemplo, ataques de Água são super efetivos contra Pokémon de Fogo, mas não muito efetivos contra Pokémon de Grama. Conhecer estas relações é crucial para o sucesso nas batalhas.',
      },
      {
        title: 'Estatísticas e Status',
        content: 'Cada Pokémon possui seis estatísticas básicas: HP (pontos de vida), Ataque, Defesa, Ataque Especial, Defesa Especial e Velocidade. Estas estatísticas determinam o desempenho do Pokémon em batalha.\n\nAlém disso, Pokémon podem ser afetados por condições de status como Queimadura, Paralisia, Veneno, Sono ou Congelamento, que impactam sua performance.',
      },
      {
        title: 'Estratégias de Batalha',
        content: 'Batalhas Pokémon bem-sucedidas exigem estratégia, não apenas força bruta. Algumas estratégias comuns incluem:\n\n- Construção de equipe equilibrada com Pokémon que cobrem as fraquezas uns dos outros\n- Pokémon de suporte que podem curar aliados ou causar condições de status aos oponentes\n- Pokémon "tank" com alto HP e defesa para absorver dano\n- Pokémon velozes para atacar primeiro\n- Preparação de movimentos para aumentar estatísticas\n\nA chave para se tornar um bom Treinador é entender as forças e fraquezas de seus Pokémon e como eles podem trabalhar juntos como uma equipe.',
      },
    ],
  },
  'items': {
    title: 'Itens e Ferramentas',
    banner: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/079.png',
    sections: [
      {
        title: 'Pokébolas',
        content: 'As Pokébolas são dispositivos esféricos usados para capturar e armazenar Pokémon. Existem diversos tipos de Pokébolas com diferentes taxas de sucesso:\n\n- Pokébola: A básica\n- Great Ball: Melhor que a Pokébola básica\n- Ultra Ball: Alta taxa de captura\n- Master Ball: Captura qualquer Pokémon sem falhas\n- Pokébolas especiais: Como Timer Ball (mais eficaz em batalhas longas) e Net Ball (melhor para Pokémon aquáticos e insetos)',
      },
      {
        title: 'Itens de Cura',
        content: 'Estes itens restauram HP, curam condições de status ou revigoram Pokémon:\n\n- Poções: Restauram HP em diferentes quantidades (Poção, Super Poção, Hiper Poção)\n- Reviver: Ressuscita Pokémon desmaiados\n- Antídotos, Despertares, Anti-Queimadura: Curam condições de status específicas\n- Full Restore: Cura todos os HP e todas as condições de status',
      },
      {
        title: 'Itens Seguráveis',
        content: 'Pokémon podem segurar itens que fornecem efeitos passivos durante batalhas:\n\n- Bagas: Fornecem diversos efeitos como cura, aumento de estatísticas ou resistência a tipos\n- Itens de Aumento de Estatísticas: Como Choice Band (aumenta Ataque) ou Choice Specs (aumenta Ataque Especial)\n- Itens de Tipo: Aumentam o poder de movimentos de um tipo específico\n- Leftovers: Restaura HP gradualmente durante a batalha',
      },
      {
        title: 'Itens Evolutivos',
        content: 'Estes itens desencadeiam a evolução de certos Pokémon:\n\n- Pedras Evolutivas: Como Pedra de Fogo, Pedra da Água, Pedra Trovão\n- Itens de Troca: Como Metal Coat ou Reaper Cloth, que funcionam quando o Pokémon é trocado\n- Itens Especiais: Como Escama do Dragão ou Up-Grade\n\nCada Pokémon que evolui através de itens tem requisitos específicos, adicionando complexidade ao sistema de evolução.',
      },
    ],
  },
};

const GuideDetailScreen = ({ route }) => {
  const { guideId } = route.params;
  const article = articleContent[guideId];

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Artigo não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{article.title}</Text>
      </View>
      
      {article.banner && (
        <Image
          source={{ uri: article.banner }}
          style={styles.banner}
          resizeMode="contain"
        />
      )}
      
      <View style={styles.content}>
        {article.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
      </View>
      
      {/* Espaço adicional no final da tela */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#E63F34',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#E63F34',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  banner: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default GuideDetailScreen; 