import { showEditPanel } from './recipe_edit.js';

class Recipe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set data(data) {
    // creating CSS style element for each recipe element
    const style_element = document.createElement('style');
    const styles = `
              a.name {
                  background-color: #FDE79B;
                  position: relative;
                  top: 30px;
                  width: 100%;
                  height: 13%;
                  color: #405262;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: 'Roboto', sans-serif;
                  font-weight: bold;
                  text-decoration: none;
                  text-align: center;
              }

              a.img > img {
                  height: 150px;
                  object-fit: cover;
                  position: relative;
                  top: 50px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                  width: 90%;
                  border-radius: 5px;
              }

              article {
                  position: relative;
                  background-color: white;
                  width: 300px;
                  height: 280px;
                  border-radius: 20px;
                  top: 5px;
              }
  
              article:hover {
                  box-shadow: 4px 4px 5px #405263;
              }
          `;
    style_element.innerHTML = styles;

    // adding customized recipe and CSS style to main
    this.shadowRoot.appendChild(style_element);
    this.shadowRoot.appendChild(createRecipeCardElem(data));
  }
}

function createRecipeCardElem(data) {
  // creating a recipe cutomized object
  const recipe = document.createElement('article');
  recipe.id = 'recipe-card-view';
  recipe.onclick = function () {
    let id = recipe.getRootNode().host.id;
    createOverlay();
    document
      .querySelector('section.recipe-expand')
      .appendChild(createRecipeContentElem(data, id));
  };

  // creating recipe name element for recipe
  let recipe_name = document.createElement('a');
  recipe_name.setAttribute('class', 'name');
  // recipe_name.setAttribute("href", "");
  recipe_name.textContent = data['name'];
  recipe.appendChild(recipe_name);

  // creating image element for recipe
  let recipe_img_link = document.createElement('a');
  let recipe_img = document.createElement('img');
  recipe_img.setAttribute('src', data['image']);
  recipe_img_link.setAttribute('class', 'img');
  // recipe_img_link.setAttribute("href", "");
  recipe_img_link.appendChild(recipe_img);
  recipe.appendChild(recipe_img_link);
  return recipe;
}

function createRecipeContentElem(data, id) {
  const recipeContentSection = document.querySelector('section.recipe-expand');

  const contStyleElem = document.createElement('style');
  const contStyle = `
  .btns {
    border-width: 0;
    padding-left: 2%;
    padding-right: 2%;
    margin-top: 3px;
    font-size: medium;
    font-weight: bold;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  
  .edit-recipe-btn,
  .delete-recipe-btn {
    width: 8vw;
    background-color: #405263;
    border-radius: 50px;
  }
  
  .edit-recipe-btn:hover,
  .delete-recipe-btn:hover {
    background-color: #fde79b;
  }
  
  .edit-recipe-btn:hover > *,
  .delete-recipe-btn:hover > * {
    color: #405263;
  }
  
  .add-recipe-btn {
    border-radius: 10px;
    background-color: #ffefbb;
  }
  
  .add-recipe-btn:hover {
    background-color: #fde79b;
  }
  
  #recipe-card-added-btn {
    color: crimson;
    font-size: 2vw;
  }
  
  .header-label {
    color: white;
  }
  
  .my-recipe-label {
    color: #405263;
  }
  
  #recipe-card-add-btn {
    color: #405263;
    font-size: 2vw;
  }
  
  #recipe-card-edit-btn,
  #recipe-card-delete-btn {
    font-size: 2vw;
  }
  
  .recipe-name {
    background-color: #fde79b;
    font-size: 24px;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4vw;
  }
  
  a.recipe-link {
    text-decoration: none;
    color: #405263;
  }
  
  a.recipe-link:hover {
    text-decoration:underline;
  }
  
  .recipe-img {
    width: 100%;
    height: 14vw;
    border-radius: 15px;
  }
  
  .nutr-label {
    width: 90%;
    margin-top: 1vw;
    margin-left: 5%;
    margin-right: 5%;
  }
  
  hr {
    display: block;
    margin-top: 0;
    margin-bottom: 0.5em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
  }

  #recipe-card-close-btn {
    color: #405263;
    font-size: 2.7vw;
  }

  .close-recipe-btn {
    border: 0px;
    background-color: transparent;
  }

  .recipe-create-edit-panel {
    display: flex;
    justify-content: center;
  }

  .card-header {
    background-color: white;
    border-color: white;
    height: 50px;
  }
  
  .card-header:first-child {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .card {
    top: 10px;
    border-width: 0;
    position: absolute;
    width: 70%;
    border-radius: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    z-index: 100;
  }

  .recipe-card-header-space {
    display: inline-block;
    height: 100%;
  }
  `;
  contStyleElem.innerHTML = contStyle;
  recipeContentSection.appendChild(contStyleElem);

  //content container
  const recipeContent = document.createElement('div');
  recipeContent.id = id;
  recipeContent.className = 'container-fluid recipe-create-edit-panel';

  //content panel itself
  const card = document.createElement('div');
  card.className = 'card';

  //panel header, title, and body
  card.appendChild(createRecipeCotentPanelHeader(data, id));
  card.appendChild(
    createRecipeContentPanelName(data['name'], data['sourceUrl'])
  );
  card.appendChild(createRecipeContentPanelBody(data));

  recipeContent.appendChild(card);
  return recipeContent;
}

