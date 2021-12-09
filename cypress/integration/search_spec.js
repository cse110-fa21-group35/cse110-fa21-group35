const { iteratee } = require("lodash");
describe('EggCellent E2E Test', function() {
    const email = 'kevinan@gmail.com';
    //const email = chance.email();
    const pass = '123456';
    const search_terms = ['beef']//, 'pepper', 'sugar', 'pasta', 'salmon', 'spinach', 'juice', 'taco', 'egg', 'rice']
    beforeEach(() => {
        cy.visit('https://app.eggcellent.cooking');
    })
    //Log in feature & directs to the main page
    //it('Login', () => {
    //    cy.get('input[type=email]').type(email);
    //    cy.get('input[type=password]').type(pass);
    //    cy.contains('Log In').click();
    //    cy.contains('All Recipes');
    //    cy.contains('My Recipes');
    //    cy.contains('Account');
    //})
    it('Search by Name', () => {
        // check number of items returned is 100
        // check each item has search term in title
        for (let i = 0; i < search_terms.length; i ++){
            // in the search input field, enter the search term 
            cy.get('#search-by-name').type(search_terms[i]);
            cy.get('.btn > .material-icons').click();
            cy.wait(1500)
            // keep track of how many recipes we went through
            let counter = 0
            cy.get('recipe-main').shadow().find('article').each(($el) => {
                counter += 1
                // cy.get('recipe-main').click()
                cy.wait(2000)
                cy.get($el).click({force: true})//
                cy.wait(2500)
                cy.contains('.ingred-list', search_terms[i])       
                cy.get('.close-recipe-btn').click({force: true})
            })
            cy.get('[class="result-count"]').should('have.value', counter)
            cy.get('input[id=search-by-name]').clear();
        }    
    })
    it('Search by Ingredients', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click();
        cy.get('input[id=ingreds-input]').type('flour')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.get('recipe-main').each(($el) => {
            cy.get($el).click({force: true})
            cy.wait(500)
            cy.contains('.ingred-list', 'flour')       //.ingreds
            cy.get('.close-recipe-btn').click({force: true})
        })
    })
    it('Search by Cooking Time', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click();
        cy.get('input[cook-time-input]').type('20')
        cy.get('btn btn-sm btn-outline-success').click()
        cy.get('recipe-main').each(($el) => {
            cy.get($el).click()
            let time = cy.get('.recipe-info').toString().replace(/[^0-9]/g,'')
            console.log(time)
            cy.contains('.recipe-info', search_terms[i])       
            cy.get('.close-recipe-btn').click({force: true})
        })
    })
    //it('Search by Cooking Time', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
    //    cy.get('.All').click();
    //    cy.get('input[cook-time-input]').type('20')
    //    cy.get('btn btn-sm btn-outline-success').click()
    //    cy.get('recipe-main').each(($el) => {
    //        cy.get($el).click()
    //        cy.contains('.ingreds', search_terms[i])       
    //        cy.get('.close-recipe-btn').click({force: true})
    //    })
    //})
})