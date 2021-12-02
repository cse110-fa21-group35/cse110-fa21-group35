import {
  createOverlay,
  createRecipeNameInput,
  createPanelContainer,
  createElem,
  createRecipeContent,
  createIngredInput,
} from './recipe_create.js';

export { showEditPanel };
function showEditPanel(data, id) {
  //get name, image, label, recipe by, cooking time, servings,
  //ingredients, and steps from the recipe to be edited
  createOverlay();

  //create the panel container element
  const recipeCreatePanelContainer = createElem('div');
  createPanelContainer(recipeCreatePanelContainer);

  //create panel itself
  const recipeCreatePanel = createElem('div');
  recipeCreatePanel.className = 'card';

  createPanelHeader(recipeCreatePanel, data, id);
  createRecipeNameInput(recipeCreatePanel);
  createRecipeContent(recipeCreatePanel);

  recipeCreatePanelContainer.appendChild(recipeCreatePanel);
  document.querySelector('body').appendChild(recipeCreatePanelContainer);
  fillInBlank(data);
}

function createPanelHeader(recipeCreatePanel, data, recipeId) {
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
    editRecipe(recipeId, data);
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
function getRecipeInfo() {
  let name = document.getElementById;
}
function getNameOfIngredient(ingred_array) {
  let name = '';
  for (let i = 2; i < ingred_array.length; i++) {
    name += ingred_array[i] + ' ';
  }
  return name;
}
function fillInBlank(data) {
  let name = document.getElementById('recipe-name-input');
  let author = document.getElementById('recipe-chief-name-input');
  let time = document.getElementById('recipe-time-input');
  let serving = document.getElementById('recipe-servings-input');
  let steps = document.getElementById('step-input');
  name.value = data['name'];
  author.value = data['author'];
  time.value = data['cookTime'];
  serving.value = data['recipeYield'];
  let ingre_list = data['recipeIngredient'];
  let ingre_keys = Object.keys(ingre_list);
  let edit_panel = document.getElementById('recipe-create-edit-panel');
  for (let i = 5; i < ingre_keys.length; i++) {
    edit_panel
      .querySelector('div.ingred-list')
      .appendChild(createIngredInput());
    document
      .querySelector('button.remove-ingred-btn')
      .classList.remove('hidden');
  }
  let ingredients_name = document.getElementsByClassName('ingred-name');
  let ingredients_amount = document.getElementsByClassName('ingred-quantity');
  let ingredients_unit = document.getElementsByClassName('form-select');
  for (let i = 0; i < ingre_keys.length; i++) {
    let ingredients_item = ingre_list[ingre_keys[i]];
    let ingred_array = ingredients_item.split(' ');
    ingredients_name[i].value = getNameOfIngredient(ingred_array);
    ingredients_amount[i].value = ingred_array[0];
    ingredients_unit[i].value = ingred_array[1];
    console.log(ingredients_item);
  }
  steps.value = data['recipeInstructions'];
}