function createRecipeCotentPanelHeader(data, id) {
  //panel header
  const header = document.createElement('div');
  header.className = 'card-header';
  const headerSpan = document.createElement('div');
  headerSpan.className =
    'd-grid gap-2 d-md-flex justify-content-md-end recipe-card-header-space';

  //edit btn
  if (data['createdByUser']) {
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-recipe-btn btns';
    const editIcon = document.createElement('i');
    editBtn.onclick = function () {
      showEditPanel(data, id);
    };
    editIcon.id = 'recipe-card-edit-btn';
    editIcon.className = 'material-icons';
    editIcon.innerHTML = 'edit';
    const editText = document.createElement('span');
    editText.className = 'header-label';
    editText.innerHTML = 'Edit';
    editBtn.appendChild(editIcon);
    editBtn.appendChild(editText);
    headerSpan.appendChild(editBtn);
  }
  //delete btn
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-recipe-btn btns';
  deleteBtn.onclick = function () {
    deleteRecipe(id);
  };
  const deleteIcon = document.createElement('i');
  deleteIcon.id = 'recipe-card-delete-btn';
  deleteIcon.className = 'material-icons';
  deleteIcon.innerHTML = 'delete';
  const delText = document.createElement('span');
  delText.className = 'header-label';
  delText.innerHTML = 'Delete';
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.appendChild(delText);
  headerSpan.appendChild(deleteBtn);

  //close btn (X)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-recipe-btn';
  closeBtn.onclick = function () {
    document.querySelector('section.recipe-expand').innerHTML = '';
    document
      .querySelector('html')
      .removeChild(document.getElementById('overlay'));
  };
  //closeBtn icon
  const closeBtnIcon = document.createElement('i');
  closeBtnIcon.className = 'material-icons';
  closeBtnIcon.id = 'recipe-card-close-btn';
  closeBtnIcon.innerHTML = 'close';
  closeBtn.appendChild(closeBtnIcon);

  headerSpan.appendChild(closeBtn);
  header.appendChild(headerSpan);

  return header;
}

function createRecipeContentPanelName(title, url) {
  const name = document.createElement('div');
  name.className = 'card-body recipe-name';
  const link = document.createElement('a');
  if (url !== undefined) {
    link.href = url;
  }
  link.className = 'recipe-link';
  link.innerHTML = title;
  name.appendChild(document.createElement('span').appendChild(link));

  return name;
}

