import Chance from 'chance';
const chance = new Chance();
//const { iteratee } = require("lodash");

describe('EggCellent CUD Test', function () {
  //generating random email and username every test
  const email = chance.email();
  const username = chance.name();
  const pass = 'CrUd123';

  //Sign up feature & directs to the main page
  it('Signup', () => {
    cy.visit('https://eggcellent.cooking');
    cy.contains('Sign Up').click();
    cy.get('[id=email]').type(email);
    cy.get('[id=name]').type(username);
    cy.get('[id=pass]').type(pass);
    cy.get('[id=passConf]').type(pass);
    cy.contains('Sign Up').click();
    //cy.get('input[type=email]').type(email);
    //cy.get('input[type=password]').type(pass);
    //cy.contains('Log In').click();

    cy.wait(500);
    //making sure it directs to the main page after the login/signup
    cy.contains('All Recipes').should('be.visible');
    cy.contains('My Recipes').should('be.visible');
    cy.contains('Account').should('be.visible');
  });

  const recipeName = 'Test Hamburgers';
  const updateRecipe = 'Update Hamburgers';
  const name = 'Rudy Zhang';
  const newName = 'Kevin An';
  const cookTime = '40';
  const newTime = '50';
  const servings = '2';
  const newServings = '3';
  const ingredients = ['beef', 'patties', 'cheese', 'lettuce', 'tomato'];
  const quantities = ['1', '2', '3', '1', '2'];
  const units = ['g', 'oc', 'ml', 'cup', 'tsp'];
  const step = 'This is test step';
  const newStep = 'This is updated!';

  it('Create', () => {
    //Testing create custom recipe card
    cy.contains('My Recipes').click();
    cy.wait(500);
    cy.get('[class="total-recipe-count"]').should(
      'have.text',
      'Total 0 Recipes'
    );
    cy.contains('Create New Recipe').click();
    cy.get('[id=recipe-name-input]').type(recipeName);
    cy.get('[id=recipe-chief-name-input]').type(name);
    cy.get('[id=recipe-time-input]').type(cookTime);
    cy.get('[id=recipe-servings-input]').type(servings);
    cy.get('[class="ingred-name form-control"]').each(($el, index) => {
      cy.get($el).type(ingredients[index]);
    });
    cy.get('[class="ingred-quantity form-control"]').each(($el, index) => {
      cy.get($el).type(quantities[index]);
    });
    cy.get('[id=unit-list]').each(($el, index) => {
      cy.get($el).select(units[index]);
    });
    cy.get('[id=step-input]').type(step);
    cy.get('[class="btn btn-primary btn-sm me-md-3 recipe-save-btn"]').click();
    cy.wait(500);
    //checking if recipe card is created with correct input
    cy.get('[class="total-recipe-count"]').should(
      'have.text',
      'Total 1 Recipes'
    );
    cy.get('[class="form-control"]').clear().type(recipeName).type('{enter}');
    cy.get('recipe-main').click();
    cy.get('[class="step-box"]').should('have.text', step);
    cy.get('[id=recipe-card-close-btn]').click();
    cy.wait(500);
  });

  it('Update', () => {
    //updating the created recipe card
    cy.get('[class="form-control"]').clear().type(recipeName).type('{enter}');
    cy.get('recipe-main').click();
    cy.get('[id=recipe-card-edit-btn]').click();
    cy.get('[id=recipe-name-input]').clear().type(updateRecipe);
    cy.get('[id=recipe-chief-name-input]').clear().type(newName);
    cy.get('[id=recipe-time-input]').clear().type(newTime);
    cy.get('[id=recipe-servings-input]').clear().type(newServings);
    cy.get('[id=unit-list]').each(($el) => {
      cy.get($el).select('---');
    });
    cy.get('[id=step-input]').clear().type(newStep);
    cy.get('[class="btn btn-primary btn-sm me-md-3 recipe-save-btn"]').click();
    cy.wait(500);
    //Checking if the values are updated
    cy.get('[class="form-control"]').clear().type(updateRecipe).type('{enter}');
    cy.get('recipe-main').click();
    cy.get('[class="step-box"]').should('have.text', newStep);
    cy.get('[id=recipe-card-close-btn]').click();
    cy.wait(500);
  });

  it('Delete', () => {
    //Testing deleting the created recipe card
    cy.get('[class="form-control"]').clear().type(updateRecipe).type('{enter}');
    cy.get('recipe-main').click();
    cy.get('[id=recipe-card-delete-btn]').click();
    cy.wait(500);
    //check if recipe card is gone
    cy.get('[class="total-recipe-count"]').should(
      'have.text',
      'Total 0 Recipes'
    );
  });
});
