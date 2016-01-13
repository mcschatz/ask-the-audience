var socket = io();

var connectionCount = document.getElementById('connection-count');
var statusMessage   = document.getElementById('status-message');
var voteCount       = document.getElementById('vote-count');
var yourVote        = document.getElementById('your-vote');

socket.on('usersConnected', function(count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function(message) {
  statusMessage.innerText = message;
});

socket.on('yourVote', function(message) {
  yourVote.innerText = 'Your last vote: ' + message;
  console.log(message);
});

socket.on('voteCount', function(votes) {
  var count = 0
  for (var vote in votes) {
    count += votes[vote]
  }

  voteCount.innerText = 'Total Votes: ' + count;
  console.log(votes);
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}