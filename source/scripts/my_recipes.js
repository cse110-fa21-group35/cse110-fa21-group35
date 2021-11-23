// import {
//   createRecipeCardElem,
//   createRecipeContentElem,
//   createOverlay,
//   createRecipeCotentPanelHeader,
//   createRecipeContentPanelName,
//   createRecipeContentPanelBody,
//   createLeftContent,
//   createRightContent,
//   createRecipeInfo,
//   createIngredList,
//   ingredients,
//   getIngreds,
//   createSteps,
//   setSteps,
// } from './recipe_class_online.js';

// we store the data of recipe temporary in object
var recipe_data = undefined;

// eventlistener here
window.addEventListener('DOMContentLoaded', init);

// starting here
async function init() {
  //   let fetchSuccessful = await fetch_recipe();
  //   if (!fetchSuccessful) {
  //     console.log('Recipe fetch unsuccessful');
  //     return;
  //   }
  readRecipe();
  //createRecipeCards();
}
