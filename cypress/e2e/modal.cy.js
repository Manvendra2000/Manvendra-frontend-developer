describe("Food Modal", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173/");
    });
  
    it("Should open and close the modal", () => {
      cy.get(".food-item").first().click(); // Click on a food item
      cy.get(".modal").should("exist"); // Modal should appear
      cy.get(".modal button").contains("✖").click(); // Click the close button
      cy.get(".modal").should("not.exist"); // Modal should be closed
    });
  });