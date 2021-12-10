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
const APIKEY = '48efb642c0b24eb586a3ba1d81ee738e';
//const storage = firebase.stlet uid;
var user_recipe_data = 'User Recipe Data';
var userID = '';
var single_recipe_info = '';
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

        //TODO: recipesAddedIDs = recipesAddedIDs from firebase;

        //create a greeting box for user
        let greeting = document.createElement('div');
        let cardBody = document.querySelector('div.card-body');
        greeting.className = 'welcome';
        greeting.innerHTML = `<p>Welcome<br />${userSignInEmail}!</p>`;
        cardBody.innerHTML = '';
        cardBody.appendChild(greeting);

        setTimeout(() => {
          window.location.replace('/source/components/main.html');
        }, 2000);
      })
      .catch((error) => {
        // alert(error.message);
        document.querySelector('div.alert').classList.add('show');
      });
  });
}

function logout() {
  auth
    .signOut()
    .then(() => {
      window.location.replace('/index.html');
    })
    .catch((error) => {
      alert(error.message);
    });
}

function checkSignedIn() {
  auth.onAuthStateChanged(function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
      window.location.replace('/source/components/main.html');
    }
  });
}

// createRecipe is the backend function for the Creation of Recipes
async function createRecipe() {
  // checks for authentication persistence
  // needed for every function!!
  // let user = auth.currentUser;
  let uid;
  let imageData;

  auth.onAuthStateChanged(async function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
    }

    try {
      // always make a firebase ref
      let firebaseRef = database.ref();

      // grab variables from the html
      let recipeName = document.getElementById('recipe-name-input').value;
      let recipeBy = document.getElementById('recipe-chief-name-input').value;
      let cookingTime = document.getElementById('recipe-time-input').value;
      let servings = document.getElementById('recipe-servings-input').value;
      let steps = document.getElementById('step-input').value;
      let recipeImage = document.getElementById('img-upload').files[0];

      if (recipeImage == null) {
        imageData = '/source/images/no-img-avail.png';
      } else {
        // call getBase64 to get the base64 of the image
        imageData = await getBase64(recipeImage);
      }

      let ingredients = document.getElementsByClassName('ingred-item');
      let ingredientsName = document.getElementsByClassName('ingred-name');
      let ingredientsQuantity =
        document.getElementsByClassName('ingred-quantity');
      let ingredientsUnit = document.getElementsByClassName('form-select');

      // add ingredients into ingredientsData json
      let ingredientsData = {};
      let tagsData = {};
      for (let i = 0; i < ingredients.length; i++) {
        if (
          ingredientsName[i].value == '' ||
          ingredientsQuantity[i].value == ''
        ) {
          continue;
        }
        let ingredNumber = i + 1;
        let unit =
          ingredientsUnit[i].value === 'unit' ? '' : ingredientsUnit[i].value;
        let val =
          String(ingredientsQuantity[i].value) +
          ' ' +
          String(unit) +
          ' ' +
          String(ingredientsName[i].value);
        ingredientsData['ingredient ' + ingredNumber] = val;
        tagsData['tag ' + ingredNumber] = ingredientsName[i].value;
      }

      // get today's date
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

      // get recipeCount from DB
      const databaseRef = firebaseRef.child(uid).child('recipeCount');
      databaseRef.once('value').then(
        function (snapshot) {
          let recipeCount = snapshot.val();
          let newRecipeCount = recipeCount + 1;

          // the unique recipe
          let uniqueRecipe = String(uid + '-' + newRecipeCount);

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
            image: imageData,
            recipeIngredient: ingredientsData,
            tags: tagsData,
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
  let reader = new FileReader();
  let promise = new Promise((resolve, reject) => {
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
  let uid;
  // if (user != null) {
  //   uid = user.uid;
  // }
  auth.onAuthStateChanged(async function (user) {
    if (user != null) {
      uid = user.uid;
      console.log(uid);
    }

    try {
      let recipeInfoUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=48efb642c0b24eb586a3ba1d81ee738e`;
      let recipeNutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionLabel.png`;

      console.log(recipeNutritionUrl);
      // call fetch to get the recipe information
      const addRecipeInfo = await getRecipeData(recipeInfoUrl);
      console.log(addRecipeInfo);

      let ingredients = addRecipeInfo.extendedIngredients;

      // add ingredients into ingredientsData json and tagsData json
      let ingredientsData = {};
      let tagsData = {};
      for (let i = 0; i < ingredients.length; i++) {
        let ingredNumber = i + 1;
        let val = ingredients[i].original;
        ingredientsData['ingredient ' + ingredNumber] = val;

        let ingredName = ingredients[i].name;
        tagsData['tag ' + ingredNumber] = ingredName;
      }

      let firebaseRef = database.ref();
      // get recipeCount
      let databaseRef = firebaseRef.child(uid).child('recipeCount');
      databaseRef.once('value').then(
        function (snapshot) {
          let recipeCount = snapshot.val();
          let newRecipeCount = recipeCount + 1;

          // the unique recipe
          let uniqueRecipe = String(uid + '-' + newRecipeCount);

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
            tags: tagsData,
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
    let uid;
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
  let uid;
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
    let recipeName = document.getElementById('recipe-name-input').value;
    let recipeBy = document.getElementById('recipe-chief-name-input').value;
    let cookingTime = document.getElementById('recipe-time-input').value;
    let servings = document.getElementById('recipe-servings-input').value;
    let steps = document.getElementById('step-input').value;
    let recipeImage = document.getElementById('img-upload').files[0];
    let imageData = data['image'];
    if (recipeImage != null) {
      imageData = await getBase64(recipeImage);
    }

    let ingredients = document.getElementsByClassName('ingred-item');
    let ingredientsName = document.getElementsByClassName('ingred-name');
    let ingredientsQuantity =
      document.getElementsByClassName('ingred-quantity');
    let ingredientsUnit = document.getElementsByClassName('form-select');

    // add ingredients into ingredientsData json
    let ingredientsData = {};
    for (let i = 0; i < ingredients.length; i++) {
      if (
        ingredientsName[i].value == '' ||
        ingredientsQuantity[i].value == ''
      ) {
        continue;
      }
      let ingredNumber = i + 1;
      let unit =
        ingredientsUnit[i].value === 'unit' ? '' : ingredientsUnit[i].value;
      let val =
        String(ingredientsQuantity[i].value) +
        ' ' +
        String(unit) +
        ' ' +
        String(ingredientsName[i].value);
      ingredientsData['ingredient ' + ingredNumber] = val;
    }
    // backend database operations
    let firebaseRef = database.ref();
    // get today's date
    let today = new Date();
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

async function readUserInfo() {
  return new Promise((resolve, reject) => {
    var uid;
    auth.onAuthStateChanged(function (user) {
      if (user != null) {
        uid = user.uid;
        console.log('uid: ' + uid);
      }

      try {
        fetch(
          `https://eggcellent-330922-default-rtdb.firebaseio.com/${uid}.json`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            userInfo = data;
            userID = uid;
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

function changeColor(btn) {
  if (btn.className.includes('tag-btn')) {
    btn.classList.remove('tag-btn');
    btn.classList.add('tag-selected-btn');
  } else {
    btn.classList.remove('tag-selected-btn');
    btn.classList.add('tag-btn');
  }
}

function changeColorMeal(btn) {
  changeColor(btn);
  let mealDOM = document.getElementById('meal-type');
  let mealCheck = mealDOM.getElementsByClassName('tag-selected-btn');
  for (let i = 0; i < mealCheck.length; i++) {
    if (mealCheck[i] !== btn) {
      mealCheck[i].classList.add('tag-btn');
      mealCheck[i].classList.remove('tag-selected-btn');
    }
  }
}

function changeColorDiet(btn) {
  changeColor(btn);
  let dietDOM = document.getElementById('diet');
  let dietCheck = dietDOM.getElementsByClassName('tag-selected-btn');
  for (let i = 0; i < dietCheck.length; i++) {
    if (dietCheck[i] !== btn) {
      dietCheck[i].classList.add('tag-btn');
      dietCheck[i].classList.remove('tag-selected-btn');
    }
  }
}

function resetSearch() {
  document.getElementById('ingreds-input').value = '';
  document.getElementById('cook-time-input').value = '';
  document.getElementById('calories-input').value = '';
  let btnSelected = document.querySelectorAll('button.tag-selected-btn');
  for (let i = 0; i < btnSelected.length; i++) {
    changeColor(btnSelected[i]);
  }
}

async function searchRecipeByTag() {
  document.querySelector('button.btn-close').click();
  createOverlay();
  showSpinner();
  let path = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100&sort=random&`;
  path = getPathForTag(path);

  console.log(path);

  let done = await getRecipeData(path);
  if (!done) {
    console.log('Recipe fetch unsuccessful');
    return;
  }
  console.log(recipe_data);
  showResultTagCount(Object.keys(recipe_data['results']).length);
  createRecipeResultCards();
}

function getPathForTag(path) {
  let ingreds = document.getElementById('ingreds-input').value;
  let time = document.getElementById('cook-time-input').value;
  let cal = document.getElementById('calories-input').value;

  let mealType = document
    .getElementById('meal-type')
    .querySelector('button.tag-selected-btn');
  let intol = document
    .getElementById('intolerance')
    .querySelectorAll('button.tag-selected-btn');
  let diet = document
    .getElementById('diet')
    .querySelector('button.tag-selected-btn');
  let cuis = document
    .getElementById('cuisine')
    .querySelectorAll('button.tag-selected-btn');

  console.log(ingreds);

  if (ingreds != '') {
    path += `includeIngredients=${ingreds}&`;
  }

  if (time != '') {
    path += `maxReadyTime=${time}&`;
  }

  if (cal != '') {
    path += `maxCalories=${cal}&`;
  }

  if (mealType !== null) {
    path += `type=${mealType.innerText}&`;
  }

  if (intol.length !== 0) {
    path += `intolerances=`;
    for (let i = 0; i < intol.length; i++) {
      if (i != 0) {
        path += ',';
      }
      path += `${intol[i].innerText}`;
    }
    path += '&';
  }

  if (diet !== null) {
    path += `diet=${diet.innerText}&`;
  }

  if (cuis.length !== 0) {
    path += `cuisine=`;
    for (let i = 0; i < cuis.length; i++) {
      if (i != 0) {
        path += ',';
      }
      path += `${cuis[i].innerText}`;
    }
  }
  return path;
}

async function searchRecipeByName() {
  createOverlay();
  showSpinner();
  let name = document.getElementById('search-by-name').value;
  document.getElementById('search-by-name').value = '';
  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${name}&addRecipeInformation=true&number=100`;
  let fetchSuccessful = await getRecipeData(url);
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  }
  showResultCounts(name, Object.keys(recipe_data['results']).length);
  createRecipeResultCards();
}

async function createRecipeResultCards() {
  var cards = [];
  let recipes_set = recipe_data['results'];
  var main = document.querySelector('main');
  for (let i = 0; i < recipes_set.length; i++) {
    cards.push(document.createElement('recipe-main'));
    cards[i].data = recipes_set[i];
    main.appendChild(cards[i]);
  }
  removeSpinner();
  removeOverlay();
}

async function getRecipeInfoById(id) {
  let path = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}&includeNutrition=false`;
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((response) => response.json())
      .then(function (data) {
        single_recipe_info = data;
      })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(true);
      });
  });
}

function resetResultDisplay() {
  let resSec = document.querySelector('section.result-count');
  if (resSec != undefined) {
    document.querySelector('main').removeChild(resSec);
  }

  let recipeCards = document.querySelectorAll('recipe-main');
  for (let i = 0; i < recipeCards.length; i++) {
    document.querySelector('main').removeChild(recipeCards[i]);
  }
}

function showResultCounts(name, count) {
  resetResultDisplay();
  const resultSec = document.createElement('section');
  resultSec.className = 'result-count';
  resultSec.innerHTML = `
  <p class="result-text">Search ${name}: ${count} Results</p>
  `;
  document.querySelector('main').appendChild(resultSec);
}

function showResultTagCount(count) {
  resetResultDisplay();
  const resultSec = document.createElement('section');
  resultSec.className = 'result-count';
  resultSec.innerHTML = `
  <p class="result-text">Search By Categories: ${count} Results</p>
  `;
  document.querySelector('main').appendChild(resultSec);
}

function showSpinner() {
  const spin = document.createElement('div');
  spin.id = 'spinner';
  const spinSelf = document.createElement('div');
  spinSelf.className = 'spinner-border text-warning';
  spinSelf.role = 'status';
  const cont = document.createElement('span');
  cont.className = 'visually-hidden';
  cont.innerText = 'Loading...';
  spinSelf.appendChild(cont);
  spin.appendChild(spinSelf);
  document.querySelector('html').appendChild(spin);
}

function removeSpinner() {
  document
    .querySelector('html')
    .removeChild(document.getElementById('spinner'));
}

function removeOverlay() {
  document
    .querySelector('html')
    .removeChild(document.getElementById('overlay'));
}

function createOverlay() {
  //generate background overlay
  const overlay = document.createElement('section');
  const styleElem = document.createElement('style');
  const overlayStyle = `
    #overlay {
        position: fixed; 
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.61);
        z-index: 2;
    }`;
  overlay.id = 'overlay';
  styleElem.innerHTML = overlayStyle;
  overlay.appendChild(styleElem);
  document.querySelector('html').appendChild(overlay);
}
