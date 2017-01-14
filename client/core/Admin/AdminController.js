'use strict';
RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.controller('AdminController', ['mySocket', '$scope', function(mySocket, $scope) {
    var askForData = function() {
        mySocket.emit('requestData');
    };

    $scope.testEmit = function () {
        console.log('test');
        askForData();
    };

    mySocket.on('getData', function(data) {
        // do something here
        console.log(data);
    });

}]);