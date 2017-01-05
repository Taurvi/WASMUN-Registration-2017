'use strict';

// var mySocket = io('http://localhost:3000');

RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.controller('HomeController', ['$scope', '$alert', 'RegistrationClass', 'mySocket', function($scope, $alert, RegistrationClass, mySocket) {
    $scope.data = {};
    $scope.data.countrySelection = [];
    $scope.connectionError = false;
    $scope.status = {};
    $scope.status.success = false;
    $scope.status.error = false;

    mySocket.on('connect_error', function() {
        $scope.connectionError = true;
    });

    mySocket.on('connect', function() {
        mySocket.emit('getMatrix');
        $scope.connectionError = false;
    });

    $scope.matrix = [];
    mySocket.on('sendMatrix', function(data) {
        $scope.matrix = JSON.parse(data);
    });


    mySocket.on('registrationSuccess', function() {
        $scope.status.success = true;
    });

    mySocket.on('registrationFailed', function() {
        $scope.status.error = true;
    });

    $scope.toggleMatrix = false;

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