import { useEffect, useRef } from 'react';
import Scene from './Scene.jsx';

const STACK = [
  {
    title: 'Núcleo', years: '13+ anos',
    items: ['PHP / Laravel', 'MySQL / PostgreSQL', 'APIs REST', 'APIs SOAP', 'SOLID / Clean Code'],
  },
  {
    title: 'Produção ativa', years: '3–5 anos',
    items: ['Node.js / TypeScript', 'React / Next.js', 'NestJS / TypeORM', 'Docker', 'CI/CD (GitLab)'],
  },
  {
    title: 'IA & Agentes', years: 'diferencial',
    items: ['MCP (em produção)', 'Claude API / Code', 'Gemini', 'Orquestração de agentes', 'Engenharia de prompt'],
  },
  {
    title: 'Em consolidação', years: 'construindo',
    items: ['AWS (S3, Lambda, EC2)', 'Terraform', 'Kubernetes (fundamentos)', 'Java / Spring Boot'],
  },
];

const PROJECTS = [
  {
    featured: true,
    tag: 'Destaque · Python / IA',
    title: 'Agent Platform',
    desc: 'Backend de orquestração de agentes de IA: loop de tool-calling fiel à API da Anthropic (content blocks reais, não texto solto), memória de sessão persistente, servidor MCP exposto via SDK oficial, e observabilidade (logs estruturados + métricas) desde o primeiro commit.',
    facts: ['28 testes automatizados, lint limpo', 'Auth por API key, comparação em tempo constante', 'Arquitetura documentada — decisões e trade-offs no README'],
    tags: ['FastAPI', 'Anthropic SDK', 'MCP', 'pytest'],
    link: 'https://github.com/frederycomiguel/agent-platform',
  },
  {
    tag: 'Node.js · SaaS multi-tenant',
    title: 'EiOrganiza',
    desc: 'CRM SaaS multi-tenant para clínicas de estética, construído com um sócio desde dezembro de 2025. Isolamento completo entre clientes via schema dedicado por tenant no Postgres, com injeção automática de contexto via middleware.',
    facts: ['Kanban operacional, timeline de cliente e agenda em tempo real (WebSocket)', 'Integração com WhatsApp (WAHA) para pré-agendamento e confirmações', 'Testes unitários, de integração e baseados em propriedade (fast-check)'],
    tags: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'Docker'],
    note: 'Produto proprietário — sem repositório público.',
  },
  {
    tag: 'Java · Spring Boot',
    title: 'PicPay Simplificado',
    desc: 'API REST de pagamentos: depósito e transferência entre usuários, com consulta a autorizador externo antes de concluir e notificação disparada de forma assíncrona.',
    facts: ['Transferência como transação ACID, com rollback automático em falha', 'Notificação via RabbitMQ com Dead Letter Queue para reprocessamento', 'Testes de service + pipeline CI no GitHub Actions'],
    tags: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'RabbitMQ', 'Docker'],
    link: 'https://github.com/frederycomiguel/picpay-simplificado',
  },
  {
    tag: 'PHP / Laravel · IA',
    title: 'Laravel AI CRUD Generator',
    desc: 'Ferramenta que interpreta um pedido em linguagem natural e gera uma feature Laravel inteira — model, migration, factory, service, controller, requests, rotas e teste — além de refatorar e remover features. Empacotada como pacote Composer.',
    facts: ['Gera camada Service + Controller com injeção de dependência e teste PHPUnit', 'Comandos para adicionar colunas (nova migration) e reverter a feature inteira', 'Interface web servida de dentro do próprio pacote'],
    tags: ['PHP 8.2', 'Laravel 12', 'Google Gemini', 'Composer package'],
    link: 'https://github.com/frederycomiguel/meu-gerador-de-codigo-laravel',
  },
  {
    tag: 'Node.js',
    title: 'Aiqfome API Challenge',
    desc: 'API de clientes e lista de favoritos consumindo a Fake Store API, com ambiente containerizado e documentação interativa.',
    facts: ['CRUD de clientes + favoritos aninhados por cliente', 'Persistência com Sequelize ORM sobre PostgreSQL', 'Docker Compose de um comando + Swagger e coleção Postman'],
    tags: ['Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/frederycomiguel/Aiqfome-API-Challenge',
  },
];

