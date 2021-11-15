class Recipe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  set data(data) {
    const style_element = document.createElement("style");
    const styles = `
              a.name {
                  background-color: #FDE79B;
                  position: relative;
                  top: 30px;
                  width: 100%;
                  height: 25px;
                  color: #405262;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-family: 'Roboto', sans-serif;
                  font-weight: bold;
                  text-decoration: none;
              }
              a.img > img{
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
              article{
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
    const recipe = document.createElement("article");
    var recipe_img_link = document.createElement("a");
    var recipe_img = document.createElement("img");
    var recipe_name = document.createElement("a");
    recipe_name.setAttribute("class", "name");
    recipe_img.setAttribute("src", data["image"]);
    recipe_name.setAttribute("href", "");
    recipe_name.textContent = data["name"];
    recipe_img_link.setAttribute("class", "img");
    recipe_img_link.setAttribute("href", "");
    recipe_img_link.appendChild(recipe_img);
    recipe.appendChild(recipe_name);
    recipe.appendChild(recipe_img_link);
    this.shadowRoot.appendChild(style_element);
    this.shadowRoot.appendChild(recipe);
  }
}
customElements.define("recipe-main", Recipe);
const recipe_path = "/source/json/mainpage.json";
const recipe_data = {};
var recipes = undefined;
var recipe_length = 0;
const recipe_ids = [
  "Br6v40acvTTGoMvvdbLLRBPplHF3-97",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-98",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-99",
];
window.addEventListener("DOMContentLoaded", init);
async function init() {
  let fetchSuccessful = await fetch_recipe();
  if (!fetchSuccessful) {
    console.log("Recipe fetch unsuccessful");
    return;
  }
  createRecipeCards();
}

async function fetch_recipe() {
  return new Promise((resolve, reject) => {
    fetch(recipe_path)
      .then((response) => response.json())
      .then(function (data) {
        recipe_data[recipe_path] = data;
        console.log(recipe_data[recipe_path]);
      })
      .then(() => {
        console.log(recipe_data[recipe_path]);
        recipe_length = get(recipe_data[recipe_path], "recipeCount");
        recipes = get(recipe_data[recipe_path], "recipes");
        console.log(recipes);
        console.log(recipes[recipe_ids[0]]);
      })
      .then(() => {
        resolve(true);
      });
  });
}

function createRecipeCards() {
  var cards = [];
  var main = document.querySelector("main");
  for (let i = 0; i < recipe_length; i++) {
    console.log(recipe_length);
    cards.push(document.createElement("recipe-main"));
    cards[i].data = recipes[recipe_ids[i]];
    main.appendChild(cards[i]);
  }
}

function get(object, key) {
  var result;
  Object.keys(object).some(function (key_in_object) {
    if (key_in_object === key) {
      result = object[key_in_object];
      return true;
    }
    if (object[key_in_object] && typeof object[key_in_object] === "object") {
      result = get(object[key_in_object], key);
      return result !== undefined;
    }
  });
  return result;
}
