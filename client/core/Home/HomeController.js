'use strict';
RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.controller('HomeController', ['mySocket', '$scope', '$alert', 'RegistrationClass', function(mySocket, $scope, $alert, RegistrationClass) {
    var alerts = {};
    $scope.data = {};
    $scope.data.countrySelection = [];

    alerts.errorConnect = $alert({title: 'Error 404:', content: 'Unable to connect to server. Please email usgit@wasmun.org immediately.', placement: 'top-right', type: 'danger', show: false});
    alerts.successConnect = $alert({title: 'Connection Verified:', content: 'Server uplink has been established.', placement: 'top-right', type: 'success', show: false, duration: 5});

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

    $scope.matrix = [];
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
                schoolAddressCity: {
                    required: true
                },
                schoolAddressZip: {
                    required: true,
                    zipcodeUS: true
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

    $scope.submit = function(data) {
        var register = new RegistrationClass;
        var school = register.getSchoolInfo();
        var countrySelect = register.getCountrySelection();
        var delegation = register.getDelegationInfo();
        var delegationContacts = register.getDelegationContacts();

        var inputSchool = data.schoolInfo;
        school.setName(inputSchool.name);

        if (inputSchool.addressLineTwo != "") {
            school.setAddress(inputSchool.addressLineOne + " " + inputSchool.addressLineTwo + " " +
                inputSchool.addressCity + " " + inputSchool.addressZip);
        } else {
            school.setAddress(inputSchool.addressLineOne + " " +
                inputSchool.addressCity + " " + inputSchool.addressZip);
        }

        var inputDelegationAdviser = data.delegationContacts.adviser;
        var inputDelegationHead = data.delegationContacts.headDelegateOne;
        var inputDelegationHeadTwo = data.delegationContacts.headDelegateTwo;
        console.log(inputDelegationHead);
        delegationContacts.setAdvisor(inputDelegationAdviser.name, inputDelegationAdviser.email, inputDelegationAdviser.phone);
        delegationContacts.addHeadDelegate(inputDelegationHead.name, inputDelegationHead.email, inputDelegationHead.phone);

        if (inputDelegationHeadTwo) {
            delegationContacts.addHeadDelegate(inputDelegationHeadTwo.name, inputDelegationHeadTwo.email, inputDelegationHeadTwo.phone);
        }

        var inputCountrySelect = data.countrySelection;
        inputCountrySelect.map(function(entry) {
           countrySelect.addCountry(entry.country, entry.committees);
        });
        //countrySelect.addCountry();
        
        var inputDelegation = data.delegationInfo;
        delegation.setSize(inputDelegation.size);
        delegation.setCost(inputDelegation.estCost);

        console.log(register);
        mySocket.emit('sendRegistration', register);
        $scope.clear
    };

    $scope.clear = function(form) {
        $('#form').validate().resetForm();

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


    $scope.addMemberState = function (entry) {
        var originalIndex = $scope.matrix.indexOf(entry);
        $scope.matrix[originalIndex].selected = true;
        /*var selection = {};
        selection.country = country;
        selection.committees = committees;*/
        $scope.data.countrySelection.push($scope.matrix[originalIndex]);
        console.log($scope.data.countrySelection);
    };

    $scope.removeMemberState = function(index) {
        var originalIndex = $scope.matrix.indexOf($scope.data.countrySelection[index]);
        $scope.matrix[originalIndex].selected = false;
        $scope.data.countrySelection.splice(index, 1);
        console.log($scope.data.countrySelection);
    };
}]);