# Aplicação Web de Login

Esta é uma aplicação web que consome a API de login de estudo desenvolvida e disponibilizada no repositório https://github.com/Karen-fm/API-LOGIN.git. A aplicação oferece uma interface elegante e responsiva para autenticação de usuários.

## Tecnologias Utilizadas

- **HTML** - Estrutura da página
- **CSS** - Estilização personalizada
- **JavaScript** - Lógica da aplicação
- **Express.js** - Servidor web
- **MaterializeCSS** - Framework de UI/UX
- **Cypress** - Testes automatizados

## Como Executar

### Pré-requisitos

1. **API LOGIN** deve estar rodando na porta 3000
2. **Node.js** instalado (versão 14 ou superior)

### Passos para Execução

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Iniciar a API LOGIN**

   ```bash
   cd [nome-do-seu-diretorio-da-API]/API-LOGIN
   node index.js
   ```

3. **Em outro terminal, iniciar a aplicação web**

   ```bash
   cd [nome-do-seu-diretorio-da-aplicacao-web]
   npm start
   ```

4. **Acessar a aplicação:**

   - Abra o navegador e vá para: `http://localhost:3001`

5. **Em outro terminal, executar os testes automatizados**

```bash
   cd [nome-do-seu-diretorio-da-aplicacao-web]
   npx cypress open
```

- Ou para execução em modo headless:

```bash
npx cypress run
```

## Autores

**Diego Santos**

**Karen Machado**

**Viviane Prestes**

## Testes e Cobertura

| Teste                               | Cobertura                                             |
| ----------------------------------- | ----------------------------------------------------- |
| `1-login.sucesso.cy.js`             | Testa login com credenciais válidas                   |
| `2-login.invalido.cy.js`            | Testa cenários de falha no login                      |
| `3-login-campos-obrigatorios.cy.js` | Testa validação de campos obrigatórios                |
| `4-lembrar-senha.cy.js`             | Testa funcionalidade de lembrar senha por email       |
| `5-bloqueio-tres-tentativas.cy.js`  | Testa bloqueio automático após 3 tentativas inválidas |

## Funcionalidades

### Login de Usuário

- Formulário de login com validação
- Integração com a API de autenticação
- Feedback visual de sucesso/erro

### Bloqueio por Tentativas

- Sistema de bloqueio após 3 tentativas falhadas
- O desbloqueio do usuário só ocorre ao reiniciar o servidor da API, pois todos os dados são armazenados em memória.

### Recuperação de Senha

- Modal para solicitar lembrete de senha
- Validação de formato de email
- Integração com endpoint de recuperação

### Interface Moderna

- Design responsivo com MaterializeCSS
- Animações suaves e feedback visual
- Gradiente de fundo atrativo
- Ícones do Material Design

## Estrutura do Projeto

```
Desafio 4/
├── cypress/
│   ├── downloads/
│   ├── e2e/
│   │   ├── 1-login.sucesso.cy.js
│   │   ├── 2-login.invalido.cy.js
│   │   ├── 3-login-campos-obrigatorios.cy.js
│   │   ├── 4-lembrar-senha.cy.js
│   │   └── 5-bloqueio-tres-tentativas.cy.js
│   ├── fixtures/
│   │   └── example.json
│   ├── screenshots/
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── node_modules/
├── public/
│   ├── script.js
│   └── style.css
├── views/
├── .gitignore
├── cypress.config.js
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## Dados de Teste

Para testar a aplicação, use os seguintes dados:

- **Usuário:** `user1`
- **Senha:** `senha123`
- **Email:** `user1@email.com`

## Funcionalidades de Desenvolvimento

### Teste de Conexão

A aplicação verifica automaticamente se a API está acessível e mostra avisos se necessário.

### Reset de Tentativas

Para testes, você deverá reiniciar a API do Desafio 3:

1. **No terminal onde a API está rodando:** Pressione `Ctrl + C` para parar o servidor
2. **Reinicie a API:** Execute `node index.js` no diretório da API
3. **Isso resetará o contador de tentativas** pois os dados são armazenados em memória

```bash
# No terminal da API Login
Ctrl + C  # Para parar o servidor
node index.js  # Para reiniciar
```

### Logs de Debug

Verifique o console do navegador para logs detalhados sobre:

- Status da conexão com a API
- Requisições e respostas
- Erros de conexão

## Status Atual

### **Primeira Parte - Aplicação Web**

- Interface web moderna com MaterializeCSS
- Integração completa com a API LOGIN
- Funcionalidades de login e recuperação de senha
- Design responsivo e UX otimizada

### **Segunda Parte - Testes Cypress**

- Testes E2E da interface web (5 cenários implementados)

### **Cenários de Teste Implementados:**

1. Login com credenciais válidas
2. Login com credenciais inválidas
3. Bloqueio após 3 tentativas inválidas
4. Validação de campos obrigatórios
5. Recuperação de senha com email válido/inválido

## Suporte

Se encontrar problemas:

1. Verifique se a API do Desafio 3 está rodando na porta 3000
2. Confirme se todas as dependências foram instaladas
3. Verifique o console do navegador para erros
4. Teste a conectividade com a API em `http://localhost:3000/api-docs`

---

**Essa aplicação web foi desenvolvida para estudo da Mentoria 2.0 de Teste de Software.**
