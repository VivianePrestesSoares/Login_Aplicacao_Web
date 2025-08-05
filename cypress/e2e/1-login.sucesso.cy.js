describe("Login - Sucesso", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("Login com sucesso usando credenciais válidas", () => {
      const usuario = "user1";
      const senha = "senha123";

      cy.get("#username").type(usuario, { force: true });
      cy.get("#password").type(senha, { force: true });
      cy.get("#login-button").click();

      cy.get("#message-area").should("contain", "Login realizado com sucesso");
     });
  });
  
