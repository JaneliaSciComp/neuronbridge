describe("logged in neuronbridge user", () => {
  it("can load the home page and see the search input", () => {
    cy.visit("/login");
    cy.findByLabelText("Email")
      .type("test2@jodyclements.com");
    cy.findByLabelText("Password").type("Testing_!123");
    cy.findByLabelText("Login").click();
    cy.findByText("Welcome to NeuronBridge", {
      timeout: 4000
    });
    cy.findByLabelText("Search", { timeout: 4000 });
  });

  it("can see the about page", () => {
    cy.visit("/login");
    cy.findByLabelText("Email")
      .type("test2@jodyclements.com");
    cy.findByLabelText("Password").type("Testing_!123");
    cy.findByLabelText("Login").click();

    cy.visit("/about");
    cy.findByText("About NeuronBridge", { timeout: 4000 });
  });
  it("can see the help page", () => {
    cy.visit("/login");
    cy.findByLabelText("Email")
      .type("test2@jodyclements.com");
    cy.findByLabelText("Password").type("Testing_!123");
    cy.findByLabelText("Login").click();

    cy.visit("/help");
    cy.findByText("Help");
  });
  it("can't see the signup page", () => {
    cy.visit("/login");
    cy.findByLabelText("Email")
      .type("test2@jodyclements.com");
    cy.findByLabelText("Password").type("Testing_!123");
    cy.findByLabelText("Login").click();
    // need to wait for the login code to set the logged in user.
    cy.wait(2000);
    // should get the homepage instead
    cy.visit("/signup");
    cy.findByText("Welcome to NeuronBridge", { timeout: 4000 });
  });

  it("can't see the login page", () => {
    cy.visit("/login");
    cy.findByLabelText("Email")
      .type("test2@jodyclements.com");
    cy.findByLabelText("Password").type("Testing_!123");
    cy.findByLabelText("Login").click();
    // need to wait for the login code to set the logged in user.
    cy.wait(2000);
    cy.visit("/login");
    // should get the homepage instead
    cy.findByText("Welcome to NeuronBridge", { timeout: 4000 });
  });

  it("can see the search pages", () => {
    cy.visit("/login");
    cy.findByLabelText("Email")
      .type("test2@jodyclements.com");
    cy.findByLabelText("Password").type("Testing_!123");
    cy.findByLabelText("Login").click();
    // need to wait for the login code to set the logged in user.
    cy.wait(2000);
    // should see search results.
    cy.visit("/search");
    cy.findByText(/search help/i, { timeout: 4000 });
    cy.visit("/search?q=1077847238")
    cy.findByLabelText(/view lm matches/i, { timeout: 4000 });
    cy.visit("/search/skeletons/1077847238/matches/2757945537360560139");
    cy.findByLabelText("Search", { timeout: 4000 });
    cy.visit("/search/lines/LH173/matches/2711777430657302539");
    cy.findByText(/input image/i, { timeout: 4000 });
  });
});
