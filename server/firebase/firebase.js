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
            console.log('[FirebaseReadConfig] Firebase Config successfully read.');
        }, function error(err) {
            console.log('[FirebaseReadConfig] There was an error reading the file.');
            deferred.reject(err);
        });
    return deferred.promise;
};

var _readFirebaseAuth = function() {
    var deferred = Q.defer();
    console.log('[FirebaseReadAuth] Reading Firebase Auth.');
    fs_readFile('./data/firebase-auth.json')
        .then(function success(rawAuth) {
            deferred.resolve(JSON.parse(rawAuth));
            console.log('[FirebaseReadAuth] Firebase Config successfully read.');
        }, function error(err) {
            console.log('[FirebaseReadAuth] There was an error reading the file.');
            deferred.reject(err);
        });
    return deferred.promise;
}

var _authFirebase = function() {
    var deferred = Q.defer();
    _readFirebaseAuth().then(function success(rawAuth) {
        firebase.auth().signInWithEmailAndPassword(rawAuth.username, rawAuth.password).then(function success() {
            console.log('[FirebaseAuth] Firebase Auth success.');
            deferred.resolve();
        }, function error(error) {
            console.log('[FirebaseAuth] Firebase Auth failed: ' + error.code + error.message);
            deferred.reject();
        });
        console.log('[FirebaseAuth] Firebase Auth successfully.');
    }, function error() {
        deferred.reject();
        console.log('[FirebaseAuth] There was an error reading the file.');
    });
    return deferred.promise;
}

var _register = function(data) {
    var deferred = Q.defer();
    database.ref('/2019/').push(data).then(function success() {
        console.log('[FirebasePostRegistration] Submitted data to server.');
        deferred.resolve('success');
    }, function error() {
        console.log('[FirebasePostRegistration] Failed to submit data to server.');
        deferred.reject('error');
    });
    return deferred.promise;
}

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

Firebase.prototype.postRegistration = function(data) {
    var deferred = Q.defer();
    _authFirebase().then(function success() {
        var submitted = new Date();
        data.date = submitted.toString();
        console.log('[FirebasePostRegistration] Raw data received from client.');
        deferred.resolve(_register(data));
    }, function error() {
        console.log('[FirebasePostRegistration] Failed to auth.');
        deferred.reject('error');
    });
    return deferred.promise;
};

Firebase.prototype.getRegistrationData = function() {
    var deferred = Q.defer();
    _authFirebase().then(function success() {
        console.log('[getRegistrationData] Data retrieved from server.');
        var data = database.ref('/2019/').once('value');
        deferred.resolve(data);
    }, function error() {
        console.log('[getRegistrationData] Failed to auth.');
        deferred.reject('error');
    });
    return deferred.promise;
}

exports.Firebase = Firebase;
