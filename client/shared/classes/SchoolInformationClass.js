'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('SchoolInformationClass', [function () {
    function SchoolInformationClass() {
        var self = this;
        self._name = 'bar';
        self._address = 'baz';
    }

    Object.defineProperties(SchoolInformationClass.prototype, {
        'name': {
            get: function () {
                return this._name;
            },
            set: function(name) {
                this._name = name;
            }
        },
        'address': {
            get: function() {
                return this._address;
            },
            set: function(address) {
                this._address = address;
            }
        }
    });

    SchoolInformationClass.prototype.getName = function() {
        return this.name;
    };

    SchoolInformationClass.prototype.setName = function(name) {
        this.name = name;
    };

    SchoolInformationClass.prototype.getAddress = function() {
        return this.address;
    };

    SchoolInformationClass.prototype.setAddress = function(address) {
        this.address = address;
    };

    return SchoolInformationClass;
}]);