'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('CountryClass', [function () {
    /**
     * Stores all the country information.
     * @param name String - the name of the country.
     * @param committee String - the committee of the country.
     * @throws CountryClass requires two parameters - if sufficient parameters are not provided.
     * @constructor
     */
    function CountryClass(name, committee) {
        if (!name || !committee)
            throw "CountryClass requires two parameters.";
        var self = this;
        self._name = name;
        self._committee = committee;
    }

    // Defines getters and setters for protected variables.
    Object.defineProperties(CountryClass.prototype, {
        'name': {
            get: function () {
                return this._name;
            },
            set: function(name) {
                this._name = name;
            }
        },
        'committee': {
            get: function() {
                return this._committee;
            },
            set: function(committee) {
                this._committee = committee;
            }
        }
    });

    /**
     * Gets the stored name of the country.
     * @returns String - the name of the country.
     */
    CountryClass.prototype.getName = function() {
        return this.name;
    };

    /**
     * Sets the name of the country.
     * @param name String - the name of the country.
     */
    CountryClass.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Gets the stored committee of the country.
     * @returns String - the committee of the country.
     */
    CountryClass.prototype.getCommittee = function() {
        return this.committee;
    };

    /**
     * Sets the committee of the country
     * @param committee - the committee of the country.
     */
    CountryClass.prototype.setCommittee = function(committee) {
        this.committee = committee;
    };

    return CountryClass;
}]);