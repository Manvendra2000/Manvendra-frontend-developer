describe("Pagination Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("Should navigate to the next page", () => {
      cy.get("button").contains("Next").click(); // Click next page
      cy.get(".food-item").should("have.length.greaterThan", 0); // Ensure new items load
    });
  
    it("Should navigate back to the previous page", () => {
      cy.get("button").contains("Next").click();
      cy.get("button").contains("Previous").click(); // Click previous page
      cy.get(".food-item").should("have.length.greaterThan", 0); // Ensure items update
    });
  });