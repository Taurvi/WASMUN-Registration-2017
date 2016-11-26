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

        it('class should add more countries', inject(function(_CountryClass_) {
            var sampleSelection = [];
            sampleSelection.push(new _CountryClass_('foo', 'bar'));
            sampleSelection.push(new _CountryClass_('baz', 'qux'));
            CountrySelectionClass.addCountry('foo', 'bar');
            CountrySelectionClass.addCountry('baz', 'qux');

            var selection = CountrySelectionClass.getCountries();

            expect(selection[0].getName()).toBe(sampleSelection[0].getName());
            expect(selection[0].getCommittee()).toBe(sampleSelection[0].getCommittee());
            expect(selection[1].getName()).toBe(sampleSelection[1].getName());
            expect(selection[1].getCommittee()).toBe(sampleSelection[1].getCommittee());
        }));

        it('class should have getCount defined', function() {
            expect(CountrySelectionClass.getCount()).toBeDefined();
        });

        it('class should get the number of countries', inject(function(_CountryClass_) {
            var sampleSelection = [];
            sampleSelection.push(new _CountryClass_('foo', 'bar'));
            sampleSelection.push(new _CountryClass_('baz', 'qux'));
            CountrySelectionClass.addCountry('foo', 'bar');
            CountrySelectionClass.addCountry('baz', 'qux');
            expect(CountrySelectionClass.getCount()).toEqual(2);
        }));

        it('class should have removeCountry defined', function() {
            expect(CountrySelectionClass.removeCountry()).toBeDefined();
        });

        it('class should remove country at index 0', inject(function(_CountryClass_) {
            var sampleSelection = [];
            sampleSelection.push(new _CountryClass_('baz', 'qux'));

            var removedSelection = [];
            removedSelection.push(new _CountryClass_('foo', 'bar'));

            CountrySelectionClass.addCountry('foo', 'bar');
            CountrySelectionClass.addCountry('baz', 'qux');

            var selection = CountrySelectionClass.getCountries();
            var removed = CountrySelectionClass.removeCountry(0)

            expect(selection[0].getName()).toBe(sampleSelection[0].getName());
            expect(selection[0].getCommittee()).toBe(sampleSelection[0].getCommittee());

            expect(removed[0].getName()).toBe(removedSelection[0].getName());
            expect(removed[0].getCommittee()).toBe(removedSelection[0].getCommittee());
        }));
    });
});

