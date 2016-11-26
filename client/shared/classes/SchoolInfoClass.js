'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('SchoolInfoClass', [function () {
    function SchoolInfoClass() {
        var self = this;
        self._name = '';
        self._address = '';
    }

    Object.defineProperties(SchoolInfoClass.prototype, {
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

    SchoolInfoClass.prototype.getName = function() {
        return this.name;
    };

    SchoolInfoClass.prototype.setName = function(name) {
        this.name = name;
    };

    SchoolInfoClass.prototype.getAddress = function() {
        return this.address;
    };

    SchoolInfoClass.prototype.setAddress = function(address) {
        this.address = address;
    };

    return SchoolInfoClass;
}]);