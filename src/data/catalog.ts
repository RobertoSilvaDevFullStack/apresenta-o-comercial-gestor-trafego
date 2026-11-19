export type PlanId = 'essencial' | 'profissional' | 'completo';

export type Plan = {
  id: PlanId;
  name: string;
  subtitle: string;
  amount: number;
  setup: number;
  description: string;
  included: string[];
  excluded: string[];
  featured?: boolean;
};

export type WebsiteId = 'profissional' | 'avancada' | 'institucional' | 'comercial';

export type WebsiteCategory = 'landing' | 'site';

export type Website = {
  id: WebsiteId;
  name: string;
  category: WebsiteCategory;
  badge?: string;
  price: number;
  startingAt?: boolean;
  paymentLabel: string;
  description: string;
  includedTitle: string;
  included: string[];
  sitelinksNote?: {
    title: string;
    description: string;
  };
  limitsTitle?: string;
  limits?: string[];
  footnote?: string;
};

export const plans: Plan[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    subtitle: 'Google Ads',
    amount: 800,
    setup: 500,
    description: 'Para negócios que precisam de acompanhamento contínuo de anúncios de pesquisa.',
    included: [
      'Gestão de até 2 campanhas de Pesquisa Google Ads',
      'Revisão de segmentação geográfica, horários e anúncios',
      'Pesquisa e ajustes de palavras-chave e negativas',
      'Otimizações periódicas de lances e orçamento',
      'Monitoramento básico de conversões já configuradas',
      'Relatório mensal e uma reunião de até 30 minutos, se necessária',
    ],
    excluded: [
      'Criação ou manutenção de site',
      'Gestão do Perfil da Empresa no Google',
      'Auditorias de canais externos ou integrações complexas',
    ],
  },
  {
    id: 'profissional',
    name: 'Profissional',
    subtitle: 'Google Ads + Presença Local',
    amount: 1100,
    setup: 700,
    description: 'Para fortalecer anúncios e informações da empresa na Pesquisa e no Maps.',
    included: [
      'Tudo do plano Essencial',
      'Gestão básica de 1 Perfil da Empresa no Google',
      'Conferência de telefone, endereço e horário',
      'Atualização de categorias, serviços e descrição, quando aplicável',
      'Até 2 atualizações mensais de fotos ou publicações com material fornecido pelo cliente',
      'Acompanhamento básico de visualizações e interações do perfil',
    ],
    excluded: [
      'Manutenção do site ou produção de conteúdo em volume',
      'Resposta a avaliações, chats ou atendimento comercial diário',
      'Regularização complexa de suspensão ou recuperação de perfil',
    ],
    featured: true,
  },
  {
    id: 'completo',
    name: 'Completo',
    subtitle: 'Presença Digital Integrada',
    amount: 1500,
    setup: 900,
    description: 'Para campanhas, presença local e pequenas correções contínuas no próprio site.',
    included: [
      'Tudo do plano Profissional',
      'Manutenção corretiva básica de 1 site existente',
      'Até 2 horas mensais de pequenas alterações: texto, imagem, links, CTAs e correções pontuais',
      'Verificação mensal dos botões de contato e principais páginas de campanha',
      'Acompanhamento básico de eventos de conversão já implementados',
      'Relatório consolidado de anúncios, site e presença local',
    ],
    excluded: [
      'Novas páginas ou redesign completo',
      'Correção de sistemas e integrações de terceiros',
      'Automação, CRM e desenvolvimento de novas funcionalidades',
    ],
  },
];

