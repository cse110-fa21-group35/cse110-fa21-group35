// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCyQBFFbQy91cc2AFG6BkiujWnfTRHpPY4",
  authDomain: "eggcellent-330922.firebaseapp.com",
  databaseURL: "https://eggcellent-330922-default-rtdb.firebaseio.com",
  projectId: "eggcellent-330922",
  storageBucket: "eggcellent-330922.appspot.com",
  messagingSenderId: "414068879028",
  appId: "1:414068879028:web:e3a4c41269fef85adc31e1",
  measurementId: "G-V754KJ2NXG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const database = getDatabase();
const auth = firebase.auth();
const database = firebase.database();
//const storage = firebase.storage();
// const analytics = getAnalytics(app);

var uid = 0;

function signUp() {
  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("pass").value;
  var userName = document.getElementById("name").value;

  // Try to Sign Up
  auth
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      var firebaseRef = database.ref();
      data = {
        name: userName,
        email: userEmail,
        recipeCount: 0,
      };

      // push to DB
      firebaseRef.child(uid).set(data);

      window.location.replace("../components/recipe_create.html");
      alert("Successful Sign Up");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signIn() {
  var uid;
  var userSignInEmail = document.getElementById("email").value;
  var userSignInPassword = document.getElementById("pass").value;

  // Try Sign In
  auth
    .signInWithEmailAndPassword(userSignInEmail, userSignInPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      uid = user.uid;
      window.location.replace("../components/recipe_create.html");
      alert("Successful Sign In");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// createRecipe is the backend function for the Creation of Recipes
function createRecipe() {
  // checks for authentication persistence
  let user = auth.currentUser;
  var uid;
  if (user != null) {
    uid = user.uid;
  }

  try {
    var firebaseRef = database.ref();

    var recipeName = document.getElementById("recipe-name-input").value;
    var recipeBy = document.getElementById("recipe-chief-name-input").value;
    var cookingTime = document.getElementById("recipe-time-input").value;
    var servings = document.getElementById("recipe-servings-input").value;
    var steps = document.getElementById("step-input").value;
    //var file = document.getElementById("file-input").files[0];

    var ingredients = document.getElementsByClassName("ingred-item");
    var ingredientsName = document.getElementsByClassName("ingred-name");
    var ingredientsQuantity =
      document.getElementsByClassName("ingred-quantity");
    var ingredientsUnit = document.getElementsByClassName("ingred-units");

    var ingredientsData = {};
    console.log(ingredients.length);
    for (let i = 0; i < ingredients.length; i++) {
      var ingredNumber = i + 1;
      console.log(ingredientsQuantity[i].value);
      console.log(ingredientsUnit[i].value);
      console.log(ingredientsName[i].value);
      var val =
        String(ingredientsQuantity[i].value) +
        String(ingredientsUnit[i].value) +
        " " +
        String(ingredientsName[i].value);
      ingredientsData["ingredient " + ingredNumber] = val;
    }

    // get today's date
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    // get recipeCount
    var databaseRef = firebaseRef.child(uid).child("recipeCount");
    databaseRef.once("value").then(
      function (snapshot) {
        var recipeCount = snapshot.val();
        var newRecipeCount = recipeCount + 1;

        // the unique recipe
        var uniqueRecipe = String(uid + "-" + newRecipeCount);

        // set the new recipeCount
        firebaseRef.child(uid).child("recipeCount").set(newRecipeCount);

        // Recipe Data information to push to database
        recipeData = {
          public: false,
          "@context": "https://schema.org",
          "@type": "Recipe",
          author: recipeBy,
          cookTime: cookingTime,
          datePublished: date,
          // todo: add description
          description: "",
          // todo: fix the image link
          image: "",
          recipeIngredient: ingredientsData,
          name: recipeName,
          // todo: add nutrition
          // "nutrition": {
          //   "@type": "NutritionInformation",
          //   "calories": "1200 calories",
          //   "carbohydrateContent": "12 carbs",
          //   "proteinContent": "9 grams of protein",
          //   "fatContent": "9 grams fat"
          // },
          prepTime: "",
          recipeInstructions: steps,
          recipeYield: servings,
        };

        // push to DB
        firebaseRef
          .child(uid)
          .child("recipes")
          .child(uniqueRecipe)
          .set(recipeData);
        alert("Successfully Created Recipe");
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );
  } catch (error) {
    alert(error.message);
  }
}
function editRecipe(recipeId, recipeInfo) {
  // checks for authentication persistence
  let user = auth.currentUser;
  var uid;
  if (user != null) {
    uid = user.uid;
  }
  // frontend element parsing
  let name = document.getElementById("recipe-name-input");
  let author = document.getElementById("recipe-chief-name-input");
  let time = document.getElementById("recipe-time-input");
  let serving = document.getElementById("recipe-servings-input");
  let ingredients_name = document.getElementsByClassName("ingred-name");
  let ingredients_amount = document.getElementsByClassName("ingred-quantity");
  let ingredients_unit = document.getElementsByClassName("ingred-units");
  let steps = document.getElementById("step-input");
  recipeInfo["name"] = name.value;
  recipeInfo["author"] = author.value;
  recipeInfo["cooking-time"] = time.value;
  recipeInfo["serving"] = serving.value;
  let ingre_list = recipeInfo["ingredients"];
  var ingredientsData = {};
  for (let i = 0; i < ingre_list.length; i++) {
    let ingredients_item = ingre_list[i];
    ingredients_item["name"] = ingredients_name[i].value;
    ingredients_item["amount"] = ingredients_amount[i].value;
    ingredients_item["unit"] = ingredients_unit[i].value;
    var val =
      String(ingredients_item.value) +
      String(ingredients_item.value) +
      " " +
      String(ingredients_item.value);
    ingredientsData["ingredient " + i] = val;
  }
  recipeInfo["steps"] = steps.value;
  console.log(recipeInfo);

  // backend database operations
  var firebaseRef = database.ref(); // get today's date
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  // Recipe Data information to push to database
  let recipeData = {
    public: false,
    "@context": "https://schema.org",
    "@type": "Recipe",
    author: recipeInfo["author"],
    cookTime: recipeInfo["cooking-time"],
    datePublished: date,
    // todo: add description
    description: "",
    // todo: fix the image link
    image: "",
    recipeIngredient: ingredientsData,
    name: recipeInfo["name"],
    // todo: add nutrition
    // "nutrition": {
    //   "@type": "NutritionInformation",
    //   "calories": "1200 calories",
    //   "carbohydrateContent": "12 carbs",
    //   "proteinContent": "9 grams of protein",
    //   "fatContent": "9 grams fat"
    // },
    prepTime: "",
    recipeInstructions: recipeInfo["steps"],
    recipeYield: ["serving"],
  };
  console.log(recipeData);
  // try {
  //   fetch(
  //     `https://eggcellent-330922-default-rtdb.firebaseio.com/${uid}/recipes/${recipeId}.json`,
  //     {
  //       method: PUT,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data)
  //     }
  //   )
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json;
  //       } else {
  //         return Promise.reject(response);
  //       }
  //     })
  // } catch (error) {
  //   alert(error.message);
  // }
  try {
    // push to DB
    firebaseRef.child(uid).child("recipes").child(recipeId).set(recipeData);
    alert("Successfully Update Recipe");
  } catch (error) {
    alert(error.message);
  }
}