export default function App() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Scene scrollRef={scrollRef} />

      <header className="topbar">
        <div className="wrap topbar__inner">
          <span className="mark">frederycomiguel<em>.dev</em></span>
          <nav className="topnav">
            <a href="#stack">Stack</a>
            <a href="#projetos">Projetos</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero wrap">
          <p className="hero__kicker">Engenheiro Backend Sênior · Palmas, TO — remoto</p>
          <h1 className="hero__title">
            Conecto sistemas que <span className="no-italic">não deveriam</span> conversar entre si.
          </h1>
          <p className="hero__lede">
            13+ anos construindo backends e integrações (REST/SOAP) para setores regulados como
            saúde e fintech. Hoje aplico essa mesma disciplina de engenharia à construção de
            agentes de IA em produção — não como conceito de slide.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="https://github.com/frederycomiguel" target="_blank" rel="noopener">
              Ver código no GitHub
            </a>
            <a className="btn btn--ghost" href="#contato">Falar comigo</a>
          </div>
          <p className="hero__hint">SCROLL PARA EXPLORAR</p>
        </section>

        <section id="stack" className="panel-section wrap">
          <div className="section-head">
            <h2 className="section-title">Stack</h2>
            <span className="section-index">01 / profundidade real</span>
          </div>
          <p className="section-lede">
            Organizada por profundidade real de experiência — sem inflar o que ainda estou consolidando.
          </p>
          <div className="stack-grid">
            {STACK.map((col) => (
              <div className="stack-col" key={col.title}>
                <h3 className="stack-col__title">
                  {col.title} <span className="stack-col__years">{col.years}</span>
                </h3>
                <ul className="tag-list">
                  {col.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projetos" className="panel-section wrap">
          <div className="section-head">
            <h2 className="section-title">Projetos</h2>
            <span className="section-index">02 / código real</span>
          </div>
          <p className="section-lede">Código real, não slides. O que está aqui roda, tem testes e está publicado — ou em produção.</p>

          {PROJECTS.filter(p => p.featured).map((p) => (
            <article className="project project--featured" key={p.title}>
              <span className="project__tag">{p.tag}</span>
              <h3 className="project__title">{p.title}</h3>
              <p className="project__desc">{p.desc}</p>
              <ul className="project__facts">{p.facts.map(f => <li key={f}>{f}</li>)}</ul>
              <div className="project__tags-row">{p.tags.map(t => <span className="mono-tag" key={t}>{t}</span>)}</div>
              {p.link && <a className="project__link" href={p.link} target="_blank" rel="noopener">Ver repositório →</a>}
            </article>
          ))}

          <div className="project-slots">
            {PROJECTS.filter(p => !p.featured).map((p) => (
              <article className="project project--sec" key={p.title}>
                <span className="project__tag">{p.tag}</span>
                <h3 className="project__title">{p.title}</h3>
                <p className="project__desc">{p.desc}</p>
                <ul className="project__facts">{p.facts.map(f => <li key={f}>{f}</li>)}</ul>
                <div className="project__tags-row">{p.tags.map(t => <span className="mono-tag" key={t}>{t}</span>)}</div>
                {p.link
                  ? <a className="project__link" href={p.link} target="_blank" rel="noopener">Ver repositório →</a>
                  : <p className="project__note">{p.note}</p>}
              </article>
            ))}
          </div>
        </section>

        <section id="sobre" className="panel-section about wrap">
          <div className="about__figure">
            <div className="about__figure-row">
              <span className="num">13+</span>
              anos projetando e evoluindo sistemas backend críticos em produção
            </div>
            <div className="about__figure-row">
              <span className="num">10M+</span>
              registros por ano num sistema de saúde (Fundação Hemominas), com 60% de redução no tempo de query
            </div>
            <div className="about__figure-row">
              <span className="num">40%</span>
              mais rápido — performance de API e tempo de deploy, via Docker, CI/CD e testes automatizados
            </div>
          </div>
          <div>
            <div className="section-head">
              <h2 className="section-title">Sobre</h2>
              <span className="section-index">03 / trajetória</span>
            </div>
            <div className="about__body">
              <p>
                Sou engenheiro backend sênior com mais de 13 anos de experiência, especializado em{' '}
                <strong>integração de sistemas</strong>, modernização de sistemas legados e construção de
                APIs para setores regulados — saúde e fintech, principalmente. Trabalho 100% remoto, de
                Palmas, Tocantins.
              </p>
              <p>
                Na prática, isso foi um módulo em produção no setor de saúde processando mais de 10 milhões
                de registros por ano (Fundação Hemominas/IPSEMG-SIGAS), integrações complexas com{' '}
                <strong>CRM e WhatsApp Business API</strong>, e um e-commerce Magento sustentando picos de
                1.000+ requisições por segundo. Docker e CI/CD reduziram o tempo de deploy do time em 40%.
              </p>
              <p>
                Nos últimos meses passei a aplicar essa mesma disciplina de engenharia — testes,
                observabilidade, arquitetura desacoplada — à construção de{' '}
                <strong>agentes de IA em produção</strong>: um servidor MCP real integrando Azure DevOps e
                GitLab, automações com Claude e Gemini, e — fora do trabalho principal — a construção de um
                CRM SaaS multi-tenant do zero com um sócio. Não é hobby isolado; é a extensão natural do que
                já fazia com integrações, aplicada a domínios novos.
              </p>
            </div>
          </div>
        </section>

        <section id="contato" className="panel-section wrap">
          <div className="section-head">
            <h2 className="section-title">Contato</h2>
            <span className="section-index">04 / vamos conversar</span>
          </div>
          <p className="section-lede">Aberto a conversas sobre projetos, vagas e integrações difíceis.</p>
          <div className="contact__links">
            <a className="btn btn--primary" href="mailto:frederycomiguel@gmail.com">Enviar e-mail</a>
            <a className="btn btn--ghost" href="curriculo.pdf" target="_blank" rel="noopener" download="Frederyco-Miguel-CV-PT.pdf">CV (PT)</a>
            <a className="btn btn--ghost" href="curriculo-en.pdf" target="_blank" rel="noopener" download="Frederyco-Miguel-CV-EN.pdf">CV (EN)</a>
            <a className="btn btn--ghost" href="https://github.com/frederycomiguel" target="_blank" rel="noopener">GitHub</a>
            <a className="btn btn--ghost" href="https://www.linkedin.com/in/frederyco-miguel-m-78789847/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <span>Frederyco Miguel — Palmas, Tocantins, Brasil</span>
        <span>Atualizado em setembro de 2026</span>
      </footer>
    </>
  );
}
