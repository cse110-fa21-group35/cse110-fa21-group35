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
