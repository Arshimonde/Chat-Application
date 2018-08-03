// Initialize Firebase
/*

     YOUR CODE IN FIREBASE CONSOLE

*/ 
firebase.initializeApp(config);
//Getting firebase reference
var messagesRef = firebase.database().ref("messages");
var usersRef = firebase.database().ref("users");
var currentUser = null;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
    } else {
    }
});

//Init Messages
messagesRef.on("value",function(snap){
    snap.forEach(function(childSnap){
         var color="primary";
         if(childSnap.val().name === currentUser.email){
               var color="secondary";
         }
         $("#messages-container").append('<div class="message '+color+'-color-border">'
          +'<div class="profile-image">'
          + '<img class="img-responsive" width="50" height="50" src="images/Albert_Einstein_Head.jpg" alt="Albert Einstein">'
          + '</div>'
          +'<p class="text">'+childSnap.val().message+'</p></div>'
          );
         //messagesContainer
         $("#messages-container").scrollTop($("#messages-container")[0].scrollHeight);
    });
});

//Init USERS
usersRef.on("value",(snap)=>{
    snap.forEach((snapChild)=>{
        if(snapChild.key !== currentUser.uid ){
          var li = $("<li>");
          var email = snapChild.val().email;
          var statusColor = "label-success";
          var statusText = "online"
          if(snapChild.val().connected===false){
              statusColor = "label-danger";
              statusText = "offline";
          }
          $(li).addClass("list-group-item friend").html(''
               + '<div class="profile-image">'
               +     '<img class="img-responsive" width="50" height="50" src="images/Albert_Einstein_Head.jpg" alt="Albert Einstein">'
               +  '</div>'
               +'<div class="friend-info">'
               +    '<div class="name-time">'
               +          '<span class="show name text-ellipsis primary-color font-bold">'
               +              email
               +          '</span>'
               +          '<div class="last-message-time">30/07/2018 </div>'
               +     '</div>'
               +     '<p class="last-message text-ellipsis">lorum ipsum dorum lorum ipsum dorum lorum ipsum dorum lorum ipsum dorum ipsum dorum</p>'
               +     '<span class="label '+statusColor+'">'+statusText+'</span>'
               +'</div>'
          ).appendTo("#people .list-group");
        }
    });
});

//Send Event
$("#sendBtn").on("click",function(e){
     messageRef = messagesRef.push();
     messageRef.set({
          "name":currentUser.email,
          "message":$("#chat-input").val()
     });
     $("#chat-input").val("");
 });
//LOGOUT LOGIC
$("#logoutBtn").on("click",()=>{
    firebase.auth().signOut().then(function() {
        usersRef.child(currentUser.uid).update({
            "connected":false
        });        
    }).catch(function(error) {
        var errorMessage = error.message;
        loginError.innerHTML = errorMessage;
        loginError.classList.remove("d-none");
    });
    window.location.replace("login.html");
});




