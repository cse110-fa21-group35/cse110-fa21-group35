/* eslint-disable */
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCyQBFFbQy91cc2AFG6BkiujWnfTRHpPY4',
  authDomain: 'eggcellent-330922.firebaseapp.com',
  databaseURL: 'https://eggcellent-330922-default-rtdb.firebaseio.com',
  projectId: 'eggcellent-330922',
  storageBucket: 'eggcellent-330922.appspot.com',
  messagingSenderId: '414068879028',
  appId: '1:414068879028:web:e3a4c41269fef85adc31e1',
  measurementId: 'G-V754KJ2NXG',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const database = getDatabase();
const auth = firebase.auth();
const database = firebase.database();
// const analytics = getAnalytics(app);

function signUp() {
  let userEmail = document.getElementById('email').value;
  let userPassword = document.getElementById('pass').value;
  let userName = document.getElementById('name').value;
  let passwordConfirm = document.getElementById('passConf').value;

  //ensure password === confirm password
  if (userPassword !== passwordConfirm) {
    document.querySelector('div.alert').classList.add('show');
    return;
  }

  auth
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      let uid;
      if (user != null) {
        uid = user.uid;
      }
      let firebaseRef = database.ref();
      data = {
        Name: userName,
        Email: userEmail,
      };
      firebaseRef.child('users').child(uid).child('details').set(data);
      let greeting = document.createElement('div');
      let cardBody = document.querySelector('div.card-body');
      greeting.className = 'welcome';
      greeting.innerHTML = `<p>Successfully Signed Up!</p>`;
      cardBody.innerHTML = '';
      cardBody.appendChild(greeting);

      setTimeout(() => {
        window.location.replace('/source/components/signin.html');
      }, 2000);
      // alert('Successful Sign Up');
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signIn() {
  let userSignInEmail = document.getElementById('email').value;
  let userSignInPassword = document.getElementById('pass').value;

  auth
    .signInWithEmailAndPassword(userSignInEmail, userSignInPassword)
    .then(() => {
      // alert('Successful Sign In');
      //create a greeting box for user
      let greeting = document.createElement('div');
      let cardBody = document.querySelector('div.card-body');
      greeting.className = 'welcome';
      greeting.innerHTML = `<p>Welcome<br />${userSignInEmail}!</p>`;
      cardBody.innerHTML = '';
      cardBody.appendChild(greeting);

      setTimeout(() => {
        window.location.replace('/index.html');
      }, 2000);
    })
    .catch((error) => {
      // alert(error.message);
      document.querySelector('div.alert').classList.add('show');
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

    var recipeName = document.getElementById('recipe-name-input').value;
    var recipeBy = document.getElementById('recipe-chief-name-input').value;
    var cookingTime = document.getElementById('recipe-time-input').value;
    var servings = document.getElementById('recipe-servings-input').value;
    var ingredients = document.getElementById('ingred-input').value;
    var steps = document.getElementById('step-input').value;
    var file = document.getElementById('file-input').files[0];

    // get today's date
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    // get recipeCount
    var databaseRef = firebaseRef.child(uid).child('recipeCount');
    databaseRef.once('value').then(
      function (snapshot) {
        var recipeCount = snapshot.val();
        var newRecipeCount = recipeCount + 1;

        // the unique recipe
        var uniqueRecipe = String(uid + '-' + newRecipeCount);

        // set the new recipeCount
        firebaseRef.child(uid).child('recipeCount').set(newRecipeCount);

        // Recipe Data information to push to database
        recipeData = {
          public: false,
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          author: recipeBy,
          cookTime: cookingTime,
          datePublished: date,
          // todo: add description
          description: '',
          // todo: fix the image link
          image: '',
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
          prepTime: '',
          recipeInstructions: steps,
          recipeYield: servings,
        };

        // push to DB
        firebaseRef
          .child(uid)
          .child('recipes')
          .child(uniqueRecipe)
          .set(recipeData);
        alert('Successfully Created Recipe');
      },
      function (error) {
        console.log('Error: ' + error.code);
      }
    );
  } catch (error) {
    alert(error.message);
  }
}

function deleteRecipe(recipeId) {
  //obtain userId
  let user = auth.currentUser;
  if (user != null) {
    var userId = user.uid;
  }
  //issue delete to the desired recipeId under the userId.
  fetch(
    `https://eggcellent-330922-default-rtdb.firebaseio.com/${userId}/recipes/${recipeId}.json`,
    {
      method: 'DELETE',
    }
  ).then((response) => {
    // The request was processed by firebase, maybe deleted.
    if (response.ok) {
      return response.json();
    } else {
      // This will only evaluate if there's an actual failure in the request.
      console.warn('Something went wrong.', response.status);
      return Promise.reject(response);
    }
  });
}
/* eslint-enable */
