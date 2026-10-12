# Site de Advocacia – Batista e Bonifácio

Site institucional com painel administrativo para um escritório de advocacia especializado em **Direito Imobiliário e Proteção Patrimonial** em Uberaba/MG.

## Funcionalidades

**Site público**
- Página inicial com apresentação do escritório, áreas de atuação e chamadas para contato via WhatsApp.
- Páginas por área de atuação (Direito Imobiliário, Imóvel Rural, Proteção Patrimonial) com subpáginas por serviço.
- Blog com posts em Markdown.
- Avaliações do Google exibidas no site (Google Business Profile API ou Places API).
- Páginas de contato, urgências, escritório e política de privacidade.
- SEO: metadados por página, Open Graph, dados estruturados (JSON-LD), `sitemap.xml` e `robots.txt`.
- Efeitos visuais 3D/tilt e layout responsivo.

**Painel `/admin`**
- Login protegido com senha em hash (scrypt) e sessão assinada em cookie.
- Criação, edição e publicação de posts do blog.
- Troca das imagens do site com upload e otimização automática (sharp).
- Edição das informações do escritório (contatos, endereço, horários, redes sociais, textos de destaque).

O conteúdo editado pelo painel é gravado em arquivos na pasta definida por `CONTENT_DIR`, sem necessidade de banco de dados.

## Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- sharp (processamento de imagens)

## Como rodar

```bash
npm install
cp .env.example .env
npm run admin:senha -- "sua senha forte"   # gera ADMIN_PASSWORD_HASH e ADMIN_SESSION_SECRET
npm run dev
```

Abra http://localhost:3000 (site) e http://localhost:3000/admin (painel).

Para produção:

```bash
npm run build
npm start
```

## Variáveis de ambiente

Veja `.env.example`. As principais:

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Endereço público, usado em links e SEO |
| `ADMIN_EMAIL` | E-mail de login do painel |
| `ADMIN_PASSWORD_HASH` / `ADMIN_SESSION_SECRET` | Gerados por `npm run admin:senha` |
| `CONTENT_DIR` | Pasta onde o painel grava blog, imagens e configurações |
| `GOOGLE_*` | Integração opcional com as avaliações do Google |

## Estrutura

```
src/
├── app/(site)/     # páginas públicas
├── app/admin/      # painel administrativo
├── components/     # componentes de interface
├── lib/content/    # leitura/gravação de posts, imagens e configurações
└── lib/auth/       # sessão e autenticação do painel
```
