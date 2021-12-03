// export {
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
// };

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

var recipeId = '';
var recipesAddedIDs = new Set();

function createRecipeCardElem(data) {
  // creating a recipe cutomized object
  const recipe = document.createElement('article');
  recipe.id = 'recipe-card-view';
  recipe.onclick = async function () {
    createOverlay();
    showSpinner();
    let done = await getRecipeInfoById(data['id']);
    if (!done) {
      console.log('Recipe fetch unsuccessful');
      return;
    }
    document
      .querySelector('section.recipe-expand')
      .appendChild(createRecipeContentElem(single_recipe_info));
  };

  // creating recipe name element for recipe
  let recipe_name = document.createElement('a');
  recipe_name.setAttribute('class', 'name');
  // recipe_name.setAttribute("href", "");
  recipe_name.textContent = data['title'];
  recipe.appendChild(recipe_name);

  // creating image element for recipe
  let recipe_img_link = document.createElement('a');
  let recipe_img = document.createElement('img');
  if (data['image'] == undefined) {
    recipe_img.setAttribute('src', '/source/images/no-img-avail.png');
  } else {
    recipe_img.setAttribute('src', data['image']);
  }
  recipe_img_link.setAttribute('class', 'img');
  recipe_img_link.appendChild(recipe_img);
  recipe.appendChild(recipe_img_link);
  return recipe;
}

function createRecipeContentElem(data) {
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
  recipeContent.id = data['id'];
  recipeId = data['id'];
  recipeContent.classList = 'container-fluid recipe-create-edit-panel';

  //content panel itself
  const card = document.createElement('div');
  card.className = 'card';

  //panel header, title, and body
  card.appendChild(createRecipeCotentPanelHeader());
  card.appendChild(
    createRecipeContentPanelName(data['title'], data['sourceUrl'])
  );
  card.appendChild(createRecipeContentPanelBody(data));

  recipeContent.appendChild(card);
  removeSpinner();
  return recipeContent;
}

function createRecipeCotentPanelHeader() {
  //panel header
  const header = document.createElement('div');
  header.className = 'card-header';
  const headerSpan = document.createElement('div');
  headerSpan.className =
    'd-grid gap-2 d-md-flex justify-content-md-end recipe-card-header-space';

  //add recipe to my favorite btn
  const addRecBtn = createAddBtn();

  //close btn (X)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-recipe-btn';
  closeBtn.onclick = function () {
    document.querySelector('section.recipe-expand').innerHTML = '';
    removeOverlay();
  };
  //closeBtn icon
  const closeBtnIcon = document.createElement('i');
  closeBtnIcon.className = 'material-icons';
  closeBtnIcon.id = 'recipe-card-close-btn';
  closeBtnIcon.innerHTML = 'close';
  closeBtn.appendChild(closeBtnIcon);

  headerSpan.appendChild(addRecBtn);
  headerSpan.appendChild(closeBtn);
  header.appendChild(headerSpan);

  return header;
}

function createAddBtn() {
  const addBtn = document.createElement('button');
  const addIcon = document.createElement('i');
  const addText = document.createElement('span');
  addBtn.className = 'add-recipe-btn btns';
  addIcon.className = 'material-icons';
  addText.className = 'my-recipe-label';

  //add btn style different if recipe already added
  if (recipesAddedIDs.has(recipeId)) {
    addIcon.id = 'recipe-card-added-btn';
    addIcon.innerHTML = 'favorite';
    addText.innerHTML = 'My Recipe!';
  } else {
    addIcon.id = 'recipe-card-add-btn';
    addIcon.innerHTML = 'favorite_border';
    addText.innerHTML = 'Add to My Recipe';
  }

  addBtn.onclick = function addRecipe() {
    let addBtnIcon = document.querySelector('#recipe-card-add-btn');
    if (addBtnIcon != null) {
      addBtnIcon.innerHTML = 'favorite';
      addBtnIcon.id = 'recipe-card-added-btn';
      document.querySelector('span.my-recipe-label').innerHTML = 'My Recipe!';
      addToMyRecipe(recipeId);
      recipesAddedIDs.add(recipeId);
      // TODO: update recipeAddedIDs in firebase
    } else {
      alert('Recipe Already Added!');
    }
  };
  addBtn.append(addIcon);
  addBtn.append(addText);
  return addBtn;
}

function createRecipeContentPanelName(title, url) {
  const name = document.createElement('div');
  name.className = 'card-body recipe-name';
  const link = document.createElement('a');
  link.href = url;
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
  label.src = `https://api.spoonacular.com/recipes/${data['id']}/nutritionLabel.png?apiKey=48efb642c0b24eb586a3ba1d81ee738e`;

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
    Recipe By: ${data['sourceName']}<br />
    Cooking Time: ${data['readyInMinutes']} minutes<br />
    Servings: ${data['servings']}<br />
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
  let ingredData = data['extendedIngredients'];
  let items = [];

  for (let i = 0; i < ingredData.length; i++) {
    items.push(ingredData[i]['original']);
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
  setSteps(stepContent, data['instructions']);
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

// define a recipe-main element
customElements.define('recipe-main', Recipe);

// HAVE TO MANUALLY SET THE DISPLAY RECIPES AMOUNT FOR FIRST PAGE
var recipe_length = 100;

// path of json of main page
// LAST NUMBER IS HOW MANY RECIPES WE ARE RENDERING
const APIKEY = '48efb642c0b24eb586a3ba1d81ee738e';
const recipe_path = `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=${recipe_length}`;
// we store the data of recipe temporary in object
var recipe_data = undefined;

// eventlistener here
window.addEventListener('DOMContentLoaded', init);

// starting here
async function init() {
  // TODO: delete if backend fixed
  recipesAddedIDs = new Set();

  createOverlay();
  showSpinner();
  let fetchSuccessful = await fetch_recipe();
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  }
  createRecipeCards();
  removeSpinner();
  removeOverlay();
}

// reading the json data and store it in object array
// recipes data will be stored in "recipes"
async function fetch_recipe() {
  return new Promise((resolve, reject) => {
    fetch(recipe_path)
      .then((response) => response.json())
      .then(function (data) {
        recipe_data = data;
        console.log(recipe_data);
      })
      .then(() => {
        resolve(true);
      });
  });
}

// creating recipe-main element based on the data we have - data are store in "recipes"
function createRecipeCards() {
  var cards = [];
  let recipes_set = recipe_data['recipes'];
  var main = document.querySelector('main');
  for (let i = 0; i < recipe_length; i++) {
    // console.log(recipe_length);
    cards.push(document.createElement('recipe-main'));
    // console.log(recipe_data['recipes']);
    cards[i].data = recipes_set[i];
    main.appendChild(cards[i]);
  }
}
