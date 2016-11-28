var Q = require('q');
var fs = require('fs');
var SheetsAuth = require('../sheets/sheetsAuth').SheetsAuth;
var sheetsAuth = new SheetsAuth();

var _paths = {};
_paths.rawMatrix = './data/raw-matrix.json';

var _rawMatrix = [];
var _parsedMatrix = {};

var fs_readFile = Q.denodeify(fs.readFile);

var _readRawMatrix = function() {
    var deferred = Q.defer();
    console.log('[Matrix] Reading raw matrix.');
    fs_readFile(_paths.rawMatrix)
        .then(function success(rawMatrix) {
            deferred.resolve(JSON.parse(rawMatrix));
            console.log('[Matrix] Raw matrix successfully read.');
        }, function error(err) {
            console.log('[Matrix] There was an error reading the file.');
            deferred.reject(err);
        });
    return deferred.promise;
}

var _parseRawMatrix = function() {
    _rawMatrix.map(function(row) {
        var country = row.splice(0, 1);
        _parsedMatrix[country] = [];
        row.map(function(col) {
            if (col) {
                _parsedMatrix[country].push(col);
            }
        });
    });
    return JSON.stringify(_parsedMatrix)
}

/**
 *
 * @constructor
 */
var Matrix = function () {};

Matrix.prototype.getParsedMatrix = function() {
    var deferred = Q.defer();
    sheetsAuth.getRawMatrix().then(function() {
        console.log('[Matrix] Successfully grabbed!')
        _readRawMatrix()
            .then(function success(rawMatrix) {
                _rawMatrix = rawMatrix;
                console.log('[Matrix] Successfully read the matrix.')
                deferred.resolve(_parseRawMatrix());
            }, function error(err) {
                deferred.reject(err);
                console.log('[Matrix] Error reading the matrix: ' + err);
            });
    });
    return deferred.promise;
}

exports.Matrix = Matrix;
