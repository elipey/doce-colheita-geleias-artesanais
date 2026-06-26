# Doce Colheita - Geleias Artesanais

Loja virtual responsiva para uma marca ficticia de geleias artesanais. O projeto foi criado para demonstrar habilidades de front-end, integracao com backend Node/Express, carrinho de compras e uma experiencia com IA para sugerir sabores personalizados.

<p align="center">
  <img src="src/assets/images/doce_colheita_logo_1781560137750.jpg" alt="Logo da Doce Colheita" width="420" />
</p>

## Destaques

- Catalogo de geleias e tortas artesanais com cards de produto.
- Carrinho de compras com persistencia local.
- Checkout simulado com geracao de numero de pedido.
- Sommelier de geleias com IA usando Gemini no backend.
- Interface responsiva com React, TypeScript, Vite e Tailwind CSS.
- Design visual voltado para marca artesanal, rural e gourmet.

## Tecnologias

- React
- TypeScript
- Vite
- Express
- Tailwind CSS
- Google GenAI SDK
- Lucide React
- Motion

## Como rodar localmente

1. Instale as dependencias:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` baseado no `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Preencha a variavel `GEMINI_API_KEY` no `.env` caso queira testar o sommelier com IA.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse:

   ```txt
   http://localhost:3000
   ```

## Build de producao

```bash
npm run build
npm start
```

## Observacao

O checkout deste projeto e demonstrativo. Ele simula o recebimento do pedido e nao processa pagamentos reais.
