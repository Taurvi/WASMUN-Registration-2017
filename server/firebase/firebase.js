var Q = require('q');
var fs = require('fs');
var firebase = require('firebase');
var database;

var fs_readFile = Q.denodeify(fs.readFile);

var _readFirebaseConfig = function() {
    var deferred = Q.defer();
    console.log('[FirebaseConfig] Reading Firebase Config.');
    fs_readFile('./data/firebase-config.json')
        .then(function success(rawConfig) {
            deferred.resolve(JSON.parse(rawConfig));
            console.log('[FirebaseConfig] Firebase Config successfully read.');
        }, function error(err) {
            console.log('[FirebaseConfig] There was an error reading the file.');
            deferred.reject(err);
        });
    return deferred.promise;
};

var _readClientDataMock = function() {
    var deferred = Q.defer();
    console.log('[FirebaseReadClientMock] Reading mock client data.');
    fs_readFile('./data/client-data-mock.json')
        .then(function success(rawMockData) {
            deferred.resolve(JSON.parse(rawMockData));
            console.log('[FirebaseReadClientMock] Mock client data successfully read.');
        }, function error(err) {
            console.log('[FirebaseReadClientMock] There was an error reading the file.');
            deferred.reject(err);
        });
    return deferred.promise;
};

/**
 *
 * @constructor
 */
var Firebase = function () {
   _readFirebaseConfig().then(function success(config) {
       firebase.initializeApp(config);
       console.log('[Firebase] Initliazed Firebase');
       database = firebase.database();
       console.log('[Firebase] Initliazed Database');
   }, function error(err) {
       console.log('[Firebase] Failed to initialize Firebase');
   });
};

Firebase.prototype.postRegistration = function() {
    // Read temp JSON file
    _readClientDataMock().then(function success(data) {
        database.ref('/2017/').push(data);
        // database.set(data);
        console.log('[FirebasePostRegistration] Submitted mock data');
    }, function error(err) {
        console.log('[FirebasePostRegistration] Error reading mock data');
    });
};

exports.Firebase = Firebase;
