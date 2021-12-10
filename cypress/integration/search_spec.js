const { iteratee } = require('lodash');
describe('Very Thorough Search Validation', function () {
  const email = 'kevinan@gmail.com';
  //const email = chance.email();
  const pass = '123456';
  const search_terms = ['beef']; //, 'pepper', 'sugar', 'pasta', 'salmon', 'spinach', 'juice', 'taco', 'egg', 'rice']
  beforeEach(() => {
    cy.visit('https://app.eggcellent.cooking');
  });

  it('Search ucsd by name', () => {
    cy.get('#search-by-name').type('ucsd');
    cy.get('.btn > .material-icons').click();
    cy.wait(500);

    cy.contains('All Recipes').should('be.visible');
    cy.contains('My Recipes').should('be.visible');
    cy.contains('Account').should('be.visible');

    cy.get('[class="result-text"]').should(
      'have.text',
      'Search ucsd: 0 Results'
    );
  });

  it('Search perfect by Ingredients', () => {
    // check whether the all tags selected are in the name/ingredients

    cy.get('.All').click();
    cy.get('input[id=ingreds-input]').type('perfect');
    cy.get('[class="btn btn-sm btn-outline-success"]').click();
    cy.wait(500);

    cy.contains('All Recipes').should('be.visible');
    cy.contains('My Recipes').should('be.visible');
    cy.contains('Account').should('be.visible');

    cy.get('[class="result-text"]').should(
      'have.text',
      'Search By Categories: 0 Results'
    );
    cy.contains('Contact Us').should('be.visible');
  });

  it('Search 0 by Calories', () => {
    // check whether the all tags selected are in the name/ingredients
    // cy.get('').click();
    cy.get('.All').click();
    cy.get('input[id=calories-input]').type('0');
    cy.get('[class="btn btn-sm btn-outline-success"]').click();
    cy.wait(500);
    cy.contains('Account').should('be.visible');
    cy.contains('My Recipes').should('be.visible');

    cy.get('[class="result-text"]').should(
      'have.text',
      'Search By Categories: 0 Results'
    );
    cy.contains('Contact Us').should('be.visible');
  });
});
