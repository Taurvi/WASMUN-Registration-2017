# WASMUN Registration Website (2017)
## Contents
1. [Overview](#overview)
2. [Technologies Used](#technologies_used)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Registration Class Diagram](#registration_class_diagram)


## Overview
Yet another pretty Angular project for the non-profit, Washington State Model United Nations (WASMUN). This application will integrate with Google Spreadsheets and allow high schools to register for the 2017 conference.

### Technologies Used
**Package Managers:** NodeJS, Bower

**Minifiers:** gulp (concat, uglify, imagemin)

**Framework:** AngularJS

**CSS:** Angular-Strap

**Fonts:** Font Awesome

## Requirements
* Node (v4.6.0)
* NPM (v2.15.9)
* Bower (1.8.0)
* Gulp (v3.9.1)

## Installation
1. Clone the repository to your desired folder.
2. Execute `npm install`.
3. Execute `npm run bower install`.
4. Execute tests.
    * Karma (Angular): Execute `npm run karma`
    * Mocha (NodeJS): Execute `npm run mocha`
5. Decide if you are running development or production.
    * DEVELOPMENT: Execute `npm run gulp` or `NODE_ENV=development npm run gulp`
        * Development merely copies over the files. This makes debugging easy.
    * PRODUCTION: Execute `NODE_ENV=production npm run gulp`
        * Production minifies all the files and condenses them down as much as possible. Debuggins is very tricky.
6. Run a server (if you already have one, ignore this step).
    * Python
        * Navigate to the `/public` directory
        * Execute `python -m SimpleHTTPServer`
9. Open up `/public/index.html`
    * Python
        * Navigate to `127.0.0.1:8000` in your browser.
    * WebStorm
        * Open the `/public` directory, right click, and open in your desired web browser
10. ???
9. 💸

## Registration Class Diagram
![UML Diagram](https://raw.githubusercontent.com/Taurvi/WASMUN-Registration-2017/master/Registration%20UML%20Diagram.png)