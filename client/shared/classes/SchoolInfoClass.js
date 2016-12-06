'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('SchoolInfoClass', [function () {
    /**
     * Holds all the information about the school.
     * @constructor
     */
    function SchoolInfoClass() {
        var self = this;
        self._name = '';
        self._address = '';
    }

    // Defines getters and setters for protected variables.
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

    /**
     * Gets the stored name of the school.
     * @returns String - the name of the school.
     */
    SchoolInfoClass.prototype.getName = function() {
        return this.name;
    };

    /**
     * Sets the name of the school.
     * @param name - the name of the school.
     */
    SchoolInfoClass.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Gets the stored address of the school.
     * @returns String - the address of the school.
     */
    SchoolInfoClass.prototype.getAddress = function() {
        return this.address;
    };

    /**
     * Sets the address of the school
     * @param address - the address of the school.
     */
    SchoolInfoClass.prototype.setAddress = function(address) {
        this.address = address;
    };

    /**
     * Converts the data in this to a JSON string.
     * @returns String - the data converted to JSON string.
     * TODO: Update UML diagram
     */
    SchoolInfoClass.prototype.stringify = function() {
        var object = {};
        object.name = this.getName();
        object.address = this.getAddress();
        return JSON.stringify(object);
    };

    return SchoolInfoClass;
}]);