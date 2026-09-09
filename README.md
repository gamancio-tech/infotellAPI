# 📦 Infotell API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/tsx-FF5722?style=for-the-badge&logo=node.js&logoColor=white" alt="tsx" />
</p>

API RESTful desenvolvida em **Node.js** com **TypeScript** e **Express** para gerenciamento do catálogo de produtos de segurança eletrônica e automação do sistema **Infotell**.

---

## 📌 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Documentação dos Endpoints](#-documentação-dos-endpoints)
- [Estrutura do Modelo de Dados](#-estrutura-do-modelo-de-dados)
- [Autor e Licença](#-autor-e-licença)

---

## 📖 Sobre o Projeto

A **Infotell API** fornece operações completas de CRUD (Create, Read, Update, Delete) para cadastro e controle de produtos (câmeras, DVRs, centrais de alarme, sensores, fechaduras digitais, etc.). 

A persistência de dados é baseada em arquivo JSON assíncrono via `fs/promises`, mantendo o fluxo desacoplado através de uma arquitetura em camadas (**Controller - Service - Repository**).

---

## ✨ Funcionalidades

- 📋 **Listagem geral:** Consulta todos os produtos cadastrados com tratamento para retorno vazio (HTTP 204).
- 🔍 **Busca por ID:** Recuperação pontual de produtos por identificador numérico.
- ➕ **Cadastro de produto:** Validação de duplicidade de ID e sugestão automática do próximo ID disponível.
- ✏️ **Atualização parcial/total:** Modificação de produtos com validação de idempotência (rejeita requisições com dados inalterados).
- 🗑️ **Remoção de produto:** Exclusão com verificação prévia de existência do recurso.
- 🌐 **Padronização HTTP:** Respostas centralizadas através de helper com códigos de status semânticos.

---

## 🏗️ Arquitetura

O projeto adota uma arquitetura em camadas bem definida, promovendo separação de responsabilidades e facilidade de manutenção:

```
src/
├── controllers/          # Recebe as requisições HTTP e entrega as respostas
│   └── products-controller.ts
├── services/             # Regras de negócio, validações e tratamento de erros
│   └── products-service.ts
├── repositories/         # Camada de persistência e acesso aos dados (JSON / fs)
│   └── procutsData.ts
├── models/               # Tipagens e interfaces TypeScript
│   └── product-model.ts
├── utils/                # Helpers utilitários (respostas HTTP padronizadas)
│   └── http-helper.ts
├── data/                 # Arquivo de persistência local
│   └── productsData.json
├── routes.ts             # Definição e roteamento dos endpoints da API
├── app.ts                # Inicialização do Express, middlewares e CORS
└── server.ts             # Ponto de entrada (boot do servidor HTTP na porta)
```

---

## 🚀 Tecnologias

- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Framework Web:** [Express 5](https://expressjs.com/)
- **Segurança e CORS:** [cors](https://www.npmjs.com/package/cors)
- **Execução em Desenvolvimento:** [tsx](https://github.com/privatenumber/tsx) (com watch mode e injeção de `.env`)
- **Bundler de Produção:** [tsup](https://tsup.egoist.dev/)

---

## 🛠️ Pré-requisitos e Instalação

### Pré-requisitos
- **Node.js** (versão 18 ou superior recomendada)
- Gerenciador de pacotes **npm** (ou yarn / pnpm)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/gamancio-tech/infotellAPI.git
cd infotellAPI
```

2. Instale as dependências:
```bash
npm install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (caso não exista) com a seguinte definição:

```env
PORT=3333
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run start:watch` | Executa a API em modo de desenvolvimento com live reload automático ao alterar arquivos |
| `npm run start:dev` | Inicia o servidor em modo desenvolvimento sem watch |
| `npm run dist` | Gera a build compilada para produção na pasta `dist/` através do `tsup` |
| `npm run start:dist` | Compila o projeto e inicia a versão de produção |

---

## 📡 Documentação dos Endpoints

Base URL: `http://localhost:3333/api`

### 1. Listar todos os produtos
- **Método:** `GET`
- **Rota:** `/products`
- **Respostas:**
  - `200 OK`: Retorna o array de produtos.
  - `204 No Content`: Quando não houver produtos cadastrados.

**Exemplo de Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Câmera de Segurança Wi-Fi Full HD iM3",
    "price": 239.9,
    "marca": "Intelbras",
    "tecnicalDescriptions": {
      "resolucao": "Full HD 1080p",
      "alcanceVisaoNoturna": "10 metros",
      "campoDeVisao": "114°",
      "conectividade": "Wi-Fi 2.4GHz",
      "suporteMicroSD": "Até 256GB"
    }
  }
]
```

---

### 2. Buscar produto por ID
- **Método:** `GET`
- **Rota:** `/products/:id`
- **Parâmetros de URL:** `id` (número inteiro)
- **Respostas:**
  - `200 OK`: Retorna o objeto do produto.
  - `400 Bad Request`: ID não informado ou inválido (`{ "error": "ID inválido" }`).
  - `404 Not Found`: Produto não encontrado (`{ "error": "Produto não encontrado" }`).

---

### 3. Cadastrar novo produto
- **Método:** `POST`
- **Rota:** `/products`
- **Corpo da Requisição (Body):**
```json
{
  "id": 12,
  "name": "Sensor de Barreira Infravermelho Ativo",
  "price": 189.90,
  "marca": "Intelbras",
  "tecnicalDescriptions": {
    "alcance": "30 metros",
    "feixes": 2
  }
}
```
- **Respostas:**
  - `201 Created`: `{ "message": "created" }`
  - `400 Bad Request`: ID já existente ou erro de validação (`{ "error": "Esse id já existe, id disponível: X" }`).

---

### 4. Atualizar produto
- **Método:** `PATCH`
- **Rota:** `/products/:id`
- **Corpo da Requisição (Body):**
```json
{
  "id": 1,
  "name": "Câmera de Segurança Wi-Fi Full HD iM3 Atualizada",
  "price": 249.90,
  "marca": "Intelbras",
  "tecnicalDescriptions": {
    "resolucao": "Full HD 1080p",
    "conectividade": "Wi-Fi 2.4GHz"
  }
}
```
- **Respostas:**
  - `200 OK`: `"Produto atualizado com sucesso"`
  - `400 Bad Request`: ID divergente, dados iguais aos atuais ou ID não informado.
  - `404 Not Found`: Produto não encontrado.
  - `500 Internal Server Error`: Falha interna durante a persistência.

---

### 5. Deletar produto
- **Método:** `DELETE`
- **Rota:** `/products/:id`
- **Parâmetros de URL:** `id` (número inteiro)
- **Respostas:**
  - `200 OK`: `"Produto deletado com sucesso"`
  - `400 Bad Request`: ID não informado ou erro na exclusão.
  - `404 Not Found`: Produto não encontrado.

---

## 📋 Estrutura do Modelo de Dados

Definição da interface [`ProductModel`](src/models/product-model.ts):

```typescript
export interface ProductModel {
  id: number;
  name: string;
  price: number;
  marca: string;
  tecnicalDescriptions?: any;
}
```

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | `number` | Sim | Identificador único do produto |
| `name` | `string` | Sim | Nome / título descritivo do produto |
| `price` | `number` | Sim | Preço unitário em reais |
| `marca` | `string` | Sim | Fabricante / marca do equipamento |
| `tecnicalDescriptions` | `object` / `any` | Não | Ficha técnica e especificações adicionais |

---

## 👨‍💻 Autor

- **Gustavo Amancio**
- Repositório: [gamancio-tech/infotellAPI](https://github.com/gamancio-tech/infotellAPI)

---

## 📄 Licença

Este projeto está sob a licença **ISC**. Consulte o arquivo `package.json` para mais informações.
