'use strict';
var RegistrationModule = angular.module('RegistrationModule')
RegistrationModule.factory('ContactInfoClass', [function () {
    function ContactInfoClass() {
        var self = this;
        self._name = 'fooBar';
    }

    Object.defineProperties(ContactInfoClass.prototype, {
        'name': {
            get: function () {
                return this._name;
            },
            set: function(newName) {
                this._name = newName;
            }
        }
    });

    ContactInfoClass.prototype.getName = function() {
        return this.name;
    }

    ContactInfoClass.prototype.setName = function(newName) {
        this.name = newName;
    }

    return ContactInfoClass;
}]);