var chai = require('chai');
var expect = chai.expect;
var sheetsAuth = require('../../server/sheets/sheetsAuth');
describe('sheetsAuth', function() {
        it('should be defined', function() {
            expect(sheetsAuth).to.not.be.undefined;
        });
});