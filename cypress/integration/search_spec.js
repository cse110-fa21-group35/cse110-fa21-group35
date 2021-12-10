const { iteratee } = require("lodash");
describe('EggCellent E2E Test', function() {
    const email = 'kevinan@gmail.com';
    //const email = chance.email();
    const pass = '123456';
    const search_terms = ['beef']//, 'pepper', 'sugar', 'pasta', 'salmon', 'spinach', 'juice', 'taco', 'egg', 'rice']
    beforeEach(() => {
        cy.visit('https://app.eggcellent.cooking');
    })
  
    it('Search beef by name', () =>{
        cy.get('#search-by-name').type('beef')
        cy.get('.btn > .material-icons').click()
        cy.wait(500)
        
        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search beef: 100 Results')

    })

    it('Search vodka by name', () =>{
        cy.get('#search-by-name').type('vodka')
        cy.get('.btn > .material-icons').click()
        cy.wait(500)
        
        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search vodka: 1 Results')
    })

    it('Search crispy by name', () =>{
        cy.get('#search-by-name').type('crispy')
        cy.get('.btn > .material-icons').click()
        cy.wait(500)
        
        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search crispy: 44 Results')
    })

    it('Search hot by name', () =>{
        cy.get('#search-by-name').type('hot')
        cy.get('.btn > .material-icons').click()
        cy.wait(500)
        
        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search hot: 35 Results')
    })

    it('Search ucsd by name', () =>{
        cy.get('#search-by-name').type('ucsd')
        cy.get('.btn > .material-icons').click()
        cy.wait(500)
        
        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search ucsd: 0 Results')
    })

    it('Search Egg by Ingredients', () => {
        // check whether the all tags selected are in the name/ingredients
        
        cy.get('.All').click()
        cy.get('input[id=ingreds-input]').type('egg')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)

        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 100 Results')
        cy.contains('Contact Us').should('be.visible')
    })

    it('Search Water by Ingredients', () => {
        // check whether the all tags selected are in the name/ingredients
        
        cy.get('.All').click()
        cy.get('input[id=ingreds-input]').type('water')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)

        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 100 Results')
        cy.contains('Contact Us').should('be.visible')
    })

    it('Search vodka by Ingredients', () => {
        // check whether the all tags selected are in the name/ingredients
        
        cy.get('.All').click()
        cy.get('input[id=ingreds-input]').type('vodka')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)

        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 21 Results')
        cy.contains('Contact Us').should('be.visible')
    })

    it('Search perfect by Ingredients', () => {
        // check whether the all tags selected are in the name/ingredients
        
        cy.get('.All').click()
        cy.get('input[id=ingreds-input]').type('perfect')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)

        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 0 Results')
        cy.contains('Contact Us').should('be.visible')
    })

    it('Search hot by Ingredients', () => {
        // check whether the all tags selected are in the name/ingredients
        
        cy.get('.All').click()
        cy.get('input[id=ingreds-input]').type('hot')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)

        cy.contains('All Recipes').should('be.visible')
        cy.contains('My Recipes').should('be.visible')
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 0 Results')
        cy.contains('Contact Us').should('be.visible')
    })
    it('Search 20 by Cooking Time', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=cook-time-input]').type('20')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 100 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 10 by Cooking Time', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=cook-time-input]').type('10')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 72 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 5 by Cooking Time', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=cook-time-input]').type('5')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 35 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 1 by Cooking Time', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=cook-time-input]').type('1')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 0 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 000 by Cooking Time', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=cook-time-input]').type('000')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 0 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 2000 by Calories', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=calories-input]').type('2000')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 100 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 50 by Calories', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=calories-input]').type('50')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 100 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 10 by Calories', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=calories-input]').type('10')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 6 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })

    it('Search 0 by Calories', () => {
        // check whether the all tags selected are in the name/ingredients
        // cy.get('').click();
        cy.get('.All').click()
        cy.get('input[id=calories-input]').type('0')
        cy.get('[class="btn btn-sm btn-outline-success"]').click()
        cy.wait(500)
        cy.contains('Account').should('be.visible')
        cy.contains('My Recipes').should('be.visible')

        cy.get('[class="result-text"]').should('have.text', 'Search By Categories: 0 Results')
        cy.contains('Contact Us').should('be.visible')
            
    })
})