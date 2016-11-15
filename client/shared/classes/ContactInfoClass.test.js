'use strict';
describe('ContactInfoClass Tests', function(){
    var ContactInfoClass;
    beforeEach(angular.mock.module('RegistrationModule'));

    // Set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_ContactInfoClass_) {
        ContactInfoClass = _ContactInfoClass_;
    }));

    it('ContactInfoClass should be defined', function() {
        expect(ContactInfoClass).toBeDefined();
    });
});