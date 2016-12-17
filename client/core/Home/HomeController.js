'use strict';
RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.controller('HomeController', ['mySocket', '$scope', '$alert', 'RegistrationClass', function(mySocket, $scope, $alert, RegistrationClass) {
    $scope.$on('socket:error', function (ev, data) {
        console.log('test');
    });



    var showError = false;

    var alerts = {};

    alerts.errorConnect = $alert({title: 'Error 404:', content: 'Unable to connect to server. Please email usgit@wasmun.org immediately.', placement: 'top', type: 'danger', show: false});
    alerts.successConnect = $alert({title: 'Connection Verified:', content: 'Server uplink has been established.', placement: 'top', type: 'success', show: false, duration: 5});

    mySocket.on('connect_error', function() {
        alerts.successConnect.hide();
        alerts.errorConnect.show();
    });

    mySocket.on('connect', function() {
        console.log('socket connected');
        alerts.errorConnect.hide();
        alerts.successConnect.show();
    });

    mySocket.on('sendMatrix', function(data) {
        console.log(data);
    });

    var test = new RegistrationClass;
    test.getDelegationInfo().setSize(10);
    test.getDelegationInfo().setCost(100);
    test.getDelegationInfo().setDiscount(true);
    test.getSchoolInfo().setName('foo');
    test.getSchoolInfo().setAddress('baz');
    test.getCountrySelection().addCountry('foo', ['baz', 'qux']);
    test.getCountrySelection().addCountry('bar', ['qux']);
    test.getDelegationContacts().setAdvisor('foo', 'bar@baz', '1234567890');
    test.getDelegationContacts().addHeadDelegate('foo', 'bar@baz', '1234567890');
    test.getDelegationContacts().addHeadDelegate('qux', 'baz@bar', '0987654321');

    console.log(test.stringify());

    $scope.testEmit = function() {
        mySocket.emit('sendRegistration', test);
    };
}]);