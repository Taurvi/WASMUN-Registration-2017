'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('RegistrationClass', [
    'DelegationInfoClass',
    'SchoolInfoClass',
    'CountrySelectionClass',
    'DelegationContactsClass', function (DelegationInfoClass, SchoolInfoClass, CountrySelectionClass, DelegationContactsClass) {

        /**
         * Stores the registration information of a delegation.
         * @constructor
         */
        function RegistrationClass() {
            var self = this;
            self._delegationInfo = new DelegationInfoClass();
            self._schoolInfo = new SchoolInfoClass();
            self._countrySelection = new CountrySelectionClass();
            self._delegationContacts = new DelegationContactsClass();
        }

        // Defines getters and setters for protected variables.
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

        /**
         * Gets the delegation information.
         * @returns DelegationInformationClass - information on the delegation.
         */
        RegistrationClass.prototype.getDelegationInfo = function() {
            return this.delegationInfo;
        };

        /**
         * Gets the school information.
         * @returns SchoolInfoClass - information on the school.
         */
        RegistrationClass.prototype.getSchoolInfo = function() {
            return this.schoolInfo;
        };

        /**
         * Gets the country selection information.
         * @returns CountrySelectionClass - information on the delegation's country seletion.
         */
        RegistrationClass.prototype.getCountrySelection = function() {
            return this._countrySelection;
        };

        /**
         * Gets the delegation contact information.
         * @returns DelegationContactsClass - information on the delegation's leadership.
         */
        RegistrationClass.prototype.getDelegationContacts = function() {
            return this.delegationContacts;
        };

        // TODO: Do I really need a stringify class here...
        return RegistrationClass;
    }]);