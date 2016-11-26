'use strict';
describe('DelegationContactsClass Tests', function(){
    var DelegationContactsClass;
    var ContactInfoClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_DelegationContactsClass_) {
        DelegationContactsClass = new _DelegationContactsClass_();
    }));

    it('class should be defined', function() {
        expect(DelegationContactsClass).toBeDefined();
    });

    describe('+ advisor tests:', function() {
        it('class should have getAdvisor defined', function() {
            expect(DelegationContactsClass.getAdvisor()).toBeDefined();
        });

        it('class should setAdvisor to be ContactInfoClass("baz", "foo@qux", "0987654321")', inject(function(_ContactInfoClass_) {
            var sample = new _ContactInfoClass_('baz', 'foo@qux', '0987654321');
            DelegationContactsClass.setAdvisor('baz', 'foo@qux', '0987654321');
            var advisor = DelegationContactsClass.getAdvisor();
            expect(advisor.getName()).toBe(sample.getName());
            expect(advisor.getEmail()).toBe(sample.getEmail());
            expect(advisor.getPhone()).toBe(sample.getPhone());
        }));
    });

    describe('+ headDelegate tests:', function() {
        it('class should have getHeadDelegates defined', function() {
            expect(DelegationContactsClass.getHeadDelegates()).toBeDefined();
        });

        it('class should add a head delegate ContactInfoClass("foo", "bar@baz", "1234567890")', inject(function(_ContactInfoClass_) {
            var sample = [];
            sample.push(new _ContactInfoClass_('foo', 'bar@baz', '1234567890'));
            DelegationContactsClass.addHeadDelegate('foo', 'bar@baz', '1234567890');
            var headDelegates = DelegationContactsClass.getHeadDelegates();
            expect(headDelegates[0].getName()).toBe(sample[0].getName());
            expect(headDelegates[0].getEmail()).toBe(sample[0].getEmail());
            expect(headDelegates[0].getPhone()).toBe(sample[0].getPhone());
        }));

        it('class should add two head delegates ContactInfoClass("foo", "bar@baz", "1234567890") and ContactInfoClass("qux", "baz@bar", "0987654321") and removes index 0', inject(function(_ContactInfoClass_) {
            var sample = [];
            sample.push(new _ContactInfoClass_('qux', 'baz@bar', '0987654321'));
            var sampleRemoved = new _ContactInfoClass_('foo', 'bar@baz', '1234567890');
            DelegationContactsClass.addHeadDelegate('foo', 'bar@baz', '1234567890');
            DelegationContactsClass.addHeadDelegate('qux', 'baz@bar', '0987654321');

            var removed = DelegationContactsClass.removeHeadDelegate(0);
            var headDelegates = DelegationContactsClass.getHeadDelegates();

            expect(headDelegates[0].getName()).toBe(sample[0].getName());
            expect(headDelegates[0].getEmail()).toBe(sample[0].getEmail());
            expect(headDelegates[0].getPhone()).toBe(sample[0].getPhone());
            expect(removed.getName()).toBe(sampleRemoved.getName());
            expect(removed.getEmail()).toBe(sampleRemoved.getEmail());
            expect(removed.getPhone()).toBe(sampleRemoved.getPhone());
        }));

        it('class should add two head delegates ContactInfoClass("foo", "bar@baz", "1234567890") and ContactInfoClass("qux", "baz@bar", "0987654321") and edits index 1 to be ContactInfoClass("baz","qux@foo", "0000000000")', inject(function(_ContactInfoClass_) {
            var sample = [];
            var ContactInfoClass = _ContactInfoClass_;
            sample.push(new ContactInfoClass('foo', 'bar@baz', '1234567890'));
            sample.push(new ContactInfoClass('baz', 'qux@foo', '0000000000'));

            DelegationContactsClass.addHeadDelegate('foo', 'bar@baz', '1234567890');
            DelegationContactsClass.addHeadDelegate('qux', 'baz@bar', '0987654321');
            DelegationContactsClass.editHeadDelegate(1, 'baz','qux@foo', '0000000000');

            var headDelegates = DelegationContactsClass.getHeadDelegates();

            expect(headDelegates[1].getName()).toBe(sample[1].getName());
            expect(headDelegates[1].getEmail()).toBe(sample[1].getEmail());
            expect(headDelegates[1].getPhone()).toBe(sample[1].getPhone());
        }));
    });
});

