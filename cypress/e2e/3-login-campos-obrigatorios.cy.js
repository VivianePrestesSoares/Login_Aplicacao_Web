describe("Login - Campos Obrigatórios", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("deve exibir alerta de preenchimento obrigatório quando nenhum campo é preenchido", () => {
      cy.get("#loginForm").submit();
  
      cy.get("#message-area").should(
        "contain",
        "Por favor, preencha todos os campos."
      );
    });
  
    it("deve exibir alerta de preenchimento obrigatório quando apenas um dos campos é preenchido", () => {
      const usuario = "user1";
  
      cy.get("#username").type(usuario, { force: true });
      cy.get("#loginForm").submit();
  
      cy.get("#message-area").should(
        "contain",
        "Por favor, preencha todos os campos."
      );
    });
  
    it("deve exibir alerta de preenchimento obrigatório quando campos têm apenas espaços em branco", () => {
      cy.get("#username").type("   ", { force: true });
      cy.get("#password").type("   ", { force: true });
      cy.get("#loginForm").submit();
  
      cy.get("#message-area").should(
        "contain",
        "Por favor, preencha todos os campos."
      );
    });
  
    it("deve validar que campos obrigatórios não podem estar vazios", () => {
      cy.get("#loginForm").submit();
  
      cy.intercept("POST", "http://localhost:3000/login").as("loginRequest");
  
      cy.wait(1000);
      cy.get("@loginRequest").should("not.exist");
  
      cy.get("#message-area").should(
        "contain",
        "Por favor, preencha todos os campos."
      );
    });
  });