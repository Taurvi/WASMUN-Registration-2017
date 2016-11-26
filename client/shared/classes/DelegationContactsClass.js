'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('DelegationContactsClass', ['ContactInfoClass', function (ContactInfoClass) {
    function DelegationContactsClass() {
        var self = this;
        self._advisor = new ContactInfoClass();
        self._headDelegates = [];
    }

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

    DelegationContactsClass.prototype.getAdvisor = function() {
        return this.advisor;
    };

    DelegationContactsClass.prototype.setAdvisor = function(name, email, phone) {
        this.advisor.setName(name);
        this.advisor.setEmail(email);
        this.advisor.setPhone(phone);
    };

    DelegationContactsClass.prototype.getHeadDelegates = function() {
        return this.headDelegates;
    };

    DelegationContactsClass.prototype.addHeadDelegate = function(name, email, phone) {
        var tempHeadDelegates = this.headDelegates;
        var newHeadDelegate = new ContactInfoClass(name, email, phone);
        tempHeadDelegates.push(newHeadDelegate);
        this.headDelegates = tempHeadDelegates;
    };

    DelegationContactsClass.prototype.removeHeadDelegate = function(index) {
        var tempHeadDelegates = this.headDelegates;
        var removed = tempHeadDelegates.splice(index, 1);
        this.headDelegates = tempHeadDelegates;
        return removed[0];
    };

    DelegationContactsClass.prototype.editHeadDelegate = function(index, name, email, phone) {
        var tempHeadDelegates = this.headDelegates;
        tempHeadDelegates[index].setName(name);
        tempHeadDelegates[index].setEmail(email);
        tempHeadDelegates[index].setPhone(phone);
        this.headDelegates = tempHeadDelegates;
    };

    return DelegationContactsClass;
}]);