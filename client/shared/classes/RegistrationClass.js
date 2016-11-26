'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('RegistrationClass', [
    'DelegationInfoClass',
    'SchoolInfoClass',
    'CountrySelectionClass',
    'DelegationContactsClass', function (DelegationInfoClass, SchoolInfoClass, CountrySelectionClass, DelegationContactsClass) {

    function RegistrationClass() {
        var self = this;
        self._delegationInfo = new DelegationInfoClass();
        self._schoolInfo = new SchoolInfoClass();
        self._countrySelection = new CountrySelectionClass();
        self._delegationContacts = new DelegationContactsClass();
    }

    Object.defineProperties(RegistrationClass.prototype, {
        'delegationInfo': {
            get: function() {
                return this._delegationInfo;
            }
        },
        'schoolInfo': {
            get: function() {
                return this._schoolInfo;
            }
        },
        'countrySelection': {
            get: function() {
                return this._countrySelection;
            }
        },
        'delegationContacts': {
            get: function() {
                return this._delegationContacts;
            }
        }
    });

    RegistrationClass.prototype.getDelegationInfo = function() {
        return this.delegationInfo;
    };

    RegistrationClass.prototype.getSchoolInfo = function() {
        return this.schoolInfo;
    };

    RegistrationClass.prototype.getCountrySelection = function() {
        return this._countrySelection;
    };

    RegistrationClass.prototype.getDelegationContacts = function() {
        return this.delegationContacts;
    };

    return RegistrationClass;
}]);