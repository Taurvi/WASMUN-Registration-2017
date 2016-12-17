'use strict';
RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.controller('HomeController', ['mySocket', '$scope', '$alert', 'RegistrationClass', function(mySocket, $scope, $alert, RegistrationClass) {
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
        mySocket.emit('getMatrix');
    });

    $scope.matrix = {};
    mySocket.on('sendMatrix', function(data) {
        $scope.matrix = JSON.parse(data);
        console.log($scope.matrix);
    });

    // Form
    $('#form').validate(
        {
            rules: {
                schoolName: {
                    required: true
                },
                schoolAddressLineOne: {
                    required: true
                },
                schoolAddressLineTwo: {
                    required: true
                },
                schoolAddressCity: {
                    required: true
                },
                schoolAddressZip: {
                    required: true
                },
                adviserName: {
                    required: true
                },
                adviserEmail: {
                    required: true,
                    email: true
                },
                adviserPhone: {
                    required: true,
                    phoneUS: true
                },
                headDelegateOneName: {
                    required: true
                },
                headDelegateOneEmail: {
                    required: true,
                    email: true
                },
                headDelegateOnePhone: {
                    required: true,
                    phoneUS: true
                },
                headDelegateTwoName: {
                    required: true
                },
                headDelegateTwoEmail: {
                    required: true,
                    email: true
                },
                headDelegateTwoPhone: {
                    required: true,
                    phoneUS: true
                },
                delegationSize: {
                    required: true,
                    min: 1,
                    digits: true
                }
            },
            highlight: function(element) {
                $(element).closest('.control-group').removeClass('has-success').addClass('has-error');
            },
            success: function(element) {
                element = element.closest('.control-group');
                if (element.hasClass('has-error')) {
                    element.addClass('valid').removeClass('has-error').addClass('has-success');
                }
            }
        });

    $scope.registration = {};
    var register = new RegistrationClass;
    $scope.submit = function(data) {
        $scope.registration = angular.copy(data);

        mySocket.emit('sendRegistration', $scope.registration);
        //$scope.clear
    };

    $scope.clear = function(form) {
        $('#form').validate().resetForm();
        $scope.data = angular.copy($scope.registration);

    //var test = new RegistrationClass;
    //test.getDelegationInfo().setSize(10);
    //test.getDelegationInfo().setCost(100);
    //test.getDelegationInfo().setDiscount(true);
    //test.getSchoolInfo().setName('foo');
    //test.getSchoolInfo().setAddress('baz');
    //test.getCountrySelection().addCountry('foo', ['baz', 'qux']);
    //test.getCountrySelection().addCountry('bar', ['qux']);
    //test.getDelegationContacts().setAdvisor('foo', 'bar@baz', '1234567890');
    //test.getDelegationContacts().addHeadDelegate('foo', 'bar@baz', '1234567890');
    //test.getDelegationContacts().addHeadDelegate('qux', 'baz@bar', '0987654321');
    //
    //console.log(test.stringify());
    //
    //$scope.testEmit = function() {
    //    mySocket.emit('sendRegistration', test);
    };

    function addMemberState(country) {

    }
}]);