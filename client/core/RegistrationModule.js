'use strict';
var RegistrationModule = angular.module('RegistrationModule',
    [
        'ui.router'
    ]);

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
                    templateUrl: 'views/MenuView.html',
                },
                'content': {
                    templateUrl: 'views/HomeView.html'
                }
            }
        })
}]);