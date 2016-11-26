'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('DelegationInfoClass', [function() {
    function DelegationInfoClass() {
        var self = this;
        self._size = 0;
        self._cost = 0;
        self._discount = false;
    }

    Object.defineProperties(DelegationInfoClass.prototype, {
        'size': {
            get: function() {
                return this._size;
            },
            set: function(size) {
                this._size = size;
            }
        },
        'cost': {
            get: function() {
                return this._cost;
            },
            set: function(cost) {
                this._cost = cost;
            }
        },
        'discount': {
            get: function() {
                return this._discount;
            },
            set: function(discount) {
                this._discount = discount;
            }
        }
    });

    DelegationInfoClass.prototype.getSize = function() {
        return this.size;
    };

    DelegationInfoClass.prototype.setSize = function(size) {
        return this.size = size;
    };

    DelegationInfoClass.prototype.getCost = function() {
        return this.cost;
    };

    DelegationInfoClass.prototype.setCost = function(cost) {
        this.cost = cost;
    }

    DelegationInfoClass.prototype.getDiscount = function() {
        return this.discount;
    }

    DelegationInfoClass.prototype.setDiscount = function(discount) {
        this.discount = discount;
    }

    return DelegationInfoClass;
}]);