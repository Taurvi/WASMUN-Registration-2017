var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var SheetsAuth = require('../../server/sheets/sheetsAuth').SheetsAuth;

var sheetsAuth = new SheetsAuth();

describe('sheetsAuth', function() {
    it('should be defined', function() {
        expect(sheetsAuth).to.not.be.undefined;
    });

    describe('+ test', function() {
        it('should have fs defined', function() {
            assert.equal(sheetsAuth.test(), 'baz');
        })
    });
});