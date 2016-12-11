'use strict';
var RegistrationModule = angular.module('RegistrationModule',
    [
        'ui.router',
        'ngAnimate',
        'btford.socket-io',
        'mgcrea.ngStrap'
    ]);

RegistrationModule.factory('mySocket', function (socketFactory) {
    var myIoSocket = io.connect('http://localhost:3000');
    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });
    return mySocket;
});

RegistrationModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                'menu': {
                    templateUrl: 'views/MenuView.html'
                },
                'content': {
                    templateUrl: 'views/HomeView.html',
                    controller: 'HomeController'
                },
                'footer': {
                    templateUrl: 'views/FooterView.html',
                    controller: 'FooterController'
                }
            }
        })
}]);