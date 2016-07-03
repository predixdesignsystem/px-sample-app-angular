// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  redux: 'vendor/redux/dist/redux.js',
  'ng2-redux': 'vendor/ng2-redux/lib',
  '@angular2-material': 'vendor/@angular2-material',

  // redux-api-middleware and its dependencies!
  'redux-api-middleware': 'vendor/redux-api-middleware/lib',
  'babel-runtime': 'vendor/babel-runtime',
  'regenerator-runtime': 'vendor/regenerator-runtime',
  'lodash.isplainobject': 'vendor/lodash.isplainobject/index.js',
  'lodash._basefor': 'vendor/lodash._basefor/index.js',
  'lodash.isarray': 'vendor/lodash.isarray/index.js',
  'lodash.isarguments': 'vendor/lodash.isarguments/index.js',
  'lodash.keysin': 'vendor/lodash.keysin/index.js',
  'isomorphic-fetch': 'vendor/isomorphic-fetch',
  'whatwg-fetch': 'vendor/whatwg-fetch/fetch.js',
  'core-js': 'vendor/core-js',
  'node-fetch': 'vendor/node-fetch'
};

/** User packages configuration. */
const packages: any = {
  'ng2-redux': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index'
  },
  '@angular2-material/core': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'core.js'
  },
  '@angular2-material/card': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'card.js'
  },
  '@angular2-material/button': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'button.js'
  },
  'redux-api-middleware': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  'babel-runtime': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'babel-runtime/regenerator': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  'regenerator-runtime': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'runtime-module.js'
  },
  'lodash.isplainobject': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'lodash._basefor': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'lodash.isarray': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'lodash.isarguments': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'lodash.keysin': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'isomorphic-fetch': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'fetch-npm-browserify.js'  // for browser!
  },
  'whatwg-fetch': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'core-js/library': {
    format: 'cjs',
    defaultExtension: 'js',
  },
  'core-js/library/fn/symbol': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/workspaces/workspace-card',
  'app/workspaces/workspace-list',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
