'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('CountryClass', [function () {
    /**
     * Stores all the country information.
     * @param name String - the name of the country.
     * @throws CountryClass requires one parameter - if sufficient parameter is not provided.
     * @constructor
     */
    function CountryClass(name) {
        if (!name)
            throw "CountryClass requires one parameter.";
        var self = this;
        self._name = name;
        self._committees = [];
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
        'committees': {
            get: function() {
                return this._committees;
            },
            set: function(committees) {
                this._committees = committees;
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
     * Gets the stored committees of the country.
     * @returns Array - the committees of the country.
     */
    CountryClass.prototype.getCommittees = function() {
        return this.committees;
    };

    /**
     * Adds a committee.
     * @param committee String - the committee of the country.
     */
    CountryClass.prototype.addCommittee = function(committee) {
        var temp = this.getCommittees();
        temp.push(committee);
        this.committees = temp;
    };

    /**
     * Removes a committee
     * @param committee String - the committee to be removed.
     * @returns String - the removed committee.
     */
    CountryClass.prototype.removeCommittee = function(committee) {
        var temp = this.getCommittees();
        var index = temp.indexOf(committee);
        var removed = temp.splice(index, 1);
        this.committees = temp;
        return removed[0];
    };

    /**
     * Converts the data in this to a JSON string.
     * @returns String - the data converted to JSON string.
     * TODO: Update UML diagram
     */
    CountryClass.prototype.stringify = function() {
        var object = {};
        object.name = this.getName();
        object.committees = this.getCommittees();
        return JSON.stringify(object);
    };

    return CountryClass;
}]);