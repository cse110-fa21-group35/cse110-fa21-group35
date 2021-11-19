class Recipe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  set data(data) {
    // creating CSS style element for each recipe element
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

    // creating a recipe cutomized object
    const recipe = document.createElement("article");

    // creating recipe name element for recipe
    let recipe_name = document.createElement("a");
    recipe_name.setAttribute("class", "name");
    recipe_name.setAttribute("href", "");
    recipe_name.textContent = data["name"];
    recipe.appendChild(recipe_name);

    // creating image element for recipe
    let recipe_img_link = document.createElement("a");
    let recipe_img = document.createElement("img");
    recipe_img.setAttribute("src", data["image"]);
    recipe_img_link.setAttribute("class", "img");
    recipe_img_link.setAttribute("href", "");
    recipe_img_link.appendChild(recipe_img);
    recipe.appendChild(recipe_img_link);

    // adding customized recipe and CSS style to main
    this.shadowRoot.appendChild(style_element);
    this.shadowRoot.appendChild(recipe);
  }
}

// define a recipe-main element
customElements.define("recipe-main", Recipe);

// path of json of main page
const recipe_path = "source/json/mainpage.json";

// we store the data of recipe temporary in object
const recipe_data = {};
var recipes = undefined;

// how many recipes (read from Json)
var recipe_length = 0;

// manually set the id of mainpage recipe - may change to automatical fetching id later
const recipe_ids = [
  "Br6v40acvTTGoMvvdbLLRBPplHF3-97",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-98",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-99",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-100",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-101",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-102",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-103",
  "Br6v40acvTTGoMvvdbLLRBPplHF3-104",
];

// eventlistener here
window.addEventListener("DOMContentLoaded", init);

// starting here
async function init() {
  let fetchSuccessful = await fetch_recipe();
  if (!fetchSuccessful) {
    console.log("Recipe fetch unsuccessful");
    return;
  }
  fetchCall();
  createRecipeCards();
}

// reading the json data and store it in object array
// recipes data will be stored in "recipes"
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

async function fetchCall() {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=48efb642c0b24eb586a3ba1d81ee738e&number=3`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //process data to parse them in recipe content card
        console.log(data);
      })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(true);
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

// helper function to get the data from nested object with key input
// some logic comes from the lab content
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
