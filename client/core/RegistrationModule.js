'use strict';
var RegistrationModule = angular.module('RegistrationModule',
    [
        'ui.router',
    ]);

RegistrationModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('RegistrationModule', {
                url: '/',
                views: {
                    'menu': {
                        templateUrl: 'views/MenuView.html',
                        // controller: 'MenuController'
                    },
                    'content': {
                        templateUrl: 'views/HomeView.html',
                        // controller: 'HomeController'
                    },
                    'footer': {
                        templateUrl: 'views/FooterView.html'
                    }
                }
            });
        $urlRouterProvider.otherwise(function($injector, $location){
            var $state = $injector.get("$state");
            $state.go('RegistrationModule');
        });
    }
]);