// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      // ng2-redux
      'redux/dist/redux.js',
      'ng2-redux/lib/**/*.+(js|js.map)',
      // angular material
      '@angular2-material/**/*.js',
      // redux-api-middleware and its dependencies !
      'redux-api-middleware/lib/**/*.+(js|js.map)',
      'babel-runtime/**/*.+(js|js.map)',
      'regenerator-runtime/*.+(js|js.map)',
      'node-fetch/**/*.+(js|js.map)',
      'lodash.isplainobject/*.+(js|js.map)',
      'lodash._basefor/*.+(js|js.map)',
      'lodash.isarray/*.+(js|js.map)',
      'lodash.isarguments/*.+(js|js.map)',
      'lodash.keysin/*.+(js|js.map)',
      'isomorphic-fetch/*.+(js|js.map)',
      'whatwg-fetch/*.+(js|js.map)',
      'core-js/**/*.+(js|js.map)',
      // redux-thunk
      'redux-thunk/dist/*.+(js|js.map)',
      // @vaadin/angular2-polymer
      '@vaadin/**/*.+(js|js.map)'
    ]
  });
};
