'use strict';
var RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.factory('DelegationInfoClass', [function() {
    /**
     * Stores information about the delegation.
     * @constructor
     */
    function DelegationInfoClass() {
        var self = this;
        self._size = 0;
        self._cost = 0;
        self._discount = false;
    }

    // Defines getters and setters for protected variables.
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

    /**
     * Gets the stored size of the delegation.
     * @returns int - the size of the delegation.
     */
    DelegationInfoClass.prototype.getSize = function() {
        return this.size;
    };

    /**
     * Sets the size of the delegation.
     * @param size int - the size of the delegation.
     */
    DelegationInfoClass.prototype.setSize = function(size) {
        this.size = size;
    };

    /**
     * Gets the cost of the delegation.
     * @returns int - the cost of the delegation.
     */
    DelegationInfoClass.prototype.getCost = function() {
        return this.cost;
    };

    /**
     * Sets the cost of the delegation.
     * @param cost int - the cost of the delegation.
     */
    DelegationInfoClass.prototype.setCost = function(cost) {
        this.cost = cost;
    };

    /**
     * Gets whether or not the delegation has a discount.
     * @returns Boolean - if the delegation has a discount.
     */
    DelegationInfoClass.prototype.getDiscount = function() {
        return this.discount;
    };

    /**
     * Sets whether the delegation has a discount.
     * @param discount Boolean - if the delegation has a discount.
     */
    DelegationInfoClass.prototype.setDiscount = function(discount) {
        this.discount = discount;
    };

    /**
     * Converts the data in this to a JSON string.
     * @returns String - the data converted to JSON string.
     * TODO: Update UML diagram
     */
    DelegationInfoClass.prototype.stringify = function() {
        var object = {};
        object.size = this.getSize();
        object.cost = this.getCost();
        object.discount = this.getDiscount();
        return JSON.stringify(object);
    };

    return DelegationInfoClass;
}]);