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
const storage = firebase.storage();
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

      window.location.replace("../components/template_1.html");
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
      window.location.replace("../components/template_1.html");
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
    var ingredients = document.getElementById("ingred-input").value;
    var steps = document.getElementById("step-input").value;
    var file = document.getElementById("file-input").files[0];

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
          recipeIngredient: ingredients,
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
