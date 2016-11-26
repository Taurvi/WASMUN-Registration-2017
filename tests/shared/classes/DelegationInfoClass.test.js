'use strict';
describe('DelegateInformationClass Tests', function(){
    var DelegationInfoClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_DelegationInfoClass_) {
        DelegationInfoClass = new _DelegationInfoClass_();
    }));

    it('class should be defined', function() {
        expect(DelegationInfoClass).toBeDefined();
    });

    describe('+ size tests:', function() {
        it('class should have getSize defined', function() {
            expect(DelegationInfoClass.getSize()).toBeDefined();
        });

        it('class should setSize be "2"', function() {
            DelegationInfoClass.setSize(2);
            expect(DelegationInfoClass.getSize()).toBe(2);
        });
    });

    describe('+ cost tests:', function() {
        it('class should have getCost defined', function() {
            expect(DelegationInfoClass.getCost()).toBeDefined();
        });

        it('class should setCost be "2"', function() {
            DelegationInfoClass.setCost(2);
            expect(DelegationInfoClass.getCost()).toBe(2);
        });
    });

    describe('+ discount tests:', function() {
        it('class should have getDiscount defined', function() {
            expect(DelegationInfoClass.getDiscount()).toBeDefined();
        });

        it('class should setCost be "true"', function() {
            DelegationInfoClass.setDiscount(true);
            expect(DelegationInfoClass.getDiscount()).toBeTruthy();
        });
    });
});

