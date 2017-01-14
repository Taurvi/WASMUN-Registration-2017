var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors');

var Matrix = require('./matrix/matrix').Matrix;
var matrix = new Matrix();

var Firebase = require('./firebase/firebase').Firebase;
var firebase = new Firebase();

app.use(cors());

http.listen(3000, function() {
    console.log('[Main] Listening on *:3000')
});

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

    var postRegistration = function(data) {
        firebase.postRegistration(data).then(function success() {
            socket.emit('registrationSuccess');
        }, function error() {
            socket.emit('registrationFailed');
        });
    }

    socket.on('sendRegistration', function(data) {
        console.log('[Main] Registration data received from client.')
        postRegistration(data);
    });

    socket.on('requestData', function() {
        firebase.getRegistrationData().then(function success(data) {
            socket.emit('getData', data.val());
        });
    });
});

