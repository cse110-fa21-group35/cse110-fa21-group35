import {
  createOverlay,
  createRecipeNameInput,
  createPanelContainer,
  createElem,
  createRecipeContent,
} from './recipe_create.js';

export { showEditPanel };

function showEditPanel(data) {
  //get name, image, label, recipe by, cooking time, servings,
  //ingredients, and steps from the recipe to be edited
  createOverlay();

  //create the panel container element
  const recipeCreatePanelContainer = createElem('div');
  createPanelContainer(recipeCreatePanelContainer);

  //create panel itself
  const recipeCreatePanel = createElem('div');
  recipeCreatePanel.className = 'card';

  createPanelHeader(recipeCreatePanel);
  createRecipeNameInput(recipeCreatePanel);
  createRecipeContent(recipeCreatePanel);

  recipeCreatePanelContainer.appendChild(recipeCreatePanel);
  document.querySelector('body').appendChild(recipeCreatePanelContainer);
  fillInBlank();
}

function createPanelHeader(recipeCreatePanel) {
  //create panel header
  const panelHeader = createElem('div');
  panelHeader.className = 'card-header';
  //inner space of header
  const headerSpan = createElem('div');
  headerSpan.className =
    'd-grid gap-2 d-md-flex justify-content-md-end recipe-card-header-space';
  //save btn
  const saveBtn = createElem('button');
  saveBtn.className = 'btn btn-primary btn-sm me-md-3 recipe-save-btn';
  saveBtn.innerHTML = 'Save';
  saveBtn.onclick = function () {
    editRecipe(recipeId, recipeInfo);
  };

  //close btn (X)
  const closeBtn = createElem('button');
  closeBtn.className = 'close-recipe-btn';
  closeBtn.onclick = function () {
    document
      .querySelector('body')
      .removeChild(document.getElementById('recipe-create-edit-panel'));
    document
      .querySelector('html')
      .removeChild(document.getElementById('overlay'));
  };
  //closeBtn icon
  const closeBtnIcon = createElem('i');
  closeBtnIcon.className = 'material-icons';
  closeBtnIcon.id = 'recipe-card-close-btn';
  closeBtnIcon.innerHTML = 'close';
  closeBtn.appendChild(closeBtnIcon);
  headerSpan.appendChild(saveBtn);
  headerSpan.appendChild(closeBtn);
  panelHeader.appendChild(headerSpan);
  recipeCreatePanel.appendChild(panelHeader);
}
function fillInBlank() {
  let name = document.getElementById('recipe-name-input');
  let author = document.getElementById('recipe-chief-name-input');
  let time = document.getElementById('recipe-time-input');
  let serving = document.getElementById('recipe-servings-input');
  let ingredients_name = document.getElementsByClassName('ingred-name');
  let ingredients_amount = document.getElementsByClassName('ingred-quantity');
  let ingredients_unit = document.getElementsByClassName('ingred-units');
  let steps = document.getElementById('step-input');
  name.value = recipeInfo['name'];
  name.value = recipeInfo['name'];
  author.value = recipeInfo['author'];
  time.value = recipeInfo['cooking-time'];
  serving.value = recipeInfo['serving'];
  let ingre_list = recipeInfo['ingredients'];
  for (let i = 0; i < ingre_list.length; i++) {
    let ingredients_item = ingre_list[i];
    ingredients_name[i].value = ingredients_item['name'];
    ingredients_amount[i].value = ingredients_item['amount'];
    ingredients_unit[i].value = ingredients_item['unit'];
  }
  steps.value = recipeInfo['steps'];
}
