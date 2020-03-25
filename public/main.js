let socket = io();
let displayMessage = ""; //string of messages

socket.on('messages', function (data) {
    //alert(data.alertBox);
});

socket.on('submission', function (data) {
    displayMessage += data.clientName + " : " + data.content + "<br>";
    display();
    // console.log(data);
    //alert(data.content);
});

socket.on('getOthersNames', function (data) {
    displayMessage += "Let's warmly welcome" + data.list + "<br>";
    display();
    // console.log(data);
});


function myFunction() {
  var x = document.getElementById("mySelect").options.length;
  document.getElementById("demo").innerHTML = "Found " + x + " options in the list.";
}

function setClientName() {
    var nickName = document.getElementsByName("Nickname")[0].value;
    socket.emit('setClientName', nickName);

    hideNameForm();
    showChatRoom();
}

function myFunction() {
  document.getElementById("frm1").submit();
}

function hideNameForm() {
    document.getElementById("alias").style.display = "none";
}

function showChatRoom() {
    document.getElementById("chatroom").style.display = "block";
    let nickName = document.getElementsByName("Nickname")[0].value;
    displayMessage = nickName + " has joined the chatroom" + "<br>";
    socket.emit('getOthersNames');
    display();

}

function clientMessage() {
    let thisMessage = document.getElementsByName("messageContent")[0].value;
    let username = document.getElementsByName("Nickname")[0].value;

    socket.emit('submission', thisMessage);
    document.getElementsByName("messageContent")[0].value = "";
    displayMessage += username + " : " + thisMessage + "<br>";
    display();
}

function display() {
    document.getElementById("chatbox").innerHTML = displayMessage;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});
