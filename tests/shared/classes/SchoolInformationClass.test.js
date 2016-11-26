'use strict';
describe('SchoolInformationClass Tests', function(){
    var SchoolInformationClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_SchoolInformationClass_) {
        SchoolInformationClass = new _SchoolInformationClass_();
    }));

    it('class should be defined', function() {
        expect(SchoolInformationClass).toBeDefined();
    });

    describe('+ name tests:', function() {
        it('class should have getName defined', function () {
            expect(SchoolInformationClass.getName()).toBeDefined();
        });

        it('class should setName to be "bar"', function() {
            SchoolInformationClass.setName('bar');
            expect(SchoolInformationClass.getName()).toBe('bar');
        });
    });

    describe('+ address tests:', function() {
        it('class should have getAddress defined', function () {
            expect(SchoolInformationClass.getAddress()).toBeDefined();
        });

        it('class should setAddress to be "qux"', function() {
            SchoolInformationClass.setAddress('qux');
            expect(SchoolInformationClass.getAddress()).toBe('qux');
        });
    });
});

