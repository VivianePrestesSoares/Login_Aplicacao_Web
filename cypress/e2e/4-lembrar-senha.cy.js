describe("Lembrar Senha", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("Enviar solicitação de lembrar senha com email válido", () => {
      const email = "user1@email.com";
  
      cy.get("a[href='#forgotPasswordModal']").click();
      cy.wait(500); // Aguardar MaterializeCSS renderizar
      cy.get("#email").type(email, { force: true });
      cy.get("#sendPasswordReminder").click();
  
      cy.get(".modal-message").should("contain", "Email enviado com sucesso");
    });
  
    it("Validar email não encontrado", () => {
      const emailInvalido = "emailinvalido@email.com";
  
      cy.get("a[href='#forgotPasswordModal']").click();
      cy.wait(500); // Aguardar MaterializeCSS renderizar
      cy.get("#email").type(emailInvalido, { force: true });
      cy.get("#sendPasswordReminder").click();
  
      cy.get(".modal-message").should("contain", "Email não encontrado");
    });
  
    it("Validar formato de email inválido", () => {
      const emailInvalido = "email-invalido";
  
      cy.get("a[href='#forgotPasswordModal']").click();
      cy.wait(500); // Aguardar MaterializeCSS renderizar
      cy.get("#email").type(emailInvalido, { force: true });
      cy.get("#sendPasswordReminder").click();
  
      cy.get(".modal-message").should("contain", "Formato de email inválido");
    });
  
    it("Validar campo email em branco", () => {
      cy.get("a[href='#forgotPasswordModal']").click();
      cy.get("#email").should("have.value", "");
      cy.get("#sendPasswordReminder").click();
  
      cy.get(".modal-message").should(
        "contain",
        "Por favor, preencha o campo email"
      );
    });
  });
  