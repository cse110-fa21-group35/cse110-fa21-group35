import Chance from 'chance';
const chance = new Chance();
//const { iteratee } = require("lodash");

describe('EggCellent Authentication System Validation', function () {
  //generating random email and username every test
  const email = chance.email();
  const username = chance.name();
  const pass = `authentication_validation_${username}`;

  //Sign up feature & directs to the main page
  it('Signup and Assert Data Persisted', () => {
    cy.visit('https://app.eggcellent.cooking');
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
    cy.contains('Account').should('be.visible').click();

    //assert account page displays account details
    cy.contains(`User Name: ${username}`).should('be.visible');
    cy.contains(`User Email: ${email}`).should('be.visible');
    cy.contains('Log out').click();
  });

  it('Login and Assert Data Persisted', () => {
    //test account data persisted after logout
    cy.get('[id=email]').type(email);
    cy.get('[id=pass]').type(pass);
    cy.contains('Log In').click();

    cy.wait(500);
    //assert account was retrieved and logout.
    cy.contains('Account').should('be.visible').click();
    cy.contains(`User Name: ${username}`).should('be.visible');
    cy.contains(`User Email: ${email}`).should('be.visible');
    cy.contains('Log out').click();
  });
});
