'use strict';
describe('SchoolInfoClass Tests', function(){
    var SchoolInfoClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_SchoolInfoClass_) {
        SchoolInfoClass = new _SchoolInfoClass_();
    }));

    it('class should be defined', function() {
        expect(SchoolInfoClass).toBeDefined();
    });

    describe('+ name tests:', function() {
        it('class should have getName defined', function () {
            expect(SchoolInfoClass.getName()).toBeDefined();
        });

        it('class should setName to be "bar"', function() {
            SchoolInfoClass.setName('bar');
            expect(SchoolInfoClass.getName()).toBe('bar');
        });
    });

    describe('+ address tests:', function() {
        it('class should have getAddress defined', function () {
            expect(SchoolInfoClass.getAddress()).toBeDefined();
        });

        it('class should setAddress to be "qux"', function() {
            SchoolInfoClass.setAddress('qux');
            expect(SchoolInfoClass.getAddress()).toBe('qux');
        });
    });
});

