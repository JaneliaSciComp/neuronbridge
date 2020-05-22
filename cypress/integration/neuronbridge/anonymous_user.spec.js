describe("anonymous neuronbridge user", () => {
  it("can load the home page but not see the search input", () => {
    cy.visit("/");
    cy.findByText("Welcome to NeuronBridge", {timeout: 4000})
      .findByLabelText("Search", {timeout: 4000})
      .should("not.exist");
  });
  it("can see the about page", () => {
    cy.visit("/about")
    cy.findByText("About NeuronBridge", {timeout: 4000})
  });
  it("can see the help page", () => {
    cy.visit("/help")
    cy.findByText("Help");
  });
  it("can see the signup page", () => {
    cy.visit("/signup")
    cy.findByText("Create your account");
  });
  it("can see the login page", () => {
    cy.visit("/login")
    cy.findByLabelText('Login')
  });
  it("can't see the search pages", () => {
    // should be redirected to the login page.
    cy.visit("/search")
    cy.findByLabelText('Login')
    cy.visit("/search/skeletons/1077847238/matches/2757945537360560139")
    cy.findByLabelText('Login')
    cy.visit("/search/lines/LH173/matches/2711777430657302539")
    cy.findByLabelText('Login')
  });
});
