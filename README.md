# Desafio 4 - Aplicação Web de Login

## Descrição

Esta é uma aplicação web moderna que consome a API de login desenvolvida no Desafio 3. A aplicação oferece uma interface elegante e responsiva para autenticação de usuários, utilizando as tecnologias solicitadas.

## Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilização personalizada
- **JavaScript (ES6+)** - Lógica da aplicação
- **Express.js** - Servidor web
- **MaterializeCSS** - Framework de UI/UX
- **Cypress** - Testes automatizados (preparado para a segunda parte)

## Como Executar

### Pré-requisitos

1. **API do Desafio 3** deve estar rodando na porta 3000
2. **Node.js** instalado (versão 14 ou superior)

### Passos para Execução

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Iniciar a API do Desafio 3:**

   ```bash
   cd ../Desafio 3/API-LOGIN
   npm install
   node index.js
   ```

3. **Em outro terminal, iniciar a aplicação web:**

   ```bash
   cd Desafio 4
   npm start
   ```

4. **Acessar a aplicação:**
   - Abra o navegador e vá para: `http://localhost:3001`

## Funcionalidades

### Login de Usuário

- Formulário de login com validação
- Integração com a API de autenticação
- Feedback visual de sucesso/erro
- Estado de loading durante requisições

### Bloqueio por Tentativas

- Sistema de bloqueio após 3 tentativas falhadas
- Mensagens informativas sobre tentativas restantes
- Reset automático após login bem-sucedido

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
├── public/
│   ├── style.css          # Estilos personalizados
│   └── script.js          # Lógica da aplicação
├── views/
│   └── index.html         # Página principal
├── server.js              # Servidor Express.js
├── package.json           # Dependências e scripts
└── README.md             # Documentação
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

Para testes, você pode usar no console do navegador:

```javascript
resetAttempts();
```

### Logs de Debug

Verifique o console do navegador para logs detalhados sobre:

- Status da conexão com a API
- Requisições e respostas
- Erros de conexão

## Status Atual

### **Primeira Parte - Aplicação Web (CONCLUÍDA)**

- Interface web moderna com MaterializeCSS
- Integração completa com a API do Desafio 3
- Funcionalidades de login e recuperação de senha
- Design responsivo e UX otimizada

### **Segunda Parte - Testes Cypress (EM ANDAMENTO)**

- Teste de bloqueio após 3 tentativas (API)
- Testes E2E da interface web (6 cenários)
- Preparação para os 4 cenários específicos do Desafio 3

### **Cenários de Teste Implementados:**

1. Login com credenciais válidas
2. Login com credenciais inválidas
3. Bloqueio após 3 tentativas inválidas
4. Validação de campos obrigatórios
5. Modal de recuperação de senha
6. Recuperação de senha com email válido/inválido

## Suporte

Se encontrar problemas:

1. Verifique se a API do Desafio 3 está rodando na porta 3000
2. Confirme se todas as dependências foram instaladas
3. Verifique o console do navegador para erros
4. Teste a conectividade com a API em `http://localhost:3000/api-docs`

---

**Desenvolvido para o Desafio 4**
