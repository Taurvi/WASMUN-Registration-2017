'use strict';
describe('RegistrationClass Tests', function(){
    var RegistrationClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_RegistrationClass_) {
        RegistrationClass = new _RegistrationClass_();
    }));

    it('class should be defined', function() {
        expect(RegistrationClass).toBeDefined();
    });

    describe('+ delegation info tests', function() {
        it('class should have getDelegationInfo defined', function() {
            expect(RegistrationClass.getDelegationInfo()).toBeDefined();
        });

        it('class should have delegation info setSize(10), setCost(100), setDiscount(true)', function() {
            var delegationInfo = RegistrationClass.getDelegationInfo();

            delegationInfo.setSize(10);
            delegationInfo.setCost(100);
            delegationInfo.setDiscount(true);

            expect(delegationInfo.getSize()).toBe(10);
            expect(delegationInfo.getCost()).toBe(100);
            expect(delegationInfo.getDiscount()).toBeTruthy();
        });
    });

    describe('+ school info tests', function() {
        it('class should have getSchoolInfo defined', function() {
            expect(RegistrationClass.getSchoolInfo()).toBeDefined();
        });

        it('class should have school info setName("foo"), setAddress("baz")', function() {
            var schoolInfo = RegistrationClass.getSchoolInfo();

            schoolInfo.setName('foo');
            schoolInfo.setAddress('baz');

            expect(schoolInfo.getName()).toBe('foo');
            expect(schoolInfo.getAddress()).toBe('baz');
        });
    });

    describe('+ country selection tests', function() {
        it('class should have getCountrySelection defined', function() {
            expect(RegistrationClass.getCountrySelection()).toBeDefined();
        });

        it('class should addCountry("foo", "baz"), addCountry("bar", "qux"), removeCountry(0)', function() {
            var countrySelection = RegistrationClass.getCountrySelection();

            countrySelection.addCountry('foo', ['baz', 'qux']);
            countrySelection.addCountry('bar', ['qux']);

            expect(countrySelection.getCount()).toBe(2);
            expect(countrySelection.getCommitteesCount()).toBe(3);

            var removed = countrySelection.removeCountry(0);
            var removedCommittees = removed.getCommittees();

            expect(countrySelection.getCount()).toBe(1);
            expect(countrySelection.getCommitteesCount()).toBe(1);
            expect(removed.getName()).toBe('foo');
            expect(removedCommittees[0]).toBe('baz');
        });
    });

    describe('+ delegation contacts tests', function() {
        it('class should have getDelegationContacts defined', function() {
            expect(RegistrationClass.getDelegationContacts()).toBeDefined();
        });

        it('class should setAdvisor("foo", "bar@baz", "1234567890"', function() {
            var delegationContacts = RegistrationClass.getDelegationContacts();
            delegationContacts.setAdvisor('foo', 'bar@baz', '1234567890');
            var advisor = delegationContacts.getAdvisor();

            expect(advisor.getName()).toBe('foo');
            expect(advisor.getEmail()).toBe('bar@baz');
            expect(advisor.getPhone()).toBe('1234567890');
        });

        it('class should addHeadDelegate("foo", "bar@baz", "1234567890"), addHeadDelegate("qux", "baz@bar", "0987654321"), editHeadDelegate(1, "bar", "qux@foo", "0000000000"), deleteHeadDelegate(0)', function() {
            var delegationContacts =  RegistrationClass.getDelegationContacts();
            delegationContacts.addHeadDelegate('foo', 'bar@baz', '1234567890');
            delegationContacts.addHeadDelegate('qux', 'baz@bar', '0987654321');

            var headDelegates = delegationContacts.getHeadDelegates();
            expect(headDelegates[0].getName()).toBe('foo');
            expect(headDelegates[0].getEmail()).toBe('bar@baz');
            expect(headDelegates[0].getPhone()).toBe('1234567890');
            expect(headDelegates[1].getName()).toBe('qux');
            expect(headDelegates[1].getEmail()).toBe('baz@bar');
            expect(headDelegates[1].getPhone()).toBe('0987654321');

            delegationContacts.editHeadDelegate(1, 'bar', 'qux@foo', '0000000000');
            var headDelegates = delegationContacts.getHeadDelegates();
            expect(headDelegates[1].getName()).toBe('bar');
            expect(headDelegates[1].getEmail()).toBe('qux@foo');
            expect(headDelegates[1].getPhone()).toBe('0000000000');

            var removed = delegationContacts.removeHeadDelegate(0);
            var headDelegates = delegationContacts.getHeadDelegates();
            expect(removed.getName()).toBe('foo');
            expect(removed.getEmail()).toBe('bar@baz');
            expect(removed.getPhone()).toBe('1234567890');
            expect(headDelegates[0].getName()).toBe('bar');
            expect(headDelegates[0].getEmail()).toBe('qux@foo');
            expect(headDelegates[0].getPhone()).toBe('0000000000');
        });
    });

    describe('+ stringify tests', function() {
        it('class sshould have stringify defined', function() {
            expect(RegistrationClass.stringify).toBeDefined();
        });
    });
});

