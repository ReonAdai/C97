var firebaseConfig = {
      apiKey: "AIzaSyAXvyFw8WbZ3IzlermeSDHqNwRA8ZjjrI8",
      authDomain: "kwitter-85acc.firebaseapp.com",
      databaseURL: "https://kwitter-85acc-default-rtdb.firebaseio.com",
      projectId: "kwitter-85acc",
      storageBucket: "kwitter-85acc.appspot.com",
      messagingSenderId: "375087404895",
      appId: "1:375087404895:web:2fc05ed3209a276ab748ea"
};

firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username_key");
document.getElementById("user_name").innerHTML = "Welcome " + username;

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  main_folder = childKey;
                  console.log(main_folder);
                  div_tag = '<div class="room_name" id="'+ main_folder + '" onclick="redirectToMessage(this.id)">' + main_folder +'</div><hr>';
                  document.getElementById("output").innerHTML += div_tag;
                  //Start code

                  //End code
            });
      });
}
getData();

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding main folder"
      });
      localStorage.setItem("roomname_key", room_name);
      window.location = "kwitter_message.html";
}

function redirectToMessage(room_id){
      localStorage.setItem("roomnname_key", room_id);
      window.location = "kwitter_message.html";
}

function logout(){
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location = "index.html";
}