export const websites: Website[] = [
  {
    id: 'profissional',
    name: 'Landing Page Profissional',
    category: 'landing',
    badge: 'Produto de entrada',
    price: 1800,
    paymentLabel: 'Pagamento único',
    description:
      'Solução inicial da categoria de desenvolvimento, estruturada para apresentar sua empresa, captar contatos e converter visitantes em campanhas de Google Ads.',
    includedTitle: 'Escopo incluído',
    included: [
      'Desenvolvimento de landing page responsiva',
      'Layout profissional personalizado',
      'Estrutura de página única com seções estratégicas',
      'Apresentação da empresa e seus serviços',
      'Textos comerciais orientados à conversão',
      'Botões de WhatsApp e ligação telefônica',
      'Apresentação das regiões atendidas, quando aplicável',
      'Formulário básico de contato, quando necessário',
      'SEO técnico básico',
      'Configuração de títulos e metadescrições',
      'Integração básica com Google Tag Manager',
      'Configuração de eventos de conversão para WhatsApp e telefone',
      'Otimização inicial de desempenho e experiência mobile',
      'Publicação e testes de funcionamento',
      'Estrutura preparada para utilização em campanhas Google Ads',
    ],
    sitelinksNote: {
      title: 'Estrutura preparada para sitelinks',
      description:
        'Planejada com até seis seções relevantes que podem servir como destinos de sitelinks, utilizando navegação interna por âncoras com identificadores únicos e links funcionais quando tecnicamente adequado. A definição dos destinos depende do segmento e do conteúdo de cada cliente, sem obrigação universal nem garantia de aprovação ou exibição pelo Google Ads.',
    },
    limitsTitle: 'Limites do escopo',
    limits: [
      'Uma landing page',
      'Até seis seções principais, conforme briefing',
      'Até duas rodadas de ajustes',
      'Um idioma',
      'Sem painel administrativo personalizado',
      'Sem integrações complexas com CRM',
      'Sem desenvolvimento de automações avançadas',
      'Sem manutenção mensal inclusa',
    ],
    footnote:
      'Domínio, hospedagem, produção profissional de fotos e vídeos e funcionalidades adicionais deverão ser contratados separadamente, quando aplicável.',
  },
  {
    id: 'avancada',
    name: 'Landing Page Avançada',
    category: 'landing',
    badge: 'Conversão ampliada',
    price: 2500,
    paymentLabel: 'Pagamento único',
    description:
      'Evolução comercial com maior personalização de estrutura, recursos adicionais de captação e otimizações orientadas a CRO.',
    includedTitle: 'Inclui os recursos da Landing Page Profissional, acrescentando:',
    included: [
      'Estrutura comercial ampliada',
      'Seções e componentes personalizados conforme o projeto',
      'Formulários com integrações mais elaboradas, previamente delimitadas',
      'Recursos adicionais de captação de leads',
      'Configuração mais detalhada de eventos e conversões',
      'SEO técnico ampliado',
      'Otimização adicional de desempenho',
      'Ajustes de conversão com base em boas práticas de CRO',
    ],
    footnote:
      'Integrações complexas, CRM sob medida e automações avançadas dependem de orçamento específico.',
  },
  {
    id: 'institucional',
    name: 'Site Institucional',
    category: 'site',
    price: 3500,
    paymentLabel: 'Pagamento único',
    description:
      'Presença institucional com navegação estruturada e páginas dedicadas à apresentação da empresa e dos serviços.',
    includedTitle: 'Escopo incluído',
    included: [
      'Até cinco páginas',
      'Design responsivo',
      'Apresentação institucional',
      'Páginas de serviços',
      'Página de contato',
      'Integração com WhatsApp',
      'SEO básico',
      'Navegação estruturada',
      'Publicação e testes',
    ],
  },
  {
    id: 'comercial',
    name: 'Site Comercial com SEO Local',
    category: 'site',
    badge: 'Solução mais completa',
    price: 4500,
    startingAt: true,
    paymentLabel: 'Pagamento único',
    description:
      'Solução mais completa para trabalhar diferentes serviços e regiões atendidas com foco em SEO local e campanhas Google Ads.',
    includedTitle: 'Escopo incluído',
    included: [
      'Site comercial multipáginas',
      'Arquitetura de navegação personalizada',
      'Páginas específicas de serviços',
      'Páginas de regiões atendidas conforme escopo',
      'SEO local e estrutura de links internos',
      'Integrações de contato e conversão',
      'Integração com Google Tag Manager',
      'Otimização de desempenho',
      'Layout responsivo',
      'Preparação para campanhas Google Ads',
    ],
    footnote:
      'O número de páginas e a complexidade das funcionalidades devem ser definidos na proposta individual.',
  },
];

export const brl = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);

export const formatWebsitePrice = (site: Website): string =>
  `${site.startingAt ? 'a partir de ' : ''}${brl(site.price)}`;

export type ProposalCalculation = {
  plan: Plan;
  site?: Website;
  setupFee: number;
  developmentCost: number;
  initialInvestment: number;
  monthlyAmount: number;
  firstMonthTotal: number;
  isStartingAt: boolean;
};

export function calculateProposal(
  planId: PlanId,
  siteId: WebsiteId | '',
  includeSetup: boolean,
): ProposalCalculation {
  const plan = plans.find((item) => item.id === planId) ?? plans[0];
  const site = siteId ? websites.find((item) => item.id === siteId) : undefined;
  const setupFee = includeSetup ? plan.setup : 0;
  const developmentCost = site?.price ?? 0;
  const initialInvestment = developmentCost + setupFee;
  const monthlyAmount = plan.amount;
  const firstMonthTotal = initialInvestment + monthlyAmount;
  const isStartingAt = Boolean(site?.startingAt);

  return {
    plan,
    site,
    setupFee,
    developmentCost,
    initialInvestment,
    monthlyAmount,
    firstMonthTotal,
    isStartingAt,
  };
}

export function buildProposalSummary(calc: ProposalCalculation, includeSetup: boolean): string {
  const startingPrefix = calc.isStartingAt ? 'a partir de ' : '';
  const siteLabel = calc.site
    ? `${calc.site.name} — ${formatWebsitePrice(calc.site)}`
    : 'Sem novo site';
  const setupLabel = includeSetup ? brl(calc.setupFee) : `Não incluída (${brl(0)})`;

  return [
    'PROPOSTA COMERCIAL',
    `Plano: ${calc.plan.name} (${calc.plan.subtitle}) — ${brl(calc.plan.amount)}/mês`,
    `Desenvolvimento: ${siteLabel}`,
    `Implantação: ${setupLabel}`,
    `Criação + implantação: ${startingPrefix}${brl(calc.initialInvestment)}`,
    `Mensalidade: ${brl(calc.monthlyAmount)}`,
    `Total do primeiro mês: ${startingPrefix}${brl(calc.firstMonthTotal)}`,
    'Não inclui verba de anúncios, hospedagem, domínio ou serviços extras.',
    'Valores sujeitos à definição final do escopo.',
  ].join('\n');
}
