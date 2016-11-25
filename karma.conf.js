// Karma configuration
// Generated on Mon Feb 08 2016 23:33:17 GMT+0000 (UTC)
// run test karma start karma.conf.js
/*******************
 * LOCAL VARIABLES *
 *******************/
// Directories
var dir = {};
dir.bower = 'bower_components/';
dir.client = 'client/';
dir.public = 'public/';
dir.shared = dir.client + 'shared/';
// Source Files
var src = {};
src.js = [];
/************************
 * SETTING SOURCE FILES *
 ************************/
// JS Lib
src.js.push(dir.bower + 'angular/angular.js');
src.js.push(dir.bower + 'angular-ui-router/release/angular-ui-router.js');
src.js.push(dir.bower + 'angular-strap/dist/angular-strap.js');
src.js.push(dir.bower + 'angular-strap/dist/angular-strap.tpl.js');
src.js.push(dir.bower + 'angular-mocks/angular-mocks.js');
// JS
src.js.push(dir.client + 'core/RegistrationModule.js');
src.js.push(dir.client + 'core/Menu/MenuController.js');
src.js.push(dir.client + 'core/Home/HomeController.js');
src.js.push(dir.client + 'core/Footer/FooterController.js');
// JS Classes
src.js.push(dir.shared + 'classes/ContactInfoClass.js');
src.js.push(dir.shared + 'classes/CountryClass.js');
// Tests
src.js.push(dir.client + 'core/RegistrationModule.test.js');
src.js.push(dir.shared + 'classes/ContactInfoClass.test.js');
src.js.push(dir.shared + 'classes/CountryClass.test.js');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: src.js,


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
}