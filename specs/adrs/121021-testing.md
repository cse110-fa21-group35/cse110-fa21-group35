- Deciders: EggCellent (Team 35)
- Date: 2021/12/10

## Context and Problem Statement

1. How do we fetch multiple recipe data from JSON and convert that to customized elements?
2. What tools are we going to use for testing?

## Considered Options

1. If the recipe's ingredients include the certain word, for example, egg or beef, we could store that recipe to the certain word category
2. Option 1: Cypress

   - Pros: Easy to use and learn. Good GUI. Good documentations.
   - Cons: Did not use before. First time using it.

   Option 2: Jest and Puppeteer

   - Pros: Learned how to use them during lab 8.
   - Cons: Worse GUI. Does not have cool features that cypress has.

## Decision Outcome

1. Using the ingredient part, we could categorize the recipe. So we can search the recipe with the word of any ingredients.

2. We chose Cypress as it has cool features and functions that would let us easier to implement various tests. For example, by running tests 'npx cypress open', we can view test running for each step on a separate cypress tab.
