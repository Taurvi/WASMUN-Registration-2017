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
    });

    $scope.submitSuccess = false;
    $scope.submitError = false;

    mySocket.on('registrationSuccess', function() {
       $scope.submitSuccess = true;
    });

    mySocket.on('registrationFailed', function() {
        $scope.submitError = true;
    });

    // Form
    $('#form').validate(
        {
            errorElement: 'div',
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
            },
            submitHandler: function (form, event) {
                //if ($('#form').validate().valid()) {
                //    submit($scope.data)
                //}

                event.preventDefault();

                submit($scope.data);
            }
        });

    var submit = function(data) {
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

        delegationContacts.setAdvisor(inputDelegationAdviser.name, inputDelegationAdviser.email, inputDelegationAdviser.phone);
        delegationContacts.addHeadDelegate(inputDelegationHead.name, inputDelegationHead.email, inputDelegationHead.phone);

        if (inputDelegationHeadTwo) {
            delegationContacts.addHeadDelegate(inputDelegationHeadTwo.name, inputDelegationHeadTwo.email, inputDelegationHeadTwo.phone);
        }

        var inputCountrySelect = data.countrySelection;
        inputCountrySelect.map(function(entry) {
           countrySelect.addCountry(entry.country, entry.committees);
        });
        
        var inputDelegation = data.delegationInfo;
        delegation.setSize(inputDelegation.delegationSize);
        delegation.setCost(inputDelegation.estCost);

        mySocket.emit('sendRegistration', register);
        $scope.data = {};
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    };

    $scope.clear = function(form) {
        $('#form').validate().resetForm();
        $("div").removeClass("has-error has-success");
        $scope.data = {};
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $scope.data = {};
    };


    $scope.addMemberState = function (entry) {
        var originalIndex = $scope.matrix.indexOf(entry);
        $scope.matrix[originalIndex].selected = true;
        $scope.data.countrySelection.push($scope.matrix[originalIndex]);
    };

    $scope.removeMemberState = function(index) {
        var originalIndex = $scope.matrix.indexOf($scope.data.countrySelection[index]);
        $scope.matrix[originalIndex].selected = false;
        $scope.data.countrySelection.splice(index, 1);
    };
}]);