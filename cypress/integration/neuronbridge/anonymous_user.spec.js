describe("anonymous neuronbridge user", () => {
  it("can load the home page but not see the search input", () => {
    cy.visit("/")
      .get("h1.ant-typography")
      .should("have.text", "Welcome to NeuronBridge");
  });
  it("can see the about page", () => {
    cy.visit("/about")
      .get(".site-layout-background > :nth-child(1) > :nth-child(1)")
      .should("have.text", "About NeuronBridge");
  });
  it("can see the help page", () => {
    cy.visit("/help")
      .get(".site-layout-background > :nth-child(1) > :nth-child(1)")
      .should("have.text", "Help");
  });
  it("can see the signup page", () => {
    cy.visit("/signup")
      .get(".ant-form > .ant-typography")
      .should("have.text", "Create your account");
  });
   it("can see the login page", () => {
    cy.visit("/login")
      .get('[type="submit"]')
      .should("have.text", "Login");
  });

});
