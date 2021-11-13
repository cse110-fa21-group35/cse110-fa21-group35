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

var uid = int(0);

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
        Name: userName,
        Email: userEmail,
      };

      // push to DB
      firebaseRef.child("users").child(uid).child("details").set(data);

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

  var recipeName = document.getElementById("recipe-name-input").value;
  var recipeBy = document.getElementById("recipe-chief-name-input").value;
  var cookingTime = document.getElementById("recipe-time-input").value;
  var servings = document.getElementById("recipe-servings-input").value;
  var ingredients = document.getElementById("ingred-input").value;
  var steps = document.getElementById("step-input").value;
  // var photo = document.getElementById('file-input').value;

  // var picture = str(photo);
  // var link;

  // if (picture == "<FileStorage: '' ('application/octet-stream')>") {
  //     link = "";
  // }
  // else {
  //   storage.child("images/" + picture).put(photo)
  //   link = storage.child('images/' + picture).get_url(None)
  // }

  var firebaseRef = database.ref();
  data = {
    "Recipe Name": recipeName,
    "Recipe By": recipeBy,
    "Cooking Time": cookingTime,
    Servings: servings,
    Ingredients: ingredients,
    Steps: steps,
    // "Recipe Image": link,
  };

  // push to DB
  try {
    firebaseRef
      .child("users")
      .child(uid)
      .child("recipes")
      .child(recipeName)
      .set(data);
    alert("Successfully Created Recipe");
  } catch (error) {
    alert(error.message);
  }
}
