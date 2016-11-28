var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Matrix = require('./matrix/matrix').Matrix;
var matrix = new Matrix();


matrix.getParsedMatrix()
    .then(function success(parsedMatrix) {
        // console.log(JSON.parse(parsedMatrix));
    }, function error(err) {
        // console.log(err);
    });

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('[Main] Listening on *:3000')
})