var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var keypress = require('keypress');


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('socket message', function(msg){
    io.emit('socket message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
