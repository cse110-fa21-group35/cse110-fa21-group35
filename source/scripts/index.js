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
//const storage = firebase.stlet uid;
var user_recipe_data = 'User Recipe Data';
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
          name: userName,
          email: userEmail,
          recipeCount: 0,
        };
        firebaseRef.child(uid).set(data);
        let greeting = document.createElement('div');
        let cardBody = document.querySelector('div.card-body');
        greeting.className = 'welcome';
        greeting.innerHTML = `<p>Successfully Signed Up!</p>`;
        cardBody.innerHTML = '';
        cardBody.appendChild(greeting);

        setTimeout(() => {
          window.location.replace('/index.html');
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
async function createRecipe() {
  // checks for authentication persistence
  // needed for every function!!
  // let user = auth.currentUser;
  var uid;

  auth.onAuthStateChanged(async function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
    }

    try {
      // always make a firebase ref
      var firebaseRef = database.ref();

      // grab variables from the html
      var recipeName = document.getElementById('recipe-name-input').value;
      var recipeBy = document.getElementById('recipe-chief-name-input').value;
      var cookingTime = document.getElementById('recipe-time-input').value;
      var servings = document.getElementById('recipe-servings-input').value;
      var steps = document.getElementById('step-input').value;
      var recipeImage = document.getElementById('img-upload').files[0];

      if (recipeImage == null) {
        var imageData = '/source/images/no-img-avail.png';
      } else {
        // call getBase64 to get the base64 of the image
        var imageData = await getBase64(recipeImage);
      }

      var ingredients = document.getElementsByClassName('ingred-item');
      var ingredientsName = document.getElementsByClassName('ingred-name');
      var ingredientsQuantity =
        document.getElementsByClassName('ingred-quantity');
      var ingredientsUnit = document.getElementsByClassName('form-select');

      // add ingredients into ingredientsData json
      var ingredientsData = {};
      for (let i = 0; i < ingredients.length; i++) {
        if (
          ingredientsName[i].value == '' ||
          ingredientsQuantity[i].value == ''
        ) {
          continue;
        }
        var ingredNumber = i + 1;
        var unit =
          ingredientsUnit[i].value === 'unit' ? '' : ingredientsUnit[i].value;
        var val =
          String(ingredientsQuantity[i].value) +
          ' ' +
          String(unit) +
          ' ' +
          String(ingredientsName[i].value);
        ingredientsData['ingredient ' + ingredNumber] = val;
      }

      // get today's date
      var today = new Date();
      var date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

      // get recipeCount from DB
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
            createdByUser: true,
            public: false,
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            author: recipeBy,
            cookTime: cookingTime,
            datePublished: date,
            // todo: add description
            description: '',
            // todo: fix the image link
            image: imageData,
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
          window.location.replace('../components/my_recipes.html');
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

// converts image to base64
function getBase64(file) {
  var reader = new FileReader();
  var promise = new Promise((resolve, reject) => {
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
  return promise;
}

async function addToMyRecipe(id) {
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
      var recipeInfoUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=48efb642c0b24eb586a3ba1d81ee738e`;
      var recipeNutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionLabel.png`;

      console.log(recipeNutritionUrl);
      // call fetch to get the recipe information
      const addRecipeInfo = await getRecipeData(recipeInfoUrl);
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
            nutrition: {
              nutritionImage: recipeNutritionUrl,
            },
            sourceUrl: addRecipeInfo.sourceUrl,
            sourceID: addRecipeInfo.id,
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

async function readRecipe() {
  return new Promise((resolve, reject) => {
    var uid;
    auth.onAuthStateChanged(function (user) {
      if (user != null) {
        uid = user.uid;
        console.log('uid: ' + uid);
      }

      try {
        fetch(
          `https://eggcellent-330922-default-rtdb.firebaseio.com/${uid}/recipes.json`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            user_recipe_data = data;
          })
          .then(() => {
            resolve(true);
          });
      } catch (error) {
        alert(error.message);
        return reject(true);
      }
    });
  });
}

async function editRecipe(recipeId, data) {
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
    // frontend element parsing

    // grab variables from the html
    var recipeName = document.getElementById('recipe-name-input').value;
    var recipeBy = document.getElementById('recipe-chief-name-input').value;
    var cookingTime = document.getElementById('recipe-time-input').value;
    var servings = document.getElementById('recipe-servings-input').value;
    var steps = document.getElementById('step-input').value;
    var recipeImage = document.getElementById('img-upload').files[0];

    if (recipeImage == null) {
      var imageData = data['image'];
    } else {
      // call getBase64 to get the base64 of the image
      var imageData = await getBase64(recipeImage);
    }

    var ingredients = document.getElementsByClassName('ingred-item');
    var ingredientsName = document.getElementsByClassName('ingred-name');
    var ingredientsQuantity =
      document.getElementsByClassName('ingred-quantity');
    var ingredientsUnit = document.getElementsByClassName('form-select');

    // add ingredients into ingredientsData json
    var ingredientsData = {};
    for (let i = 0; i < ingredients.length; i++) {
      if (
        ingredientsName[i].value == '' ||
        ingredientsQuantity[i].value == ''
      ) {
        continue;
      }
      var ingredNumber = i + 1;
      var unit =
        ingredientsUnit[i].value === 'unit' ? '' : ingredientsUnit[i].value;
      var val =
        String(ingredientsQuantity[i].value) +
        ' ' +
        String(unit) +
        ' ' +
        String(ingredientsName[i].value);
      ingredientsData['ingredient ' + ingredNumber] = val;
    }
    // backend database operations
    var firebaseRef = database.ref();
    // get today's date
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    // Recipe Data information to push to database
    let recipeData = {
      createdByUser: true,
      public: false,
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      author: recipeBy,
      cookTime: cookingTime,
      datePublished: date,
      // todo: add description
      description: '',
      // todo: fix the image link
      image: imageData,
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
      prepTime: '',
      recipeInstructions: steps,
      recipeYield: servings,
    };
    console.log(recipeData);
    try {
      // push to DB
      firebaseRef.child(uid).child('recipes').child(recipeId).set(recipeData);
      alert('Successfully Update Recipe');
      window.location.replace('../components/my_recipes.html');
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
      `https://eggcellent-330922-default-rtdb.firebaseio.com/${uid}/recipes/${recipeId}.json`,
      {
        method: 'DELETE',
      }
    ).then((response) => {
      // The request was processed by firebase, maybe deleted.
      if (response.ok) {
        alert('Successfully deleted recipe');
        location.reload();
        return response.json();
      } else {
        // This will only evaluate if there's an actual failure in the request.
        console.warn('Something went wrong.', response.status);
        return Promise.reject(response);
      }
    });
  });
}
