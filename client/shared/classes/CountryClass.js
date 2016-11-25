'use strict';
var RegistrationModule = angular.module('RegistrationModule')
RegistrationModule.factory('CountryClass', [function () {
    function CountryClass(name, committee) {
        if (!name || !committee)
            throw "CountryClass requires two parameters."
        var self = this;
        self._name = name;
        self._committee = committee;
    }

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

    CountryClass.prototype.getName = function() {
        return this.name;
    }

    CountryClass.prototype.setName = function(name) {
        this.name = name;
    }

    CountryClass.prototype.getCommittee = function() {
        return this.committee;
    }

    CountryClass.prototype.setCommittee = function(committee) {
        this.committee = committee;
    }

    return CountryClass;
}]);