/* eslint-disable */

function addRecipe() {
  let addBtnIcon = document.querySelector('#recipe-card-add-btn');
  if (addBtnIcon != null) {
    addBtnIcon.innerHTML = 'favorite';
    addBtnIcon.id = 'recipe-card-added-btn';
    document.querySelector('span.my-recipe-label').innerHTML = 'My Recipe!';
  } else {
    addBtnIcon = document.querySelector('#recipe-card-added-btn');
    addBtnIcon.innerHTML = 'favorite_border';
    addBtnIcon.id = 'recipe-card-add-btn';
    document.querySelector('span.my-recipe-label').innerHTML =
      'Add to My Recipe';
  }
}

/** For recipes in My Recipe page
 * //edit btn
  const editBtn = document.createElement("button");
  editBtn.className = "edit-recipe-btn btns";
  const editIcon = document.createElement("i");
  // editBtn.onclick = editRecipe();
  editIcon.id = "recipe-card-edit-btn";
  editIcon.className = "material-icons";
  editIcon.innerHTML = "edit";
  const editText = document.createElement("span");
  editText.className = "header-label";
  editText.innerHTML = "Edit";
  editBtn.appendChild(editIcon);
  editBtn.appendChild(editText);

  //delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-recipe-btn btns";
  // deleteBtn.onclick = deleteRecipe();
  const deleteIcon = document.createElement("i");
  deleteIcon.id = "recipe-card-delete-btn";
  deleteIcon.className = "material-icons";
  deleteIcon.innerHTML = "delete";
  const delText = document.createElement("span");
  delText.className = "header-label";
  delText.innerHTML = "Delete";
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.appendChild(delText);

  headerSpan.appendChild(editBtn);
  headerSpan.appendChild(deleteBtn);
 */
/* eslint-onable */
