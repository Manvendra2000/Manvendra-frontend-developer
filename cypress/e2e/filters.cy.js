describe("Filter Functionality", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("Should open the filter dropdown", () => {
      cy.get("button").contains("Filter").click(); // Click filter button
      cy.get("input[type='radio']").should("exist"); // Ensure radio options exist
    });
  
    it("Should filter food by area", () => {
      cy.get("button").contains("Filter").click();
      cy.get("input[type='radio']").first().check(); // Select the first area option
      cy.get("button").contains("Apply").click();
      cy.get(".food-item").should("have.length.greaterThan", 0); // Ensure results update
    });
  });