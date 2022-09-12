describe("logged in neuronbridge user", () => {
  beforeEach(() => {
   cy.visit("/login");
    cy.findByLabelText("Email")
      .type(Cypress.env("username"));
    cy.findByLabelText("Password").type(Cypress.env("password"));
    cy.findByLabelText("Login").click();
    cy.wait(2000);
  });

  it("can load the home page and see the search input", () => {
    cy.findByText("Welcome to NeuronBridge", {
      timeout: 8000
    });
    cy.findByLabelText("Search", { timeout: 8000 });
  });

  it("can see the about page", () => {
    cy.visit("/about");
    cy.findByText("About NeuronBridge", { timeout: 4000 });
  });
  it("can see the help page", () => {
    cy.visit("/help");
    cy.findByText("Obtaining the raw data");
  });
  it("can't see the signup page", () => {
    // should get the homepage instead
    cy.visit("/signup");
    cy.findByText("Welcome to NeuronBridge", { timeout: 4000 });
  });

  it("can't see the login page", () => {
    cy.visit("/login");
    // should get the homepage instead
    cy.findByText("Welcome to NeuronBridge", { timeout: 4000 });
  });

  it("can see the search pages", () => {
    // should see search results.
    cy.visit("/search");
    cy.findByText(/search help/i, { timeout: 4000 });
    cy.visit("/search?q=1537331894")
    cy.findByLabelText(/color depth search results/i, { timeout: 4000 });
    cy.visit("/search/skeletons/1537331894/matches/2945073141049430027");
    cy.findByLabelText("Search", { timeout: 4000 });
    cy.visit("/search/lines/LH173/matches/2711777430657302539");
    cy.findByText(/input image/i, { timeout: 4000 });
  });
});
