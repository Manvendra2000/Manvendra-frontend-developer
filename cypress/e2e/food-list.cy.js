describe("Food Listing Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/"); // Change to your local or deployed URL
  });

  it("Should load the food items", () => {
    cy.get("h1").should("contain", "Food Items"); // Check if the title is correct
    cy.get(".food-item").should("have.length.greaterThan", 0); // Ensure food items are displayed
  });
});