import { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  FileText,
  Globe2,
  MapPin,
  Menu,
  MousePointerClick,
  Printer,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  brl,
  buildProposalSummary,
  calculateProposal,
  formatWebsitePrice,
  PlanId,
  plans,
  WebsiteId,
  websites,
} from './data/catalog';

function SectionHeader({
  number,
  overline,
  title,
  description,
}: {
  number: string;
  overline: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <span className="eyebrow">
        {number} / {overline}
      </span>
      <h2 className="section-title">{title}</h2>
      <p className="mt-3 max-w-3xl text-muted">{description}</p>
    </div>
  );
}

function BulletList({ items, positive = true }: { items: string[]; positive?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="feature">
          {positive ? <CheckCircle2 size={16} /> : <X size={16} className="!text-[#e9a0a0]" />}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ['Gestão mensal', '#gestao'],
    ['Sites e landing pages', '#sites'],
    ['Escopo', '#escopo'],
    ['Simulação', '#proposta'],
    ['Condições', '#condicoes'],
  ];

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line bg-night/95 backdrop-blur-xl">
      <div className="wrap flex min-h-[72px] items-center justify-between gap-6">
        <a href="#inicio" className="text-lg font-black tracking-tight">
          SOLUÇÕES<span className="text-mint"> DIGITAIS</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-muted lg:flex">
          {links.map(([name, url]) => (
            <a className="hover:text-white" key={url} href={url}>
              {name}
            </a>
          ))}
        </nav>
        <a href="#proposta" className="btn-main hidden !px-4 !py-2 text-sm sm:inline-flex">
          Montar proposta <ArrowRight size={16} />
        </a>
        <button
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-line p-2 lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <nav className="wrap flex flex-col gap-3 border-t border-line py-4 text-sm lg:hidden">
          {links.map(([name, url]) => (
            <a onClick={() => setOpen(false)} key={url} href={url}>
              {name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

const scopeRows: [string, boolean, boolean, boolean][] = [
  ['Gestão de Google Ads (até 2 campanhas de Pesquisa)', true, true, true],
  ['Otimização e palavras-chave negativas', true, true, true],
  ['Relatório mensal', true, true, true],
  ['Gestão básica de 1 Perfil da Empresa', false, true, true],
  ['Atualizações básicas do perfil (até 2/mês)', false, true, true],
  ['Pequenas correções no site (até 2h/mês)', false, false, true],
  ['Verificação mensal dos principais CTAs do site', false, false, true],
  ['Novas páginas, redesign, CRM e automações', false, false, false],
];

function Compare() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[670px] text-left text-sm">
        <thead className="bg-surface2">
          <tr>
            <th className="px-4 py-4">Entrega recorrente</th>
            {plans.map((p) => (
              <th className="px-4 py-4 text-center" key={p.id}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scopeRows.map(([label, ...statuses]) => (
            <tr className="border-t border-line" key={label}>
              <td className="px-4 py-4 text-[#d4e3f3]">{label}</td>
              {statuses.map((s, i) => (
                <td key={i} className="px-4 py-4 text-center">
                  {s ? (
                    <span className="font-bold text-mint">Incluído</span>
                  ) : label.startsWith('Novas') ? (
                    <span className="text-gold">À parte</span>
                  ) : (
                    <span className="text-muted">Não</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ProposalProps = {
  planId: PlanId;
  onPlanChange: (id: PlanId) => void;
  siteId: WebsiteId | '';
  onSiteChange: (id: WebsiteId | '') => void;
};

function Proposal({ planId, onPlanChange, siteId, onSiteChange }: ProposalProps) {
  const [includeSetup, setIncludeSetup] = useState(true);
  const [feedback, setFeedback] = useState('');

  const calc = calculateProposal(planId, siteId, includeSetup);
  const summary = buildProposalSummary(calc, includeSetup);

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setFeedback('Resumo copiado para a área de transferência.');
    } catch {
      setFeedback('Não foi possível copiar automaticamente neste navegador.');
    }
  }

  return (
    <section id="proposta" className="scroll-mt-24 bg-[#101a2a] py-20">
      <div className="wrap">
        <SectionHeader
          number="05"
          overline="Sua proposta"
          title="Simule o investimento"
          description="Combine o plano recorrente com o desenvolvimento do site ou landing page. Os valores abaixo são ilustrativos e não substituem proposta e contrato individuais."
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="panel space-y-6 p-6">
            <label className="block">
              <span className="mb-2 block font-semibold">Gestão mensal</span>
              <select
                className="field"
                value={planId}
                onChange={(e) => onPlanChange(e.target.value as PlanId)}
              >
                {plans.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name} — {brl(p.amount)}/mês
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block font-semibold">Desenvolvimento (site ou landing page)</span>
              <select
                className="field"
                value={siteId}
                onChange={(e) => onSiteChange(e.target.value as WebsiteId | '')}
              >
                <option value="">Sem novo site</option>
                {websites.map((s) => (
                  <option value={s.id} key={s.id}>
                    {s.name} — {formatWebsitePrice(s)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-[#53d6bd]"
                checked={includeSetup}
                onChange={(e) => setIncludeSetup(e.target.checked)}
              />
              <span>Incluir taxa de implantação ({brl(calc.plan.setup)})</span>
            </label>
            <p className="text-sm text-muted">
              A implantação inclui configuração inicial do serviço de gestão escolhido. Projetos fora
              do escopo são orçados separadamente.
            </p>
          </div>
          <div className="panel space-y-5 bg-surface2 p-6">
            <div className="space-y-1.5 border-b border-line pb-4 text-sm text-muted">
              <div className="flex justify-between gap-3">
                <span>Gestão mensal:</span>
                <strong className="text-white">
                  {calc.plan.name} ({brl(calc.plan.amount)}/mês)
                </strong>
              </div>
              <div className="flex justify-between gap-3">
                <span>Desenvolvimento:</span>
                <strong className="text-right text-white">
                  {calc.site ? `${calc.site.name} (${formatWebsitePrice(calc.site)})` : 'Sem novo site'}
                </strong>
              </div>
              <div className="flex justify-between gap-3">
                <span>Implantação:</span>
                <strong className="text-white">
                  {includeSetup ? brl(calc.setupFee) : 'Não incluída'}
                </strong>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted">Criação + implantação</span>
              {calc.isStartingAt && (
                <span className="mt-1 block text-xs font-semibold text-muted">A partir de</span>
              )}
              <div className="mt-1 text-4xl font-black text-white">
                {brl(calc.initialInvestment)}
              </div>
            </div>
            <div className="border-t border-line pt-4">
              <span className="text-sm text-muted">Mensalidade recorrente</span>
              <div className="mt-1 text-3xl font-extrabold text-mint">{brl(calc.monthlyAmount)}</div>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
              <span className="text-sm">Total do primeiro mês</span>
              <strong className="text-right text-xl">
                {calc.isStartingAt ? 'A partir de ' : ''}
                {brl(calc.firstMonthTotal)}
              </strong>
            </div>
            <div className="actionbar flex flex-wrap gap-3">
              <button onClick={copy} className="btn-main flex-1 text-sm">
                <Clipboard size={17} /> Copiar resumo
              </button>
              <button onClick={() => window.print()} className="btn-alt flex-1 text-sm">
                <Printer size={17} /> Salvar PDF
              </button>
            </div>
            <div role="status" aria-live="polite" className="text-sm text-mint">
              {feedback}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Investimento de mídia, hospedagem e domínio não estão incluídos.
        </p>
      </div>
    </section>
  );
}

function App() {
  const [planId, setPlanId] = useState<PlanId>('profissional');
  const [siteId, setSiteId] = useState<WebsiteId | ''>('profissional');

  return (
    <>
      <Header />
      <main>
        <section
          id="inicio"
          className="relative overflow-hidden scroll-mt-24 border-b border-line bg-[radial-gradient(ellipse_at_85%_20%,#1c4962_0%,#0b1220_54%)] py-24 md:py-32"
        >
          <div className="wrap">
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="tag">Apresentação comercial</span>
              <span className="tag">Serviços digitais</span>
              <span className="tag">Escopos transparentes</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.13] tracking-tight md:text-6xl">
              Mais visibilidade.
              <br />
              <span className="text-mint">Mais contatos.</span>
              <br />
              Escopo claro.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#c1d2e7]">
              Gestão profissional de anúncios no Google, presença local e desenvolvimento de páginas
              pensadas para transformar visitas em oportunidades comerciais. Escolha a combinação
              adequada ao momento da sua empresa, com entregáveis e limites definidos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-main" href="#gestao">
                Conhecer os planos <ArrowRight size={18} />
              </a>
              <a className="btn-alt" href="#sites">
                Ver soluções de site
              </a>
            </div>
            <p className="mt-8 text-sm text-muted">
              Valores de referência para novos contratos. A proposta final depende do escopo e das
              necessidades de cada negócio.
            </p>
          </div>
        </section>

        <section id="gestao" className="scroll-mt-24 py-20">
          <div className="wrap">
            <SectionHeader
              number="01"
              overline="Contratos recorrentes"
              title="Planos de gestão mensal"
              description="Honorários de prestação de serviços. A verba de publicidade paga diretamente ao Google não está inclusa."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {plans.map((p) => (
                <article
                  key={p.id}
                  className={`panel relative flex flex-col p-6 ${
                    p.featured ? 'border-mint shadow-[0_0_0_1px_#53d6bd]' : ''
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 right-5 rounded-full bg-mint px-3 py-1 text-xs font-black text-night">
                      Mais procurado
                    </span>
                  )}
                  <span className="eyebrow">{p.name}</span>
                  <h3 className="mt-2 text-xl font-extrabold">{p.subtitle}</h3>
                  <div className="mt-4 text-4xl font-black">
                    {brl(p.amount)}
                    <span className="text-sm font-semibold text-muted"> / mês</span>
                  </div>
                  <p className="mb-5 mt-3 min-h-[66px] text-sm text-muted">{p.description}</p>
                  <div className="border-t border-line pt-5">
                    <h4 className="mb-4 text-sm font-bold text-mint">Inclui</h4>
                    <BulletList items={p.included} />
                  </div>
                  <div className="mt-6 border-t border-line pt-5">
                    <h4 className="mb-4 text-sm font-bold text-[#f2baba]">Não inclui</h4>
                    <BulletList items={p.excluded} positive={false} />
                  </div>
                  <a
                    href="#proposta"
                    onClick={() => setPlanId(p.id)}
                    className="btn-alt mt-7 text-center"
                  >
                    Selecionar plano <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 rounded-xl border border-line bg-surface2 p-4 text-sm text-muted">
              Os limites operacionais são uma proposta de escopo-padrão para novos contratos e podem
              ser ajustados expressamente antes da assinatura. Horas de manutenção não são
              cumulativas.
            </p>
          </div>
        </section>

        <section id="sites" className="scroll-mt-24 bg-[#101a2a] py-20">
          <div className="wrap">
            <SectionHeader
              number="02"
              overline="Projetos de criação"
              title="Sites e Landing Pages que Transformam Visitas em Oportunidades"
              description="Desenvolvemos sites e landing pages profissionais, com foco em experiência do usuário, velocidade, SEO e integração com campanhas de Google Ads."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {websites.map((w) => (
                <article
                  key={w.id}
                  className={`panel flex flex-col p-6 ${
                    w.id === 'profissional' ? 'border-mint/50' : ''
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#254339] text-mint">
                      {w.category === 'landing' ? (
                        <MousePointerClick size={22} />
                      ) : (
                        <Globe2 size={22} />
                      )}
                    </div>
                    {w.badge && (
                      <span className="tag border-mint/40 text-mint">{w.badge}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold">{w.name}</h3>
                  <div className="mt-3 text-3xl font-black text-mint">
                    {w.startingAt && (
                      <span className="block text-xs font-semibold text-muted">A partir de</span>
                    )}
                    {brl(w.price)}
                    <span className="ml-2 text-xs font-semibold text-muted">• {w.paymentLabel}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted">{w.description}</p>
                  <div className="mt-5 flex-1 border-t border-line pt-5">
                    <h4 className="mb-4 text-sm font-bold text-mint">{w.includedTitle}</h4>
                    <BulletList items={w.included} />
                    {w.sitelinksNote && (
                      <div className="mt-5 rounded-xl border border-line bg-surface2 p-4">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-mint">
                          {w.sitelinksNote.title}
                        </h5>
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          {w.sitelinksNote.description}
                        </p>
                      </div>
                    )}
                    {w.limits && w.limits.length > 0 && (
                      <div className="mt-5 border-t border-line pt-5">
                        <h4 className="mb-4 text-sm font-bold text-[#f2baba]">
                          {w.limitsTitle ?? 'Limites do escopo'}
                        </h4>
                        <BulletList items={w.limits} positive={false} />
                      </div>
                    )}
                    {w.footnote && (
                      <p className="mt-4 text-xs leading-relaxed text-muted">{w.footnote}</p>
                    )}
                  </div>
                  <a
                    href="#proposta"
                    onClick={() => setSiteId(w.id)}
                    className="btn-alt mt-7 text-sm"
                  >
                    Adicionar à proposta <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Criação com pagamento único e entrega técnica definida. Textos, fotos, logotipo,
              informações legais e materiais do negócio devem ser fornecidos ou aprovados pelo
              cliente. Domínio, hospedagem, produção profissional de fotos e vídeos, integrações
              complexas, CRM sob medida, automações avançadas e manutenção mensal são contratados
              separadamente.
            </p>
          </div>
        </section>

        <section id="escopo" className="scroll-mt-24 py-20">
          <div className="wrap">
            <SectionHeader
              number="03"
              overline="Transparência"
              title="O que está — e não está — contratado"
              description="A definição do escopo protege as duas partes e evita interpretações diferentes sobre manutenção, suporte e investigações adicionais."
            />
            <Compare />
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="panel p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <ShieldCheck className="text-mint" /> Manutenção básica: exemplos
                </h3>
                <BulletList
                  items={[
                    'Substituição de um telefone, link ou botão de WhatsApp',
                    'Correção pontual de página com erro 404, quando sob controle do site contratado e compatível com a franquia mensal',
                    'Troca de imagem ou pequenos ajustes de texto',
                    'Verificação dos principais links de conversão',
                  ]}
                />
              </div>
              <div className="panel p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <FileText className="text-gold" /> Serviços adicionais: exemplos
                </h3>
                <BulletList
                  positive={false}
                  items={[
                    'Varredura ampla em sites, perfis e anúncios de terceiros',
                    'Rastreamento histórico da origem de contatos sem dados de atribuição disponíveis',
                    'Correção de hospedagem, domínio ou sistemas externos fora da manutenção pactuada',
                    'Desenvolvimento de páginas, APIs, integrações e automações',
                  ]}
                />
              </div>
            </div>
            <p className="mt-5 rounded-xl border border-line bg-surface2 p-5 text-sm text-muted">
              <strong className="text-white">Importante:</strong> o prestador verifica e corrige
              problemas nos canais incluídos no contrato. Investigações ampliadas de origem de
              leads, números em fontes externas ou sistemas de terceiros devem ser avaliadas e
              orçadas separadamente.
            </p>
          </div>
        </section>

        <section id="implantacao" className="scroll-mt-24 bg-[#101a2a] py-20">
          <div className="wrap">
            <SectionHeader
              number="04"
              overline="Início do projeto"
              title="Implantação e preparação"
              description="Taxa única para estruturar o serviço antes do acompanhamento mensal."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {plans.map((p) => (
                <div key={p.id} className="panel p-6">
                  <h3 className="font-bold">Plano {p.name}</h3>
                  <div className="my-3 text-3xl font-black text-mint">{brl(p.setup)}</div>
                  <p className="text-sm text-muted">
                    {p.id === 'essencial'
                      ? 'Configuração inicial de até 2 campanhas de Pesquisa, segmentações, anúncios, palavras-chave e validação básica do rastreamento disponível.'
                      : p.id === 'profissional'
                        ? 'Implantação do Essencial mais revisão e organização inicial de 1 Perfil da Empresa no Google.'
                        : 'Implantação do Profissional mais avaliação inicial dos principais pontos de contato e páginas do site existente.'}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">
              Configuração de novas propriedades, migrações, reconstrução de rastreamento complexo e
              recuperação de contas podem exigir orçamento específico.
            </p>
          </div>
        </section>

        <Proposal
          planId={planId}
          onPlanChange={setPlanId}
          siteId={siteId}
          onSiteChange={setSiteId}
        />

        <section id="condicoes" className="scroll-mt-24 py-20">
          <div className="wrap">
            <SectionHeader
              number="06"
              overline="Regras da prestação"
              title="Condições comerciais"
              description="Regras sugeridas para formalização de novos contratos; prazos e obrigações definitivas devem constar da proposta assinada."
            />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="panel p-6">
                <h3 className="mb-5 text-lg font-bold">Projetos de site</h3>
                <BulletList
                  items={[
                    'Pagamento sugerido: 50% no início e 50% na entrega contratual',
                    'Até duas rodadas de ajustes dentro do escopo aprovado',
                    'Revisões extras, novas páginas ou mudança de briefing: orçamento separado',
                    'Prazo contado após envio dos materiais e acessos necessários; definido em proposta',
                    'Domínio, hospedagem e licenças não incluídos, salvo previsão expressa',
                  ]}
                />
              </div>
              <div className="panel p-6">
                <h3 className="mb-5 text-lg font-bold">Gestão recorrente</h3>
                <BulletList
                  items={[
                    'Mensalidade dos serviços independente da verba de mídia',
                    'O cliente paga a publicidade diretamente à plataforma',
                    'Demandas e reuniões fora da rotina combinada podem ser cotadas separadamente',
                    'Atendimento comercial, fechamento de vendas e resposta a leads são responsabilidade do cliente',
                    'Não há garantia de quantidade de leads, posições ou vendas',
                  ]}
                />
              </div>
            </div>
            <div className="mt-10">
              <h3 className="mb-5 text-xl font-extrabold">Perguntas frequentes</h3>
              <div className="space-y-3">
                {[
                  [
                    'O investimento em anúncios está incluído?',
                    'Não. Os valores indicados remuneram a prestação do serviço. A verba de anúncios é definida com o cliente e paga diretamente ao Google.',
                  ],
                  [
                    'O plano Completo inclui qualquer alteração no site?',
                    'Não. Inclui apenas pequenas correções e atualizações no site existente, dentro de até 2 horas mensais. Criação de páginas e novas funcionalidades são projetos adicionais.',
                  ],
                  [
                    'Quem fornece textos e materiais?',
                    'O cliente fornece ou aprova informações do negócio, serviços, regiões atendidas, preços, contatos, materiais visuais e credenciais. A redação comercial incluída em determinados projetos parte desse material.',
                  ],
                  [
                    'E se chegarem contatos de números ou canais externos?',
                    'Primeiro verificamos os canais abrangidos pelo contrato. A investigação de plataformas independentes, publicações de terceiros e históricos de origem de contatos exige avaliação separada, salvo previsão no escopo.',
                  ],
                  [
                    'Há garantia de vendas ou quantidade de leads?',
                    'Não. A gestão busca melhorar a qualidade das campanhas e a medição dos resultados, mas demanda, concorrência, investimento, oferta, atendimento e sazonalidade influenciam o desempenho.',
                  ],
                ].map(([q, a]) => (
                  <details key={q} className="panel group p-5">
                    <summary className="cursor-pointer font-semibold marker:text-mint">{q}</summary>
                    <p className="mt-3 text-sm text-muted">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-[radial-gradient(ellipse_at_center,#183f43_0%,#0b1220_70%)] py-20 text-center">
          <div className="wrap">
            <MapPin className="mx-auto mb-4 text-mint" size={30} />
            <h2 className="mx-auto max-w-2xl text-3xl font-black md:text-4xl">
              Uma solução adequada ao tamanho do seu negócio.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted">
              Selecione os serviços desejados e solicite uma proposta personalizada. Escopo,
              entregas e condições ficam registrados antes do início do trabalho.
            </p>
            <a className="btn-main mt-7" href="#proposta">
              Montar minha proposta <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t border-line py-7">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <span className="font-semibold text-white">Soluções Digitais — apresentação de serviços</span>
          <span>Material comercial orientativo • valores em reais (BRL)</span>
          <span className="inline-flex items-center gap-2">
            <Check size={14} className="text-mint" /> Escopo transparente
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
