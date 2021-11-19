function addRecipe() {
  let addBtnIcon = document.getElementById("recipe-card-add-btn");
  addBtnIcon.innerHTML = "favorite";
  addBtnIcon.id = "recipe-card-added-btn";
  document.querySelector("span.my-recipe-label").innerHTML = "My Recipe!";
}
