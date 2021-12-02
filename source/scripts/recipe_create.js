//Render the Recipe Create/Edit Panel
//make sure every external css is imported
export {
  createOverlay,
  createRecipeNameInput,
  createPanelContainer,
  createElem,
  createRecipeContent,
  createIngredInput,
};
let createRecipeBtn = document.getElementById('create-recipe-btn');
createRecipeBtn.addEventListener('click', function () {
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
});

function createElem(type) {
  return document.createElement(type);
}

function createOverlay() {
  //generate background overlay
  const overlay = createElem('section');
  const styleElem = createElem('style');
  const overlayStyle = `
    #overlay {
        position: fixed; 
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.61);
        z-index: 2;
    }`;
  overlay.id = 'overlay';
  styleElem.innerHTML = overlayStyle;
  overlay.appendChild(styleElem);
  document.querySelector('html').appendChild(overlay);
}

function createPanelContainer(recipeCreatePanelContainer) {
  recipeCreatePanelContainer.id = 'recipe-create-edit-panel';
  const panelStyleElem = createElem('style');
  const panelStyle = `
  .card-header {
    background-color: white;
    border-color: white;
    height: 50px;
  }
  
  .card-header:first-child {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  
  .recipe-create-panel {
    margin: 0 100px 0 100px;
  }
  
  .card {
    top: 10px;
    border-width: 0;
    position: absolute;
    width: 65%;
    border-radius: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    z-index: 100;
    margin-left: 10%;
    margin-right: 10%;
  }
  
  .recipe-save-btn {
    background-color: #405263;
    border-width: 0;
    padding-left: 3%;
    padding-right: 3%;
    margin-top: 3px;
    font-size: medium;
    border-radius: 10px;
    font-weight: bold;
  }
  
  .recipe-browse-btn {
    background-color: #405263;
    padding-left: 25%;
    padding-right: 25%;
    font-size: medium;
    border-radius: 15px;
    font-weight: bold;
    margin-bottom: 1vw;
  }
  
  .recipe-save-btn:hover,
  .recipe-browse-btn:hover {
    background-color: #fde79b;
    color: #405263;
    font-weight: bold;
  }
  
  .recipe-save-btn:focus,
  .recipe-browse-btn:focus {
    background-color: #405263;
    color: white;
  }
  
  .recipe-card-header-space {
    display: inline-block;
    height: 100%;
  }
  
  #recipe-card-close-btn {
    color: #405263;
    font-size: 2.7vw;
  }
  
  .recipe-card-recipe-name {
    background-color: #fde79b;
  }
  
  #recipe-name-input {
    border-color: white;
  }
  
  #recipe-name-input::placeholder {
    text-align: center;
  }
  
  .recipe-card-input-recipe-name {
    padding: 0 20% 0 20%;
  }
  
  .recipe-img-box {
    background-color: #fde79b;
    width: 100%;
    height: 16vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  
  .recipe-img {
    width: 90%;
    background-color: white;
    border-radius: 15px;
    text-align: center;
  }
  
  #recipe-image-upload-icon {
    font-size: 4vw;
    margin-top: 1vw;
    color:#405263;
  }
  
  .drag-drop-text {
    margin: 0 0 0.3vw 0;
    font-size: smaller;
  }
  
  .recipe-content-right {
    background-color: rgba(180, 180, 171, 0.71);
  }
  
  .recipe-name-time-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1vw;
    margin-bottom: 0.5vw;
    padding: 0 0.7vw 0 0.7vw;
  }
  
  #recipe-chief-name-input,
  #recipe-time-input,
  #recipe-servings-input,
  .ingred-quantity {
    margin-left: 1vw;
    width: 70%;
  }
  
  .img-input {
    display: none;
  }
  
  .close-recipe-btn {
    border: 0px;
    background-color: white;
  }
  
  .steps {
    margin: 0 0 1vw 0;
    height: 210px;
  }
  
  #step-input {
    height: 210px;
  }
  
  #units {
    padding-left: 0.4vw;
  }
  
  #unit-list {
    width: auto;
  }
  
  .ingred-item {
    display: flex;
    margin: 0 0 1vw 0;
  }
  
  .add-ingred-btn, .remove-ingred-btn {
    background-color: transparent;
    border: 0px;
    display: flex;
  }

  .hidden {
    display: none;
  }

  .add-ingred-btn:hover > p, .remove-ingred-btn:hover > p {
    text-decoration: underline;
  }

  #add-ingred-icon, #remove-ingred-icon {
    font-size: 2vw;
    color:#405263;
  }

  .add-ingred-text{
    padding: 1.2% 0 0 0;
    font-size: 16px;
    margin-bottom: auto;
  }

  .remove-ingred-text {
    font-size: 16px;
    margin-bottom: auto;
  }
    `;
  panelStyleElem.innerHTML = panelStyle;
  recipeCreatePanelContainer.appendChild(panelStyleElem);
  recipeCreatePanelContainer.className = 'container-fluid recipe-create-panel';
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
    createRecipe();
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

function createRecipeNameInput(recipeCreatePanel) {
  const rNameDiv = createElem('div');
  rNameDiv.className = 'card-body recipe-card-recipe-name';
  const inputDiv = createElem('div');
  inputDiv.className = 'recipe-card-input-recipe-name';
  const input = createElem('input');
  input.type = 'text';
  input.id = 'recipe-name-input';
  input.className = 'form-control';
  input.placeholder = 'Recipe Name';
  inputDiv.appendChild(input);
  rNameDiv.appendChild(inputDiv);
  recipeCreatePanel.appendChild(rNameDiv);
}

function createRecipeContent(recipeCreatePanel) {
  const contentContainer = createElem('div');
  contentContainer.className =
    'card-body recipe-content row justify-content-center';

  const left = createElem('div');
  left.className = 'recipe-content-left col-4';
  createImgBox(left);
  createNutritionLabel(left);

  const right = createElem('div');
  right.className = 'recipe-content-right col-7';
  createRightContent(right);

  contentContainer.appendChild(left);
  contentContainer.appendChild(right);
  recipeCreatePanel.appendChild(contentContainer);
}

function createImgBox(left) {
  const imgBox = createElem('div');
  imgBox.className = 'recipe-img-box';

  const img = createElem('div');
  img.className = 'recipe-img col-11';

  const uploadIcon = createElem('i');
  uploadIcon.className = 'material-icons';
  uploadIcon.id = 'recipe-image-upload-icon';
  uploadIcon.innerHTML = 'cloud_upload';

  const dragDropText = createElem('p');
  dragDropText.className = 'drag-drop-text';
  dragDropText.innerHTML = 'Drag and Drop Image<br />Or';

  const iconLabel = createElem('label');
  iconLabel.className = 'btn btn-primary btn-sm recipe-browse-btn';
  iconLabel.innerHTML = 'Browse';
  const fileInput = createElem('input');
  fileInput.id = 'img-upload';
  fileInput.className = 'img-input';
  fileInput.type = 'file';
  fileInput.accept = 'img/jpeg, img/png, img/jpg';
  // fileInput.onchange = function (event) {
  //   let browseBtn = document.querySelector('label.recipe-browse-btn');
  //   browseBtn.innerHTML = browseBtn.innerHTML.replace(
  //     'Browse',
  //     event.srcElement.files[0].name
  //   );
  // };

  iconLabel.appendChild(fileInput);
  img.appendChild(uploadIcon);
  img.appendChild(dragDropText);
  img.appendChild(iconLabel);
  imgBox.appendChild(img);
  left.appendChild(imgBox);
}

//not completed. Need to consider how to get the label via some apis
function createNutritionLabel(left) {
  const nutr = createElem('div');
  nutr.className = 'recipe-nutrition';
  nutr.style = 'background-color: #e5e5e5; height: 72.8%; margin-top: 1vw';
  left.appendChild(nutr);
}

function createRightContent(right) {
  createNameTimeServing(right);
  createIngred(right);
  createStep(right);
}

function createNameTimeServing(right) {
  const nameTimeContainer = createElem('div');
  nameTimeContainer.className = 'recipe-name-time';
  let str = ['Recipe By', 'Cooking Time', 'Servings'];
  let id = [
    'recipe-chief-name-input',
    'recipe-time-input',
    'recipe-servings-input',
  ];
  for (let i = 0; i < 3; i++) {
    const name = createElem('div');
    name.className = 'recipe-name-time-input';
    const nameText = createElem('span');
    nameText.className = 'text-md-start';
    nameText.innerHTML = str[i];

    const nameInput = createElem('input');
    if (i < 2) {
      nameInput.type = 'text';
      if (i == 1) {
        nameInput.placeholder = 'minutes';
      }
    } else {
      nameInput.type = 'number';
      nameInput.min = '1';
    }
    nameInput.id = id[i];
    nameInput.className = 'form-control';
    name.appendChild(nameText);
    name.appendChild(nameInput);
    nameTimeContainer.appendChild(name);
  }
  right.appendChild(nameTimeContainer);
}

function createIngred(right) {
  const ingred = createElem('div');
  ingred.className = 'recipe-ingredient';

  const ingredText = createElem('p');
  ingredText.className = 'fw-bold';
  ingredText.innerHTML = '<br />Ingredients';

  const ingredBox = createElem('div');
  ingredBox.className = 'ingred-list';

  const addIngredBtn = createElem('button');
  addIngredBtn.className = 'add-ingred-btn';
  addIngredBtn.onclick = function () {
    document.querySelector('div.ingred-list').appendChild(createIngredInput());
    document
      .querySelector('button.remove-ingred-btn')
      .classList.remove('hidden');
  };
  const addIcon = createElem('i');
  addIcon.className = 'material-icons';
  addIcon.id = 'add-ingred-icon';
  addIcon.innerHTML = 'add';
  const addText = createElem('p');
  addText.className = 'add-ingred-text';
  addText.innerHTML = 'Add New Ingredient';
  addIngredBtn.appendChild(addIcon);
  addIngredBtn.appendChild(addText);

  const removeIngredBtn = createElem('button');
  removeIngredBtn.className = 'hidden remove-ingred-btn';
  removeIngredBtn.onclick = function () {
    let ingredList = document.querySelector('div.ingred-list');
    let ingredItems = document.querySelectorAll('div.ingred-item');
    if (ingredItems.length == 6) {
      document
        .querySelector('button.remove-ingred-btn')
        .classList.add('hidden');
    }
    if (ingredItems.length > 5) {
      ingredList.removeChild(ingredItems[ingredItems.length - 1]);
    }
  };
  const removeIcon = createElem('i');
  removeIcon.className = 'material-icons';
  removeIcon.id = 'remove-ingred-icon';
  removeIcon.innerHTML = 'remove';
  const removeText = createElem('p');
  removeText.className = 'remove-ingred-text';
  removeText.innerHTML = 'Remove Ingredient';
  removeIngredBtn.appendChild(removeIcon);
  removeIngredBtn.appendChild(removeText);

  //default 5.
  for (let i = 0; i < 5; i++) {
    ingredBox.appendChild(createIngredInput());
  }
  ingred.appendChild(ingredText);
  ingred.appendChild(ingredBox);
  ingred.appendChild(addIngredBtn);
  ingred.appendChild(removeIngredBtn);
  right.appendChild(ingred);
}

function createStep(right) {
  const stepContainer = createElem('div');
  stepContainer.className = 'recipe-steps';

  const stepText = createElem('p');
  stepText.className = 'fw-bold';
  stepText.innerHTML = '<br />Steps';

  const stepBox = createElem('div');
  stepBox.className = 'form-floating steps';

  const stepArea = createElem('textarea');
  stepArea.className = 'form-control';
  stepArea.placeholder = 'Step';
  stepArea.id = 'step-input';

  const label = createElem('label');
  label.for = 'step-input';
  label.className = 'text-black-50';
  label.innerHTML = 'Your Steps';

  stepBox.appendChild(stepArea);
  stepBox.appendChild(label);
  stepContainer.appendChild(stepText);
  stepContainer.appendChild(stepBox);
  right.appendChild(stepContainer);
}

function createIngredInput() {
  let unitList = ['unit', '---', 'g', 'oc', 'ml', 'cup', 'tsp', 'tbp'];
  let unitValueList = ['unit', 'no-unit', 'g', 'oc', 'ml', 'cup', 'tsp', 'tbp'];
  let ingredItem = createElem('div');
  ingredItem.className = 'ingred-item';

  let ingredName = createElem('input');
  ingredName.className = 'ingred-name form-control';
  ingredName.type = 'text';
  ingredName.placeholder = 'ingredient name';

  let ingredQuant = createElem('input');
  ingredQuant.type = 'number';
  ingredQuant.min = '0';
  ingredQuant.placeholder = 'quantity';
  ingredQuant.className = 'ingred-quantity form-control';

  let ingredUnitBox = createElem('div');
  ingredUnitBox.className = 'ingredient-units form-floating';
  let unitForm = createElem('form');
  unitForm.id = 'units';
  let unitItems = createElem('select');
  unitItems.className = 'form-select';
  unitItems.id = 'unit-list';

  for (let j = 0; j < unitList.length; j++) {
    let option = createElem('option');
    option.value = unitValueList[j];
    if (j == 0) {
      option.disabled = true;
      option.selected = true;
    }
    option.innerHTML = unitList[j];
    unitItems.appendChild(option);
  }

  unitForm.appendChild(unitItems);
  ingredUnitBox.appendChild(unitForm);
  ingredItem.appendChild(ingredName);
  ingredItem.appendChild(ingredQuant);
  ingredItem.appendChild(ingredUnitBox);

  return ingredItem;
}
