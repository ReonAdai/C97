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

user_name = localStorage.getItem("username_key");
room_name = localStorage.getItem("roomname_key");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        subfolder_name = childKey;
                        subfolder_data = childData;
                        db_name = subfolder_data["name"];
                        db_message = subfolder_data["message"];
                        db_like = subfolder_data["like"];
                        name_tag = '<h4>' + db_name + '<img class="user_tick" src="tick.png"></h4>';
                        message_tag = '<h4 class="message_h4">' + db_message + '</h4>';
                        btnstart_tag = '<button id="' + subfolder_name + '" value = "' + db_like + '" class="btn btn-warning" onclick="updateLikes(this.id)">';
                        btnend_tag = '<span class="glyphicon glyphicon-thumbs-up">Like:' + db_like + '</span></button><hr>';
                        row = name_tag + message_tag + btnstart_tag + btnend_tag;
                        document.getElementById("output").innerHTML += row;

                  }
            });
      });
}
getData();

function updateLikes(subfolder_id){
likes = document.getElementById(subfolder_id).value;
likes = Number(likes)+1
firebase.database().ref(room_name).child(subfolder_id).update({
      like:likes
});
}

function logout() {
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location = "index.html";
}

function Send() {
      message_input = document.getElementById("message_send").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            like: 0,
            message: message_input
      });
      document.getElementById("message_send").value = "";
}