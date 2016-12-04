'use strict';
describe('CountrySelectionClass Tests', function(){
    var CountrySelectionClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_CountrySelectionClass_) {
        CountrySelectionClass = new _CountrySelectionClass_();
    }));

    it('class should be defined', function() {
        expect(CountrySelectionClass).toBeDefined();
    });

    describe('+ country tests:', function() {
        it('class should have getCountries defined', function() {
            expect(CountrySelectionClass.getCountries()).toBeDefined();
        });

        it('class should add more countries', function() {
            CountrySelectionClass.addCountry('foo', ['bar']);
            CountrySelectionClass.addCountry('baz', ['qux']);

            var selection = CountrySelectionClass.getCountries();
            var firstSelectionCommittees = selection[0].getCommittees();
            var secondSelectionCommittees = selection[1].getCommittees();

            expect(selection[0].getName()).toBe('foo');
            expect(firstSelectionCommittees[0]).toBe('bar');
            expect(selection[1].getName()).toBe('baz');
            expect(secondSelectionCommittees[0]).toBe('qux');
        });

        it('class should have getCount defined', function() {
            expect(CountrySelectionClass.getCount()).toBeDefined();
        });

        it('class should get the number of committees', function() {
            CountrySelectionClass.addCountry('foo', ['bar', 'qux']);
            CountrySelectionClass.addCountry('baz', ['qux']);
            expect(CountrySelectionClass.getCount()).toEqual(2);
        });

        it('class should have getCommiteesCount defined', function() {
            expect(CountrySelectionClass.getCommitteesCount()).toBeDefined();
        });

        it('class should get the number of committees', function() {
            CountrySelectionClass.addCountry('foo', ['bar', 'qux']);
            CountrySelectionClass.addCountry('baz', ['qux']);
            expect(CountrySelectionClass.getCommitteesCount()).toEqual(3);
        });

        it('class should remove country at index 0', function() {
            CountrySelectionClass.addCountry('foo', ['bar']);
            CountrySelectionClass.addCountry('baz', ['qux']);

            var selection = CountrySelectionClass.getCountries();
            var selectionCommitetes = selection[0].getCommittees();

            expect(selection[0].getName()).toBe('foo');
            expect(selectionCommitetes[0]).toBe('bar');

            var removed = CountrySelectionClass.removeCountry(0);
            var removedCommittees = removed.getCommittees();

            expect(removed.getName()).toBe('foo');
            expect(removedCommittees[0]).toBe('bar');
        });
    });
});

