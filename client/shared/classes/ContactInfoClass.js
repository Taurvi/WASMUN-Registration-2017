'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('ContactInfoClass', [function () {
    /**
     * Stores contact information.
     * @param name String - The name of the contact.
     * @param email String -  The email of the contact.
     * @param phone String - The phone number of the contact.
     * @constructor
     */
    function ContactInfoClass(name, email, phone) {
        var self = this;
        self._name = name;
        self._email = email;
        self._phone = phone;
    }

    // Defines getters and setters for protected variables.
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

    /**
     * Gets the stored name of the contact.
     * @returns String - the name of the contact.
     */
    ContactInfoClass.prototype.getName = function() {
        return this.name;
    };

    /**
     * Sets the name of the contact.
     * @param name String - the name of the contact.
     */
    ContactInfoClass.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Gets the stored email of the contact
     * @returns String - the email of the contact.
     */
    ContactInfoClass.prototype.getEmail = function() {
        return this.email;
    };

    /**
     * Sets the email of the contact.
     * @param email String - the email of the contact.
     */
    ContactInfoClass.prototype.setEmail = function(email) {
        this.email = email;
    };

    /**
     * Gets the stored phone number of the contact.
     * @returns String - the phone number of the contact.
     */
    ContactInfoClass.prototype.getPhone = function() {
        return this.phone;
    };

    /**
     * Sets the phone number of the contact.
     * @param phone String - the phone number of the contact.
     */
    ContactInfoClass.prototype.setPhone = function(phone) {
        this.phone = phone;
    };

    /**
     * Converts the data in this to a JSON string.
     * @returns String - the data converted to JSON string.
     * TODO: Update UML diagram
     */
    ContactInfoClass.prototype.stringify = function() {
        var object = {};
        object.name = this.getName();
        object.email = this.getEmail();
        object.phone = this.getPhone();

        return JSON.stringify(object);
    };

    return ContactInfoClass;
}]);