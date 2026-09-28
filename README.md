# frederycomiguel.github.io

Portfólio pessoal — hero em 3D (React + Three.js) sobre uma página de
conteúdo estático. Publicado via GitHub Pages, servindo direto da raiz
deste repositório.

## Estrutura

- `index.html`, `assets/` — build de produção (o que o GitHub Pages serve)
- `app/` — código-fonte (React + Vite + Three.js). Ver `app/README.md` para
  como rodar local e gerar um novo build.
- `curriculo.pdf`, `curriculo-en.pdf` — versões públicas do CV, **sem
  telefone**. Se atualizar o CV, regenerar sem telefone antes de substituir
  aqui (e em `app/public/`).

## Publicar mudanças

1. Edite dentro de `app/`
2. `cd app && npm run build`
3. Copie `app/dist/index.html` e `app/dist/assets/*` para a raiz do repo
4. Commit e push para `main` — GitHub Pages publica automaticamente

## Projetos em destaque

- Agent Platform (destaque) — orquestração de agentes de IA (Python/FastAPI)
- EiOrganiza — CRM SaaS multi-tenant (NestJS/TypeORM), produto proprietário
- PicPay Simplificado — API de pagamentos em Java/Spring Boot (EDA + RabbitMQ)
- Laravel AI CRUD Generator — geração de features Laravel via IA (pacote Composer)
- Aiqfome API Challenge — API de clientes e favoritos em Node.js (Express/Sequelize)
