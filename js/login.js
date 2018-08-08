// Initialize Firebase
var config = {
     apiKey: API_KEY,
     authDomain: "camionsmessaging.firebaseapp.com",
     databaseURL: "https://camionsmessaging.firebaseio.com",
     projectId: "camionsmessaging",
     storageBucket: "",
     messagingSenderId: "187248752903"
};
firebase.initializeApp(config);
//Getting firebase reference
var usersRef = firebase.database().ref("users");
var currentUser = null;

//Getting variables
var  loginBtn = document.getElementById("login"),
     signUpBtn = document.getElementById("signUp"),
     signEmailInput = document.getElementById("signEmail"),
     signPasswordInput = document.getElementById("signPassword"),
     loginError = document.getElementById("loginError");

//LOGIN LOGIC
loginBtn.addEventListener("click",()=>{
     firebase.auth().signInWithEmailAndPassword(signEmailInput.value, signPasswordInput.value).catch(function(error) {
         var err = ''
         if (error.code === 'auth/wrong-password') {
             err = 'Wrong password.';
         } else {
             err = error.message;
         }
         loginError.innerHTML = err;
         loginError.innerHTML+= "<br> <strong>Or</strong> you can sign up";
         loginError.classList.remove("d-none");
     });
 });
 //SIGN UP LOGIC
 signUpBtn.addEventListener("click",()=>{
     firebase.auth().createUserWithEmailAndPassword(signEmailInput.value, signPasswordInput.value)
     .then((user)=>{
         if(!loginError.classList.contains("d-none")){
             loginError.classList.add("d-none");
         }
         currentUser = user.user;
         usersRef.child(user.user.uid).set({
             "email":user.user.email,
             "connected":true
         });
     })
     .catch(function(error) {
         var errorMessage = error.message;
         loginError.innerHTML = errorMessage;
         loginError.classList.remove("d-none");
     });
 });
 //AUTH STATE CHANGE
 firebase.auth().onAuthStateChanged((user)=>{
     if (user) {
         if(!loginError.classList.contains("d-none")){
             loginError.classList.add("d-none");
         }
         currentUser = user;
         usersRef.child(user.uid).update({
             "connected":true
         });
         window.location.replace("index.html");
     }else{
     }
 });
