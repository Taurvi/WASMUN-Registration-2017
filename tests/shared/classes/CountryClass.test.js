'use strict';
describe('CountryClass Tests', function(){
    var CountryClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_CountryClass_) {
        CountryClass = new _CountryClass_('bar');
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
        it('class should have getCommittees defined', function() {
            expect(CountryClass.getCommittees()).toBeDefined();
        });

        it('class should addCommittee("baz")', function() {
            CountryClass.addCommittee('baz');
            var getCommittees = CountryClass.getCommittees();
            expect(getCommittees[0]).toBe('baz');
        });

        it('class should addComittee("foo"), addCommittee("baz"), removeCommitee("foo")', function() {
           CountryClass.addCommittee('foo');
           CountryClass.addCommittee('baz');
           var removed = CountryClass.removeCommittee('foo');
           var getCommittees = CountryClass.getCommittees();
           expect(removed).toBe('foo');
           expect(getCommittees[0]).toBe('baz');
        });
    });

    describe('+ string tests', function() {
        it('class should have stringify defined', function() {
            expect(CountryClass.stringify()).toBeDefined();
        });

        it('class should setName("foo"), addCommittee("baz"), addCommittee("bar"), and stringify should be {"name":"foo","committees":["baz","bar"]}', function() {
            CountryClass.setName('foo');
            CountryClass.addCommittee('baz');
            CountryClass.addCommittee('bar');
            expect(CountryClass.getName()).toBe('foo');
            var committees = CountryClass.getCommittees();
            expect(committees[0]).toEqual('baz');
            expect(committees[1]).toEqual('bar');
            var compare = '{"name":"foo","committees":["baz","bar"]}';
            expect(CountryClass.stringify()).toBe(compare);
        })
    })
});

