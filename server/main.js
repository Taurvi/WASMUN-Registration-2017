var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Matrix = require('./matrix/matrix').Matrix;
var matrix = new Matrix();

var Firebase = require('./firebase/firebase').Firebase;
var firebase = new Firebase();



io.on('connection', function(socket){
    console.log('[Main] User ' + socket.id + ' has connected.');
    socket.on('disconnect', function(){
        console.log('[Main] User ' + socket.id + ' has disconnected.');
    });

    socket.on('getMatrix', function() {
        console.log('[Main] User ' + socket.id + ' has requested the matrix.');
        matrix.getParsedMatrix()
            .then(function success(parsedMatrix) {
                console.log('[Main] Matrix successfully retrieved and parsed.');
                socket.emit('sendMatrix', parsedMatrix);
                console.log('[Main] Matrix sent to client.');
            }, function error(err) {
                console.log('[Main] Matrix retrieval failed: ' + err);
            });
    });

    socket.on('sendRegistration', function() {
        firebase.postRegistration();
    });
});

http.listen(3000, function() {
    console.log('[Main] Listening on *:3000')
})