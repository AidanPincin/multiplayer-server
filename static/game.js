var socket = io();
var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
window.addEventListener('keydown', function(e) {
  if(e.key == 'w'){movement.up=true}
  if(e.key=='d'){movement.right=true}
  if(e.key=='a'){movement.left=true}
  if(e.key=='s'){movement.down=true}
});
window.addEventListener('keyup', function(e) {
    if(e.key == 'w'){movement.up=false}
    if(e.key=='d'){movement.right=false}
    if(e.key=='a'){movement.left=false}
    if(e.key=='s'){movement.down=false}
});

socket.emit('new player');

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  console.log(players);
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = '#00ff00';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});
