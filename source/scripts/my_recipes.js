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
  console.log('Calling reading function');
  let success = await readRecipe();

  if (!success) {
    console.log('something wrong');
  }
  //createRecipeCards();
}
