'use strict';
describe('ContactInfoClass Tests', function(){
    var ContactInfoClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    beforeEach(inject(function(_ContactInfoClass_) {
        ContactInfoClass = new _ContactInfoClass_('fooBar', 'baz@foo.com', '1234567890');
    }));

    it('class should be defined', function() {
        expect(ContactInfoClass).toBeDefined();
    });

    describe('+ name tests', function() {
        it('class should have getName defined', function() {
            expect(ContactInfoClass.getName()).toBeDefined();
        });

        it('class should get name value "fooBar"', function() {
            expect(ContactInfoClass.getName()).toBe('fooBar');
        });

        it('class should setName to barFoo"', function() {
            ContactInfoClass.setName('barFoo');
            expect(ContactInfoClass.getName()).toBe('barFoo');
        });
    });

    describe('+ email tests', function() {
        it('class should have getEmail defined', function() {
            expect(ContactInfoClass.getEmail()).toBeDefined();
        });

        it('class should get email value "baz@foo.com"', function() {
            expect(ContactInfoClass.getEmail()).toBe('baz@foo.com');
        });

        it('class should setEmail to "foo@baz.com"', function() {
            ContactInfoClass.setEmail('foo@baz.com');
            expect(ContactInfoClass.getEmail()).toBe('foo@baz.com')
        });
    });

    describe('+ phone tests', function() {
        it('class should have getPhone defined', function() {
            expect(ContactInfoClass.getPhone()).toBeDefined();
        });

        it('class should get phone value "1234567890"', function() {
            expect(ContactInfoClass.getPhone()).toBe('1234567890');
        });

        it('class should set phone value to "0987654321"', function() {
            ContactInfoClass.setPhone('0987654321');
            expect(ContactInfoClass.getPhone()).toBe('0987654321')
        })
    });
});

