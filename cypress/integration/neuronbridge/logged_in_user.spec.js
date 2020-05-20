describe("logged in neuronbridge user", () => {
  it("can load the home page and see the search input", () => {
    cy.visit("/")
      .get("h1.ant-typography")
      .should("have.text", "Welcome to NeuronBridge");
    cy.get(".ant-input").should("have.text", "Search");
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
  it("can't see the signup page", () => {
    // should get the homepage instead
    cy.visit("/signup")
      .get("h1.ant-typography")
      .should("have.text", "Welcome to NeuronBridge");
  });
  it("can't see the login page", () => {
    // should get the homepage instead
    cy.visit("/login")
      .get("h1.ant-typography")
      .should("have.text", "Welcome to NeuronBridge");
  });
  it("can see the search pages", () => {
    // should be redirected to the login page.
    cy.visit("/search")
      .get(".ant-input")
      .should("have.text", "Search");
    cy.visit("/search/skeletons/1077847238/matches/2757945537360560139")
      .get('[type="submit"]')
      .should("have.text", "Login");
    cy.visit("/search/lines/LH173/matches/2711777430657302539")
      .get('[type="submit"]')
      .should("have.text", "Login");
  });
});
