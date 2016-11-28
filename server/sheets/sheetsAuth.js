var Q = require('q');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';

var fs_readFile = Q.denodeify(fs.readFile);
var fs_writeFile = Q.denodeify((fs.writeFile));
var fs_mkdir = Q.denodeify(fs.mkdir);

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
    var deferred = Q.defer();
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    fs_readFile(TOKEN_PATH)
        .then(function success(token) {
            oauth2Client.credentials = JSON.parse(token);
            deferred.resolve(oauth2Client);
        }, function error(err) {
            getNewToken(oauth2Client).then(function() {
                deferred.resolve(oauth2Client);
            });
        })

    return deferred.promise;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client) {
    var deferred = Q.defer();
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('[SheetsAuth] Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('[SheetsAuth] Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('[SheetsAuth] Error while trying to retrieve access token', err);
                deferred.reject(err);
            } else {
                oauth2Client.credentials = token;
                storeToken(token).then(
                    function success() {
                        console.log('[SheetsAuth] Successfully Returned Promise')
                        deferred.resolve();
                    }, function error() {
                        console.log('[SheetsAuth] Error returning promise')
                        deferred.reject();
                    });
            }
        });
    });
    return deferred.promise;
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    var deferred = Q.defer();
    fs_mkdir(TOKEN_DIR).then(
        function success() {
            console.log('[SheetsAuth] Token directory created.')
        }, function error(err) {
            console.log('[SheetsAuth] Token directory exists. No further action.')
        }).then(fs_writeFile(TOKEN_PATH, JSON.stringify(token)).then(
        function success(){
            deferred.resolve();
            console.log('[SheetsAuth] Token successfully stored.')
        }, function error(err) {
            deferred.reject();
            console.log('[SheetsAuth] Error storing token.')
        }
    ));
    return deferred.promise;
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function retrieveRawMatrix(auth) {
    var deferred = Q.defer();
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: '1Ej7YCG9VVdXKR_0PQ3XaSPmvD0_HBwyiIn4snzE-gLA',
        range: 'Exported!A:H',
    }, function (err, response){
        if (err) {
            console.log('[SheetsAuth] The API returned an error: ' + err);
            deferred.reject(err);
        } else {
            fs_writeFile('./data/raw-matrix.json', JSON.stringify(response.values))
                .then(function success() {
                    deferred.resolve();
                }, function error(err) {
                    deferred.reject(err);
                });
        }
    });

    return deferred.promise;
}

var SheetsAuth = function () {};

SheetsAuth.prototype.getRawMatrix = function () {
    var deferred = Q.defer();
    fs_readFile('./data/client_secret.json').then(
        function success(content) {
            authorize(JSON.parse(content)).then(function(oauth2Client) {
                retrieveRawMatrix(oauth2Client)
                    .then(function success() {
                        deferred.resolve();
                    }, function error(err) {
                        deferred.reject(err);
                    });
            });
        }, function error(err) {
            console.log('[SheetsAuth] Error loading client secret file: ' + err);
            deferred.reject(err);
        }
    );
    return deferred.promise;
};

exports.SheetsAuth = SheetsAuth;
 