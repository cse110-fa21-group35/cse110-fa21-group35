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
let uid;
//const storage = firebase.storage();
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

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then((_) => {
    auth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
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
          window.location.replace('/source/components/index.html');
        }, 2000);
        // alert('Successful Sign Up');
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

function signIn() {
  let userSignInEmail = document.getElementById('email').value;
  let userSignInPassword = document.getElementById('pass').value;

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then((_) => {
    auth
      .signInWithEmailAndPassword(userSignInEmail, userSignInPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user != null) {
          uid = user.uid;
          console.log(uid);
        }
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
  });
}

// createRecipe is the backend function for the Creation of Recipes
function createRecipe() {
  // checks for authentication persistence
  // let user = auth.currentUser;
  var uid;
  // if (user != null) {
  //   uid = user.uid;
  // }

  auth.onAuthStateChanged(function (user) {
    if (user != null) {
      uid = user.uid;
      console.log('uid: ' + uid);
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
  });
}

async function addToMyRecipe(url) {
  // checks for authentication persistence
  // let user = auth.currentUser;
  var uid;
  // if (user != null) {
  //   uid = user.uid;
  // }
  auth.onAuthStateChanged(async function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
    }

    try {
      var recipeUrl = url;

      // call fetch to get the recipe information
      const addRecipeInfo = await getRecipeData(recipeUrl);
      console.log(addRecipeInfo);

      var ingredients = addRecipeInfo.extendedIngredients;

      // add ingredients into ingredientsData json
      var ingredientsData = {};
      for (let i = 0; i < ingredients.length; i++) {
        var ingredNumber = i + 1;
        var val = ingredients[i].original;
        ingredientsData['ingredient ' + ingredNumber] = val;
      }

      var firebaseRef = database.ref();
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
            createdByUser: false,
            public: false,
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            author: addRecipeInfo.sourceName,
            cookTime: addRecipeInfo.readyInMinutes,
            datePublished: '',
            // todo: add description
            description: '',
            image: addRecipeInfo.image,
            recipeIngredient: ingredientsData,
            name: addRecipeInfo.title,
            // todo: add nutrition
            // "nutrition": {
            //   "@type": "NutritionInformation",
            //   "calories": "1200 calories",
            //   "carbohydrateContent": "12 carbs",
            //   "proteinContent": "9 grams of protein",
            //   "fatContent": "9 grams fat"
            // },
            prepTime: '',
            recipeInstructions: addRecipeInfo.instructions,
            recipeYield: addRecipeInfo.servings,
          };

          // push to DB
          firebaseRef
            .child(uid)
            .child('recipes')
            .child(uniqueRecipe)
            .set(recipeData);
          alert('Successfully Added Recipe');
        },
        function (error) {
          console.log('Error: ' + error.code);
        }
      );
    } catch (error) {
      alert(error.message);
    }
  });
}

//TODO: Working on it - by Jiawen
function readRecipe() {
  // let user = auth.currentUser;
  var uid;
  // console.log(user);
  auth.onAuthStateChanged(function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
    }
    try {
      var firebaseRef = database.ref();
      // get recipeCount
      var databaseRef = firebaseRef.child(uid).child('recipeCount');
      var recipesRef = firebaseRef.child(uid).child('recipes');
      console.log(uid);
      console.log(databaseRef);
      console.log(recipesRef);
      console.log('here');
    } catch (error) {
      alert(error.message);
    }
  });
}

function editRecipe(recipeId, recipeInfo) {
  // checks for authentication persistence
  // let user = auth.currentUser;
  var uid;
  // if (user != null) {
  //   uid = user.uid;
  // }

  auth.onAuthStateChanged(function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
    }
    // frontend element parsing
    let name = document.getElementById('recipe-name-input');
    let author = document.getElementById('recipe-chief-name-input');
    let time = document.getElementById('recipe-time-input');
    let serving = document.getElementById('recipe-servings-input');
    let ingredients_name = document.getElementsByClassName('ingred-name');
    let ingredients_amount = document.getElementsByClassName('ingred-quantity');
    let ingredients_unit = document.getElementsByClassName('ingred-units');
    let steps = document.getElementById('step-input');
    recipeInfo['name'] = name.value;
    recipeInfo['author'] = author.value;
    recipeInfo['cooking-time'] = time.value;
    recipeInfo['serving'] = serving.value;
    let ingre_list = recipeInfo['ingredients'];
    var ingredientsData = {};
    for (let i = 0; i < ingre_list.length; i++) {
      let ingredients_item = ingre_list[i];
      ingredients_item['name'] = ingredients_name[i].value;
      ingredients_item['amount'] = ingredients_amount[i].value;
      ingredients_item['unit'] = ingredients_unit[i].value;
      var val =
        String(ingredients_item.value) +
        String(ingredients_item.value) +
        ' ' +
        String(ingredients_item.value);
      ingredientsData['ingredient ' + i] = val;
    }
    recipeInfo['steps'] = steps.value;
    console.log(recipeInfo);

    // backend database operations
    var firebaseRef = database.ref(); // get today's date
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    // Recipe Data information to push to database
    let recipeData = {
      public: false,
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      author: recipeInfo['author'],
      cookTime: recipeInfo['cooking-time'],
      datePublished: date,
      // todo: add description
      description: '',
      // todo: fix the image link
      image: '',
      recipeIngredient: ingredientsData,
      name: recipeInfo['name'],
      // todo: add nutrition
      // "nutrition": {
      //   "@type": "NutritionInformation",
      //   "calories": "1200 calories",
      //   "carbohydrateContent": "12 carbs",
      //   "proteinContent": "9 grams of protein",
      //   "fatContent": "9 grams fat"
      // },
      prepTime: '',
      recipeInstructions: recipeInfo['steps'],
      recipeYield: ['serving'],
    };
    console.log(recipeData);
    try {
      // push to DB
      firebaseRef.child(uid).child('recipes').child(recipeId).set(recipeData);
      alert('Successfully Update Recipe');
    } catch (error) {
      alert(error.message);
    }
  });
}

function getRecipeData(url) {
  var promise = new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then(function (data) {
        recipe_data = data;
        console.log(recipe_data);
      })
      .then(() => {
        resolve(recipe_data);
      });
  });
  return promise;
}

function deleteRecipe(recipeId) {
  //obtain userId
  // let user = auth.currentUser;
  // if (user != null) {
  //   var userId = user.uid;
  // }
  var uid;

  auth.onAuthStateChanged(function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
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
  });
}
/* eslint-enable */
