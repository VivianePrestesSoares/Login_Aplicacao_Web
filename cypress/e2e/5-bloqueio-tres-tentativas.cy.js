describe("Bloqueio por 3 Tentativas", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Primeira tentativa de login inválido - usuário certo, senha errada", () => {
    const usuario = "user1";
    const senhaInvalida = "senha errada";

    cy.get("#username").type(usuario, { force: true });
    cy.get("#password").type(senhaInvalida, { force: true });
    cy.get("#login-button").click();

    cy.get("#message-area").should("contain", "Usuário ou senha inválidos");
  });

  it("Segunda tentativa de login inválido - usuário errado, senha certa", () => {
    const usuarioInvalido = "usuario errado";
    const senha = "senha123";

    cy.get("#username").type(usuarioInvalido, { force: true });
    cy.get("#password").type(senha, { force: true });
    cy.get("#login-button").click();

    cy.get("#message-area").should("contain", "Usuário ou senha inválidos");
  });

  it("Terceira tentativa de login inválido - bloqueio", () => {
    const usuarioInvalido = "outro usuario";
    const senhaInvalida = "outra senha";

    cy.get("#username").type(usuarioInvalido, { force: true });
    cy.get("#password").type(senhaInvalida, { force: true });
    cy.get("#login-button").click();

    cy.get("#message-area").should(
      "contain",
      "Usuário bloqueado após 3 tentativas inválidas"
    );
  });
});
