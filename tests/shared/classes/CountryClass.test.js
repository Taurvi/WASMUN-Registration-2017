'use strict';
describe('CountryClass Tests', function(){
    var CountryClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_CountryClass_) {
        CountryClass = new _CountryClass_('bar', 'baz');
    }));

    it('class should be defined', function() {
        expect(CountryClass).toBeDefined();
    });

    describe('+ name tests', function() {
        it('class should have getName defined', function() {
            expect(CountryClass.getName()).toBeDefined();
        });

        it('class should have getName be "bar"', function() {
            expect(CountryClass.getName()).toBe('bar');
        });

        it('class should setName to foo"', function() {
            CountryClass.setName('foo');
            expect(CountryClass.getName()).toBe('foo');
        });
    });

    describe('+ committee tests', function() {
        it('class should have getCommittee defined', function() {
            expect(CountryClass.getCommittee()).toBeDefined();
        });

        it('class should have getCommittee be "baz"', function() {
            expect(CountryClass.getCommittee()).toBe('baz');
        });

        it('class should setName to "qux"', function() {
            CountryClass.setCommittee('qux');
            expect(CountryClass.getCommittee()).toBe('qux');
        });
    });
});

