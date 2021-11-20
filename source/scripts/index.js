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
// const analytics = getAnalytics(app);

function signUp() {
  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("pass").value;
  var userName = document.getElementById("name").value;
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
      firebaseRef.child("users").child(uid).child("details").set(data);
      window.location.replace("home.html");
      alert("Successful Sign Up");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signIn() {
  var userSignInEmail = document.getElementById("email").value;
  var userSignInPassword = document.getElementById("pass").value;

  auth
    .signInWithEmailAndPassword(userSignInEmail, userSignInPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      var uid = user.uid;
      window.location.replace("home.html");
      alert("Successful Sign In");
    })
    .catch((error) => {
      alert(error.message);
    });
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
      method: "DELETE",
    }
  ).then((response) => {
    // The request was processed by firebase, maybe deleted.
    if (response.ok) {
      return response.json();
    } else {
      // This will only evaluate if there's an actual failure in the request.
      console.warn("Something went wrong.", response.status);
      return Promise.reject(response);
    }
  });
}
