'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('ContactInfoClass', [function () {
    function ContactInfoClass(name, email, phone) {
        if (!name || !email || !phone)
            throw "ContactInfoClass requires three parameters.";
        var self = this;
        self._name = name;
        self._email = email;
        self._phone = phone;
    }

    Object.defineProperties(ContactInfoClass.prototype, {
        'name': {
            get: function () {
                return this._name;
            },
            set: function(name) {
                this._name = name;
            }
        },
        'email': {
            get: function() {
                return this._email;
            },
            set: function(email) {
                this._email = email;
            }
        },
        'phone': {
            get: function() {
                return this._phone;
            },
            set: function(phone) {
                this._phone = phone;
            }
        }
    });

    ContactInfoClass.prototype.getName = function() {
        return this.name;
    };

    ContactInfoClass.prototype.setName = function(name) {
        this.name = name;
    };

    ContactInfoClass.prototype.getEmail = function() {
        return this.email;
    };

    ContactInfoClass.prototype.setEmail = function(email) {
        this.email = email;
    };

    ContactInfoClass.prototype.getPhone = function() {
        return this.phone;
    };

    ContactInfoClass.prototype.setPhone = function(phone) {
        this.phone = phone;
    };

    return ContactInfoClass;
}]);