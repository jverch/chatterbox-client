// YOUR CODE HERE:
var app = {};

app.init = function() {
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  this.handleUsernameClick();
  
  this.fetch();
  
   $('body').on('click', '#clearAll', app.clearMessages);
  
  $('body').on('click', '#getMessages', function(event) {
    app.clearMessages();
    app.fetch();
    });
  
  $('body').on('click', '#send', '.submit', function(event) {
    app.handleSubmit();
  });
  
  $('body').on('click', '.dropbtn', function(event) {
    console.log(document.getElementById("myDropdown").classList);
    document.getElementById("myDropdown").classList.toggle("show");
  });
  
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    // data: 'order=-createdAt',
    data: {'order': '-createdAt', 'limit': '5'},

    success: function (data) {
      allData = data;
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        //render message data.results[i].text/username/room
        app.renderMessage(data.results[i]);
      }
    },
    error: function () {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to find website');
    }
  });
}


//app.fetch()
// wait
//console.log(allData)

app.clearMessages = function() {
  $('#chats').empty();
  $('#myDropdown').empty();
}

app.renderMessage = function(message) {
  if (!message.username) {
    return;
  }
  var username = message.username.replace(/\s/g, '');
  var text = message.text.replace(/\</g, '&lt;');
  var room = message.roomname;
  
  $('#chats').append('<div class=message><div class=username id=' + username + '>' + 
    message.username + '</div><div class=' + username + '>' + text + '</div></div>');
  
  app.renderRoom(room);
  //create variable for room
  //call renderRoom
  
}

app.renderRoom = function(room) {
  // if room exists
    // do nothing
  // else  
    // append new div with class room
  console.log($('.' + room));
  if ($('.' + room)[0] === undefined) {
    $('#myDropdown').append('<div class=' + room + '>' + room + '</div>');
  }
}

app.fixMessage = function(message) {
  // Fixes security 
  return message;
}
// <html> (onclick, '.MelBrooks', function(event)) {
    
//}
app.handleUsernameClick = function() {
  $('.username').on('click', function(event) {
    
  });
}

app.handleSubmit = function() {
  //take val of input field
  var username = window.location.search.slice(10);
  console.log(username);
  var text = $('#input').val();
  
  //convert to message format
  var message = {
    username: username,
    text: text,
    roomname: 'lobby'
  }
  //invoke send
  app.send(message);
  
  
}






