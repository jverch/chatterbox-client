// YOUR CODE HERE:
var app = {};

app.init = function() {
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  this.handleUsernameClick();
  this.handleSubmit();
  this.fetch();
  
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(this.fixMessage(message)),
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
    success: function (data) {
      console.log(data.results);
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

app.clearMessages = function() {
  $('#chats').empty();
}

app.renderMessage = function(message) {
  if (!message.username) {
    return;
  }
  var username = message.username.replace(/\s/g, '');
  
  $('#chats').append('<div class=message><div class=username id=' + username + '>' + 
    message.username + '</div><div class=' + username + '>' + message.text + '</div></div>');
  
  // $('.message').append('<div class=\'username\'>' + message.username + '</div>');
  // $('.message').append('<div class=\'username\'>' + message.text + '</div>');
  
  
  // $('#chats').append('<div class=\'text\'>' + message.text + '</div>');
  console.log($('#chats'))
}

app.renderRoom = function(room) {
  // if room exists
    // do nothing
  // else  
    // append new div with class room
  $('#roomSelect').append('<div class=' + room + '></div>');
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
$('body').on('click', function(event) {
    console.log('hi')
  })
  
}

$( document ).ready(function() {

  $('button').on('click', function(event) {
    console.log('working');
  });
  app.init();
});





