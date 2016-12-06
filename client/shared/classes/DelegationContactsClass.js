'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('DelegationContactsClass', ['ContactInfoClass', function (ContactInfoClass) {
    /**
     * Stores the contact information of key people in the delegation.
     * @constructor
     */
    function DelegationContactsClass() {
        var self = this;
        self._advisor = new ContactInfoClass();
        self._headDelegates = [];
    }

    // Defines getters and setters for protected variables.
    Object.defineProperties(DelegationContactsClass.prototype, {
        'advisor': {
            get: function() {
                return this._advisor;
            }
        },
        'headDelegates': {
            get: function() {
                return this._headDelegates;
            },
            set: function(headDelegates) {
                this._headDelegates = headDelegates;
            }
        }
    });

    /**
     * Gets the stored advisor of the delegation.
     * @returns ContactInfoClass - The advisor contact information of the delegation.
     */
    DelegationContactsClass.prototype.getAdvisor = function() {
        return this.advisor;
    };

    /**
     * Sets the advisor of the delegation.
     * @param name String - the advisor's name.
     * @param email String - the advisor's email.
     * @param phone String - the advisor's phone number.
     */
    DelegationContactsClass.prototype.setAdvisor = function(name, email, phone) {
        this.advisor.setName(name);
        this.advisor.setEmail(email);
        this.advisor.setPhone(phone);
    };

    /**
     * Gets the stored head delegates of the delegation
     * @returns [ContactInfoClass] - The contact information of the various head delegates in the delegation.
     */
    DelegationContactsClass.prototype.getHeadDelegates = function() {
        return this.headDelegates;
    };

    /**
     * Adds a head delegate to the delegation.
     * @param name - the head delegate's name.
     * @param email - the head delegate's email.
     * @param phone - the head delegate's phone number.
     */
    DelegationContactsClass.prototype.addHeadDelegate = function(name, email, phone) {
        var tempHeadDelegates = this.headDelegates;
        var newHeadDelegate = new ContactInfoClass(name, email, phone);
        tempHeadDelegates.push(newHeadDelegate);
        this.headDelegates = tempHeadDelegates;
    };

    /**
     * Removes a head delegate from the delegation.
     * @param index int - the index ID of the head delegate to be removed.
     * @returns ContactInfoClass - the contact information of the removed head delegate.
     */
    DelegationContactsClass.prototype.removeHeadDelegate = function(index) {
        var tempHeadDelegates = this.headDelegates;
        var removed = tempHeadDelegates.splice(index, 1);
        this.headDelegates = tempHeadDelegates;
        return removed[0];
    };

    /**
     * Edits the head delegate of a delegation.
     * @param index int - the index ID of the head delegate.
     * @param name String - the name of the head delegate.
     * @param email String - the email of the head delegate.
     * @param phone String - the phone number of the head delegate.
     */
    DelegationContactsClass.prototype.editHeadDelegate = function(index, name, email, phone) {
        var tempHeadDelegates = this.headDelegates;
        tempHeadDelegates[index].setName(name);
        tempHeadDelegates[index].setEmail(email);
        tempHeadDelegates[index].setPhone(phone);
        this.headDelegates = tempHeadDelegates;
    };

    /**
     * Converts the data in this to a JSON string.
     * @returns String - the data converted to JSON string.
     * TODO: Update UML diagram
     */
    DelegationContactsClass.prototype.stringify = function() {
        var object = {};
        object.advisor = JSON.parse(this.advisor.stringify());
        object.headDelegates = [];

        var headDelegates = this.headDelegates;
        headDelegates.map(function(headDelegate) {
            object.headDelegates.push(JSON.parse(headDelegate.stringify()));
        });

        return JSON.stringify(object);
    };

    return DelegationContactsClass;
}]);