'use strict';
describe('ContactInfoClass Tests', function(){
    var ContactInfoClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    // Set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_ContactInfoClass_) {
        ContactInfoClass = new _ContactInfoClass_;
    }));

    it('Class should be defined', function() {
        expect(ContactInfoClass).toBeDefined();
    });

    describe('Class name tests', function() {
        it('Class should have getName be defined', function() {
            expect(ContactInfoClass.getName()).toBeDefined();
        });

        it('Class should get name value "fooBar"', function() {
            expect(ContactInfoClass.getName()).toBe('fooBar');
        });

        it('Class should setName to barFoo"', function() {
            expect(ContactInfoClass.setName('barFoo'));
            expect(ContactInfoClass.getName()).toBe('barFoo');
        });
    })
});

