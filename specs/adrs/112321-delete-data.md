- Deciders: EggCellent (Team 35)
- Date: 2021/11/23

## Context and Problem Statement

1. How should we delete datas from our storage?

## Considered Options

1. If the action is to delete a recipe, essentially remove the associated recipe contents in firebase. In the app, we need two pieces of information: the respective account ID attempting to make the deletion, and the recipe ID which was chosen. Deleting would be removing the associated json of the recipeID inside the user’s recipes object, which is identified by accountId.recipes. We will query our database accordingly.

## Decision Outcome

1. Query db with a delete for accountId.recipes.recipeId
