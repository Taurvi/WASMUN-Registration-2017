'use strict';
RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.controller('HomeController', ['mySocket', '$scope', function(mySocket, $scope) {
    $scope.$on('socket:error', function (ev, data) {
        console.log('test');
    });
}]);