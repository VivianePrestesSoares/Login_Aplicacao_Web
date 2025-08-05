describe("Login - Inválido", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("deve exibir erro ao usar credenciais inválidas", () => {
      const usuario = "errado invalido inexistente";
      const senha = "errado invalido inexistente";

      cy.get("#username").type(usuario, { force: true });
      cy.get("#password").type(senha, { force: true });
      cy.get("#login-button").click();

      cy.get("#message-area").should("be.visible");
      cy.get("#message-area").should("contain", "Usuário ou senha inválidos");
      });
    });
