# ReUse Hub

O ReUse Hub é uma aplicação web para doação de objetos que não são mais utilizados. A proposta é aproximar quem possui um item parado de quem pode reaproveitá-lo, reduzindo o descarte e incentivando o consumo consciente.

## Equipe

**EcoForge**

- João Vitor Tragancin

## Funcionalidades do MVP

- Visualização dos itens cadastrados;
- busca por nome, descrição ou cidade;
- filtro por categoria e situação;
- cadastro de novos itens;
- edição de anúncios;
- alteração da situação entre disponível e doado;
- exclusão de anúncios;
- validação dos dados no frontend e no backend;
- layout responsivo para computador e celular.

## Tecnologias utilizadas

### Frontend

- React;
- TypeScript;
- Vite;
- CSS;
- Lucide Icons.

### Backend

- Node.js;
- Express;
- TypeScript;
- Prisma ORM;
- SQLite;
- Zod.

## Organização do projeto

```text
reuse-hub/
├── apps/
│   ├── api/          # Backend, rotas e banco de dados
│   └── web/          # Interface da aplicação
├── README.md
├── ROTEIRO-VIDEO.md
└── pnpm-workspace.yaml
```

## Como executar localmente

### Pré-requisitos

- Node.js 22 ou superior;
- pnpm instalado.

### 1. Instalar as dependências

Na pasta principal do projeto, execute:

```bash
pnpm install
```

### 2. Configurar as variáveis de ambiente

Copie os arquivos de exemplo:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

No Windows, os arquivos também podem ser copiados pelo Explorador de Arquivos.

### 3. Preparar o banco de dados

```bash
pnpm db:push
pnpm db:seed
```

### 4. Iniciar a aplicação

```bash
pnpm dev
```

Depois, acesse `http://localhost:5173`. A API ficará disponível em `http://localhost:3333`.

## Rotas da API

| Método | Rota | Função |
| --- | --- | --- |
| GET | `/health` | Verifica se a API está funcionando |
| GET | `/items` | Lista e filtra os itens |
| GET | `/items/:id` | Consulta um item |
| POST | `/items` | Cadastra um item |
| PUT | `/items/:id` | Atualiza um item |
| PATCH | `/items/:id/status` | Altera a situação do item |
| DELETE | `/items/:id` | Exclui um item |

## Deploy

- **Frontend:** [adicionar link da Vercel]
- **Backend:** [adicionar link do Render]
- **Repositório:** https://github.com/joao-tragancin/reuse-hub

As instruções completas estão no arquivo [`DEPLOY.md`](./DEPLOY.md).

## Vídeo de apresentação

[Adicionar link do vídeo no YouTube]

O roteiro sugerido está no arquivo [`ROTEIRO-VIDEO.md`](./ROTEIRO-VIDEO.md).
