# Apresentação Comercial — React + TypeScript + Tailwind CSS

Conversão da apresentação HTML original em uma aplicação Vite + React com Tailwind CSS. Inclui escopos, planos, preços, comparação, condições e calculadora com cópia de resumo e impressão em PDF.

## Executar

Requisitos: Node.js 20.19+ ou 22+ e npm.

```bash
npm install
npm run dev
```

Abra a URL exibida pelo Vite (normalmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

Publique o conteúdo de `dist/` na hospedagem de site estático (Vercel, Netlify, Cloudflare Pages ou outro servidor). Configuração padrão de build: `npm run build`, diretório: `dist`.

## Personalização

- **Planos, serviços e valores:** `src/App.tsx` (constantes `plans` e `websites`).
- **Identidade visual:** `tailwind.config.js` e `src/index.css`.
- **Marca e contatos:** componente `Header`/seção final em `src/App.tsx`.
- **Política comercial:** adequar horários, quantidade de campanhas, manutenção, condições e prazos ao contrato real antes de publicar.

Importante: não há backend, envio automático de proposta ou pagamento. O botão de cópia utiliza a área de transferência do navegador, e o botão de PDF utiliza a impressão do navegador.
# apresenta-o-comercial-gestor-trafego