function createRecipeContentPanelBody(data) {
  const body = document.createElement('div');
  body.className = 'card-body recipe-body row justify-content-center';
  body.appendChild(createLeftContent(data));
  body.appendChild(createRightContent(data));
  return body;
}

function createLeftContent(data) {
  const left = document.createElement('div');
  left.className = 'content-left col-4';

  //recipe image
  const img = document.createElement('img');
  img.className = 'recipe-img';
  img.src = data['image'];

  //nutrition label;
  const label = document.createElement('img');
  label.className = 'nutr-label';
  let nutrURL = data['nutrition'];
  if (nutrURL === undefined || nutrURL['nutritionImage'] === undefined) {
    label.src = '/source/images/no-nutr-label-avail.jpg';
  } else {
    label.src = `${nutrURL['nutritionImage']}?apiKey=${APIKEY}`;
  }

  left.appendChild(img);
  left.appendChild(label);
  return left;
}

function createRightContent(data) {
  const right = document.createElement('div');
  right.className = 'content-right col-7';

  right.appendChild(createRecipeInfo(data));
  right.appendChild(createIngredList(data));
  right.appendChild(createSteps(data));
  return right;
}

function createRecipeInfo(data) {
  //recipe info: recipe by; cooking time; servings.
  const recipeInfoBox = document.createElement('div');
  recipeInfoBox.className = 'recipe-info-box';
  const infoTitle = document.createElement('span');
  infoTitle.className = 'fs-4';
  infoTitle.innerHTML = 'RECIPE INFO';
  const infos = document.createElement('p');
  infos.className = 'recipe-info';
  infos.innerHTML = `
    Recipe By: ${data['author']}<br />
    Cooking Time: ${data['cookTime']} minutes<br />
    Servings: ${data['recipeYield']}<br />
  `;

  recipeInfoBox.appendChild(infoTitle);
  recipeInfoBox.appendChild(document.createElement('hr'));
  recipeInfoBox.appendChild(infos);
  return recipeInfoBox;
}

function createIngredList(data) {
  //ingred list
  const ingredList = document.createElement('div');
  ingredList.className = 'ingred-list';
  const ingredTitle = document.createElement('span');
  ingredTitle.className = 'fs-4';
  ingredTitle.innerHTML = 'INGREDIENTS';
  const ingreds = document.createElement('div');
  ingreds.className = 'ingreds';
  ingreds.appendChild(ingredients(data));

  ingredList.appendChild(ingredTitle);
  ingredList.appendChild(document.createElement('hr'));
  ingredList.appendChild(ingreds);
  return ingredList;
}

function ingredients(data) {
  const list = document.createElement('ul');
  let items = getIngreds(data);

  for (let i = 0; i < items.length; i++) {
    let it = document.createElement('li');
    it.innerHTML = items[i];
    list.appendChild(it);
  }
  return list;
}

function getIngreds(data) {
  let ingredData = data['recipeIngredient'];
  let items = [];
  if (ingredData == null) {
    return items;
  }
  let keys = Object.keys(ingredData);
  for (let i = 0; i < keys.length; i++) {
    items.push(ingredData[keys[i]]);
  }
  return items;
}

function createSteps(data) {
  const stepList = document.createElement('div');
  stepList.className = 'step-list';

  const stepTitle = document.createElement('span');
  stepTitle.className = 'fs-4';
  stepTitle.innerHTML = 'STEPS';

  const steps = document.createElement('div');
  steps.className = 'steps';
  const stepContent = document.createElement('p');
  stepContent.className = 'step-box';
  setSteps(stepContent, data['recipeInstructions']);
  steps.appendChild(stepContent);

  stepList.appendChild(stepTitle);
  stepList.appendChild(document.createElement('hr'));
  stepList.appendChild(steps);
  return stepList;
}

