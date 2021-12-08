import Chance from 'chance';
const chance = new Chance();

//const { iteratee } = require("lodash");

describe('EggCellent E2E Test', function() {
    const email = 'kevinan@gmail.com';
    //const email = chance.email();
    const pass = '123456';

    beforeEach(() => {
        cy.visit('https://eggcellent.cooking');
    })

    //Log in feature & directs to the main page
    it('Login', () => {
        cy.get('input[type=email]').type(email);
        cy.get('input[type=password]').type(pass);
        cy.contains('Log In').click();

        cy.contains('All Recipes');
        cy.contains('My Recipes');
        cy.contains('Account');
    })
})