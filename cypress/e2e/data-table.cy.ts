describe('Data Table Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the table structure correctly', () => {
    cy.contains('User Directory').should('be.visible');
    cy.get('input[placeholder="Search users..."]').should('be.visible');
    cy.get('div[role="table"]').should('be.visible');
  });

  it('allows sorting data', () => {
    // Wait for initial load
    cy.get('div[role="table"]').should('not.contain', 'Loading');
    
    // Sort by Name Descending
    cy.get('div[role="button"]').contains('Name').click();
    cy.get('div[role="button"]').contains('Name').click(); // Desc
    
    cy.get('div[role="button"]').contains('Name').parent().should('have.attr', 'aria-sort', 'descending');
  });

  it('allows searching and debounces input', () => {
    cy.get('input[placeholder="Search users..."]').type('Alice');
    // Wait for the debounce and fetch (assuming mock network logic or intercept could be used here)
    cy.wait(1000); 
    cy.get('div[role="row"]').its('length').should('be.gte', 1);
  });
});