function setSteps(stepContent, stepStr) {
  if (!stepStr.includes('\n')) {
    stepContent.innerHTML = stepStr;
  } else {
    stepContent.innerText = stepStr;
  }
}

// eventlistener here
window.addEventListener('DOMContentLoaded', init);

// define a recipe-main element
customElements.define('recipe-main', Recipe);

var recipeCounts = 0;
var recipeIds = [];
var cards = [];

// starting here
async function init() {
  createOverlay();
  showSpinner();
  let fetchSuccessful = await readRecipe();
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  }
  createRecipeCards();
  showTotalRecipeCount(recipeCounts);
  removeSpinner();
  removeOverlay();
}

// creating recipe-main element based on the data we have - data are store in "recipes"
function createRecipeCards() {
  if (user_recipe_data != undefined) {
    recipeIds = Object.keys(user_recipe_data);
    let main = document.querySelector('main');
    recipeCounts = recipeIds.length;
    for (let i = 0; i < recipeCounts; i++) {
      cards.push(document.createElement('recipe-main'));
      cards[i].data = user_recipe_data[recipeIds[i]];
      cards[i].id = recipeIds[i];
      main.appendChild(cards[i]);
    }
  }
}

function showTotalRecipeCount(rCount) {
  console.log(rCount);
  document.querySelector('span.total-recipe-count').innerHTML = document
    .querySelector('span.total-recipe-count')
    .innerHTML.replace(new RegExp('\\d+'), rCount);
}

// event listener for searching button in my recipe page
let searchBox = document.getElementsByClassName('search-recipe-box');
let searchInput = searchBox[0].getElementsByClassName('form-control');
searchInput[0].addEventListener('keypress', function (event) {
  // 13 is keyCode of enter
  if (event.keyCode == 13) {
    if (searchInput[0].value.length != 0) {
      searchByNameAndTagsMyRecipe(searchInput[0].value);
    } else {
      recoverMyRecipe();
      showTotalRecipeCount(recipeIds.length);
    }
  }
});

// searching-by-name and search-by-tag feature in my recipe page
// Estimated time-complexity: O(n * m)
// n is amount of recipes, m is amount of tags for each recipe
function searchByNameAndTagsMyRecipe(keyword) {
  recoverMyRecipe();
  console.log(keyword);
  recipeIds = Object.keys(user_recipe_data);
  let main = document.querySelector('main');
  let removedCount = 0;
  for (let i = 0; i < recipeIds.length; i++) {
    let recipeData = user_recipe_data[recipeIds[i]];
    let name = recipeData['name'].toLowerCase();
    let tags = recipeData['tags'];
    if (!name.includes(keyword.toLowerCase()) && !hasTag(keyword, tags)) {
      main.removeChild(cards[i]);
      removedCount++;
    }
  }
  showTotalRecipeCount(recipeIds.length - removedCount);
}

// recover the origin my recipe page
function recoverMyRecipe() {
  let main = document.querySelector('main');
  let mainComponent1 = main.getElementsByClassName('page-up-btn-group')[0];
  let mainComponent2 = main.getElementsByClassName('page-down-btn-group')[0];
  let mainComponent3 = main.getElementsByClassName('main-action-group')[0];
  // initialize main O(n)
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  main.appendChild(mainComponent1);
  main.appendChild(mainComponent2);
  main.appendChild(mainComponent3);
  // add all the original cards O(n)
  for (let i = 0; i < cards.length; i++) {
    main.appendChild(cards[i]);
  }
}

// search-for-tag(ingredients) feature with tags field in database
// Estimated time-complexity: O(n) - n is length of tagsList
function hasTag(keyword, tagsList) {
  // handle edge case here when tagsList is undefined
  if (tagsList == undefined) {
    return false;
  }
  let keys = Object.keys(tagsList);
  for (let i = 0; i < keys.length; i++) {
    if (tagsList[keys[i]].toLowerCase().includes(keyword.toLowerCase())) {
      return true;
    }
  }
  return false;
}
