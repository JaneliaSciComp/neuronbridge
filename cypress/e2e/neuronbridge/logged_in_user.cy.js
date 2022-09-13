describe("logged in neuronbridge user", () => {
  beforeEach(() => {
   cy.visit("/login");
    cy.findByLabelText("Email")
      .type(Cypress.env("username"));
    cy.findByLabelText("Password").type(Cypress.env("password"));
    cy.findByLabelText("Login").click();
    cy.wait(2000);
  });

  it("can see pages only logged in users should see", () => {
    cy.findByText("Welcome to NeuronBridge", {
      timeout: 8000
    });
    cy.findByLabelText("Search", { timeout: 8000 });
    cy.findByText("About").click();
    cy.findByText("About NeuronBridge", { timeout: 4000 });
    cy.findByText("Help").click();
    cy.findByText("Obtaining the raw data");
  });

  it("can't see the signup and login page", () => {
    // should get the homepage instead
    cy.visit("/signup");
    cy.findByText("Welcome to NeuronBridge", { timeout: 4000 });
    cy.visit("/login");
    // should get the homepage instead
    cy.findByText("Welcome to NeuronBridge", { timeout: 4000 });
  });

  it("can see the search results pages", () => {
    // should see search results.
    cy.visit("/search");
    cy.findByText(/search help/i, { timeout: 4000 });
    cy.visit("/search?q=1537331894")
    cy.findByText(/female/i, { timeout: 4000 });
    cy.findByLabelText(/color depth search results/i, { timeout: 4000 }).click();
    cy.findByText("CDM Input Image", { timeout: 4000 });
    cy.findByText(/r20d07/i, { timeout: 4000 }).click();
    cy.findByText("Input Image");
    cy.findByText(/Match 2 of 300/i);
    cy.findByText(/Channel/i);
    cy.findByText(/Mounting Protocol/i);
    cy.findByText(/Magnification/i);
    cy.findByText(/40x/i);
    cy.findByText(/cite this match/i, { timeout: 4000 }).click();
    cy.findByText(/Scheffer, et al., 2020/i);
    cy.findByText(/download 3d files/i, { timeout: 4000 }).click();
    cy.findByText(/\d+\.swc/i);
    cy.get('.ant-modal-close-x').click();
    cy.findByText(/back to all results/i, { timeout: 4000 }).click();
    cy.findByLabelText(/patchperpixmatch results/i, { timeout: 4000 }).click();
    cy.findByText(/neuron type \/ instance/i);
  });
});
