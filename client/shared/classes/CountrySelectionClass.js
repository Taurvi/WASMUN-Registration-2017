'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('CountrySelectionClass', ['CountryClass', function (CountryClass) {
    /**
     * Stores the selection of countries.
     * @constructor
     */
    function CountrySelectionClass() {
        var self = this;
        self._selections = [];
    }

    // Defines getters and setters for protected variables.
    Object.defineProperties(CountrySelectionClass.prototype, {
        'selections': {
            get: function () {
                return this._selections;
            },
            set: function(selections) {
                this._selections = selections;
            }
        }
    });

    /**
     * Adds a country to the selection.
     * @param country String - the name of the country being added.
     * @param committee String - the committee of the country being added.
     */
    CountrySelectionClass.prototype.addCountry = function(country, committee) {
        var tempArray = this.selections;
        tempArray.push(new CountryClass(country, committee));
        this.selections = tempArray;
    };

    /**
     * Gets the stored selection of countries.
     * @returns [CountryClass] - the stored selection of countries.
     */
    CountrySelectionClass.prototype.getCountries = function() {
        return this.selections;
    };

    /**
     * Gets the count of the countries in the selection.
     * @returns int - the number of countries in the selection.
     */
    CountrySelectionClass.prototype.getCount = function() {
        return this.selections.length;
    };

    /**
     * Removes a country from the selection.
     * @param index - the index ID of the country being removed.
     * @returns CountryClass - the country being removed.
     */
    CountrySelectionClass.prototype.removeCountry = function(index) {
        var tempArray = this.selections;
        var removed = tempArray.splice(index, 1);
        this.selections = tempArray;
        return removed[0];
    };

    return CountrySelectionClass;
}]);