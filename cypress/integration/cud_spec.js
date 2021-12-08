//const { iteratee } = require("lodash");

describe('EggCellent CUD Test', function() {
    const email = 'ruz@gmail.com';
    const pass = 'CrUd123';

    beforeEach(() => {
        cy.visit('https://eggcellent.cooking');
    })

    //Log in feature & directs to the main page
    it('Login', () => {
        //cy.get('input[type=email]').type(email);
        //cy.get('input[type=password]').type(pass);
        //cy.contains('Log In').click();

        cy.contains('All Recipes');
        cy.contains('My Recipes');
        cy.contains('Account');
    })  

    const recipeName = 'Test Hamburgers';
    const name = 'Rudy Zhang';
    const cookTime = '40';
    const servings = '2';
    const ingredients = ['beef', 'patties', 'cheese', 'lettuce', 'tomato'];
    const quantities = ['1', '2', '3', '1', '2'];
    const units = ['g', 'oc', 'ml', 'cup', 'tsp']
    let i = 0;

    it('Create', () => {
        cy.contains('My Recipes').click();
        cy.contains('Create New Recipe').click();
        cy.get('[id=recipe-name-input]').type(recipeName);
        cy.get('[id=recipe-chief-name-input]').type(name);
        cy.get('[id=recipe-time-input]').type(cookTime);
        cy.get('[id=recipe-servings-input]').type(servings);
        cy.get('[class="ingred-name form-control"]').each(($el, index) => {
            cy.get($el).type(ingredients[index])
        })
        cy.get('[class="ingred-quantity form-control"]').each(($el, index) => {
            cy.get($el).type(quantities[index])
        })
        cy.get('[id=unit-list]').each(($el, index) => {
            cy.get($el).select(units[index]);
        })
    })
})