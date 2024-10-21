# Task Manager

Este é um sistema de gerenciamento de tarefas simples, onde os usuários podem criar, visualizar, editar e excluir suas próprias tarefas. O projeto utiliza **Next.js** no frontend e **Node.js** no backend, além de PostgreSQL como banco de dados.

## Funcionalidades

- **Autenticação JWT**: O sistema utiliza JWT para proteger as rotas e garantir que apenas o usuário autenticado tenha acesso às suas próprias tarefas.
- **CRUD de Tarefas**: Os usuários podem:
  - Criar novas tarefas;
  - Listar todas as suas tarefas;
  - Atualizar títulos e o status (pendente/concluído) de suas tarefas;
  - Excluir tarefas.
- **Validações**: 
  - Validação de dados utilizando **Joi**.
  - Tarefas com títulos duplicados para o mesmo usuário não são permitidas.
  - Apenas o usuário autenticado pode acessar suas próprias tarefas.
- **Design Responsivo**: O frontend foi desenvolvido utilizando **Ant Design** e é responsivo para diferentes tamanhos de tela.
- **Sistema de mensagens**: Mensagens claras de erro e sucesso são exibidas ao usuário.

## Tecnologias Utilizadas

### Frontend:
- **Next.js** como framework 
- **Ant Design** para UI
- **Axios** para requisições HTTP
- **Context API** para gerenciamento de estado

### Backend:
- **Node.js** com **Express**
- **Sequelize** como ORM para PostgreSQL
- **JWT** para autenticação
- **Joi** para validação de dados
- **Docker** para containerização

## Requisitos

Para rodar o projeto, você precisará de:
- **Docker** (recomendado para rodar tanto o frontend quanto o backend e o banco de dados)
- Se preferir rodar localmente sem Docker, **Node.js** e **PostgreSQL** para o banco de dados

## Como Rodar o Projeto

### Com Docker

1. Clone este repositório:
```bash
git clone https://github.com/adrianosingolani/task-manager.git
```

2. Entre na pasta do projeto:
```bash
cd task-manager
```

3. Crie um arquivo `.env` no diretório `backend` com as seguintes variáveis:

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
JWT_SECRET=
```

4. Inicie o Docker (certifique-se de ter o Docker instalado):
```bash
docker compose up --build
```

5. O frontend estará disponível em [http://localhost:3000](http://localhost:3000) e o backend em [http://localhost:3001](http://localhost:3001).

### Sem Docker

1. Clone este repositório:
```bash
git clone https://github.com/adrianosingolani/task-manager.git
```

2. Crie e configure o banco de dados PostgreSQL.

3. Crie um arquivo `.env` no diretório `backend` com as seguintes variáveis:

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
JWT_SECRET=
```

4. Backend:

```bash
cd backend
npm install
npm run dev
```

5. Frontend:
```bash
cd frontend
npm install
npm run dev
```

6. Acesse o frontend em http://localhost:3000.

## Próximos Passos

- Implementar paginação.
- Melhorar a responsividade do design em telas menores.
- Otimizar performance e experiência do usuário no carregamento de tarefas.
- Melhorar a segurança do sistema com refresh tokens para prolongar a sessão dos usuários.
- Criar testes unitários e de integração para garantir deploy seguro da aplicação.
- Configurar Docker para produção.
- Deploy automatizado.
