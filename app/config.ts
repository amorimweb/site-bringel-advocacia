// Todos os dados marcados com (PLACEHOLDER) são fictícios e devem ser substituídos pelos reais.
export const site = {
  name: 'Bringel Advocacia',
  short: 'Bringel Advocacia',
  monogram: 'BA',
  kicker: 'Advocacia Previdenciária · Parauapebas',
  title: ['Seu direito,', 'explicado com', 'clareza e cuidado.'],
  intro:
    'Duas advogadas, um só compromisso: traduzir o INSS em decisões seguras para você e sua família — da aposentadoria à revisão de benefícios.',
  quote: 'Entender o INSS é o primeiro passo para garantir aquilo que é seu por direito.',
  about:
    'Em Parauapebas, a Bringel Advocacia oferece atendimento especializado em Direito Previdenciário, acompanhando cada etapa do processo perante o INSS com atenção, transparência e voz firme.',
  address: 'Rua 6, 18 — Parauapebas · PA',
  hours: 'Seg a Sex · 8h às 18h',
  phone: '(94) 99999-0000', // PLACEHOLDER
  whatsapp: '5594999990000', // PLACEHOLDER
  email: 'contato@bringeladvocacia.com.br', // PLACEHOLDER
  map: 'https://www.google.com/maps/search/?api=1&query=-6.0641869,-49.9096432',
  instagram: 'https://instagram.com/bringeladvocacia', // PLACEHOLDER
  image: '/hero.jpg',
  detail: '/detail.jpg',

  stats: [
    { value: 12, suffix: '+', label: 'anos somados de experiência' }, // PLACEHOLDER
    { value: 850, suffix: '+', label: 'famílias atendidas' }, // PLACEHOLDER
    { value: 98, suffix: '%', label: 'de clientes que recomendam' }, // PLACEHOLDER
    { value: 2, suffix: '', label: 'advogadas à frente de cada caso' },
  ],

  areas: [
    ['Aposentadoria', 'Análise do tempo de contribuição e orientação sobre o melhor caminho para se aposentar — por idade, tempo, especial ou rural.', 'shield'],
    ['Benefícios por Incapacidade', 'Auxílio-doença, aposentadoria por invalidez e auxílio-acidente: apoio quando a saúde interfere no trabalho.', 'heart'],
    ['Revisão de Benefícios', 'Análise de benefícios já concedidos para verificar valores e direitos que não foram considerados.', 'refresh'],
    ['Planejamento Previdenciário', 'Leitura do histórico contributivo para decidir quando e como se aposentar, com mais segurança.', 'trend'],
    ['BPC / LOAS', 'Orientação ao idoso e à pessoa com deficiência que buscam o benefício assistencial.', 'hand'],
    ['Pensão por Morte', 'Acolhimento e condução técnica para famílias em um momento delicado.', 'home'],
  ] as [string, string, string][],

  lawyers: [
    {
      name: 'Dra. Helena Bringel', // PLACEHOLDER
      role: 'Sócia-fundadora',
      oab: 'OAB/PA 00.000', // PLACEHOLDER
      initials: 'HB',
      bio: 'Especialista em Direito Previdenciário, atua há mais de 8 anos na análise de aposentadorias e planejamento de carreira contributiva.',
      tags: ['Aposentadorias', 'Planejamento', 'Pós em Dir. Previdenciário'],
      quote: 'Cada contribuição conta uma história de trabalho — e merece ser reconhecida.',
      edu: ['Graduação em Direito — UFPA', 'Pós-graduação em Direito Previdenciário', 'Membro da Comissão de Direito Previdenciário da OAB/PA'], // PLACEHOLDER
    },
    {
      name: 'Dra. Marina Bringel', // PLACEHOLDER
      role: 'Sócia',
      oab: 'OAB/PA 00.001', // PLACEHOLDER
      initials: 'MB',
      bio: 'Dedica-se aos benefícios por incapacidade, BPC e revisões, com atenção especial ao acolhimento de cada cliente.',
      tags: ['Incapacidade', 'BPC / LOAS', 'Revisões'],
      quote: 'Por trás de todo processo há uma família esperando uma resposta.',
      edu: ['Graduação em Direito — UNIFESSPA', 'Especialização em Direito Processual Previdenciário', 'Curso de atualização em perícia médica'], // PLACEHOLDER
    },
  ],

  values: [
    ['Linguagem sem “juridiquês”', 'Você entende cada etapa do seu processo, em português claro.'],
    ['Análise individualizada', 'Cada histórico contributivo é único — e tratado como tal.'],
    ['Acompanhamento de perto', 'Atualizações constantes e canal direto com as advogadas.'],
    ['Transparência desde o início', 'Honorários e caminhos possíveis explicados antes de começar.'],
  ] as [string, string][],

  steps: [
    ['Escuta', 'Uma conversa acolhedora para entender seu contexto, seus documentos e suas prioridades.'],
    ['Análise', 'Leitura técnica do CNIS e do histórico, com apresentação clara dos caminhos possíveis.'],
    ['Estratégia', 'Definimos juntas o melhor caminho — administrativo ou judicial — e os prazos.'],
    ['Condução', 'Acompanhamos o processo junto ao INSS e mantemos você informado a cada movimentação.'],
  ] as [string, string][],

  testimonials: [
    { text: 'Eu já tinha desistido da aposentadoria. Elas analisaram meu CNIS com calma e encontraram anos que o INSS não tinha contado.', who: 'Maria das Dores', meta: 'Aposentada · Parauapebas' }, // PLACEHOLDER
    { text: 'Atendimento humano e muito claro. Em nenhum momento me senti perdido no processo — sempre soube em que pé estava.', who: 'José Ribeiro', meta: 'Benefício por incapacidade' }, // PLACEHOLDER
    { text: 'Revisaram meu benefício e o valor mudou. Recomendo de olhos fechados para qualquer pessoa da minha família.', who: 'Antônia Souza', meta: 'Revisão de benefício' }, // PLACEHOLDER
  ],

  posts: [
    { tag: 'Aposentadoria', title: 'Como saber se já posso me aposentar? 5 pontos para checar no CNIS', date: '12 set 2026', read: '5 min' }, // PLACEHOLDER
    { tag: 'Incapacidade', title: 'Benefício negado pelo INSS: o que fazer nos primeiros 30 dias', date: '28 ago 2026', read: '4 min' },
    { tag: 'Planejamento', title: 'Planejamento previdenciário: por que começar antes dos 50', date: '05 ago 2026', read: '6 min' },
  ],


  faq: [
    ['Como funciona o primeiro contato com o escritório?', 'O atendimento começa com uma breve explicação da sua situação previdenciária, para organizarmos a análise do caso com mais detalhes.'],
    ['Quais documentos costumam ser necessários?', 'Documentos pessoais, CNIS, carteira de trabalho e comunicações do INSS. Cada caso pode exigir documentos específicos.'],
    ['O escritório atende apenas aposentadoria?', 'Não. Além de aposentadorias, a atuação inclui benefícios por incapacidade, BPC/LOAS, pensão por morte, planejamento e revisão de benefícios.'],
    ['É possível revisar um benefício já concedido?', 'Em determinadas situações, sim. A análise do histórico contributivo pode indicar se há espaço para revisão.'],
    ['Atendem pessoas de outras cidades?', 'Sim. Parte do atendimento pode ser feita online, por videochamada e WhatsApp, com envio digital de documentos.'],
  ] as [string, string][],
};
