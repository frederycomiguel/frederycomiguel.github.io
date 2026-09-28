# Source do portfólio (React + Three.js)

Código-fonte do site. O que fica publicado em produção (GitHub Pages) é o
resultado do build, copiado para a raiz do repositório — não este código
direto.

## Rodar localmente

```bash
cd app
npm install
npm run dev
```

## Build e publicação

```bash
cd app
npm install
npm run build
```

Isso gera `app/dist/index.html` e `app/dist/assets/*`. Copie o conteúdo de
`app/dist/` para a raiz do repositório (substituindo `index.html` e a pasta
`assets/`), depois commit e push. `curriculo.pdf` e `curriculo-en.pdf` na
raiz também vêm de `app/public/` — se atualizar o CV, atualize os dois
lugares.

## Stack

- Vite + React
- `@react-three/fiber` + `three` — cena 3D no hero (rede de nós representando
  a stack, câmera controlada pelo scroll)
- CSS puro (`src/index.css`), sem framework de estilo
