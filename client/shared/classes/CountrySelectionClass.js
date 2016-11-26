'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('CountrySelectionClass', ['CountryClass', function (CountryClass) {
    function CountrySelectionClass() {
        var self = this;
        self._selections = [];
    }

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

    CountrySelectionClass.prototype.addCountry = function(country, committee) {
        var tempArray = this.selections;
        tempArray.push(new CountryClass(country, committee));
        this.selections = tempArray;
    };

    CountrySelectionClass.prototype.getCountries = function() {
        return this.selections;
    };

    CountrySelectionClass.prototype.getCount = function() {
        return this.selections.length;
    };

    CountrySelectionClass.prototype.removeCountry = function(index) {
        var tempArray = this.selections;
        var removed = tempArray.splice(index, 1);
        this.selections = tempArray;
        return removed[0];
    };

    return CountrySelectionClass;
}]);