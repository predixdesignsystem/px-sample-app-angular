# Angular 2 + Polymer Seed

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.14.
 On top of the base generated project, it has
* Basic scaffolding needed for use of Polymer elements. If follows the pattern established in Vaadin's [Polymer in Angular CLI Webpack Applications](https://github.com/vaadin/angular2-polymer/blob/master/docs/ng-cli-webpack.adoc), and includes [vaadin/angular2-polymer](https://github.com/vaadin/angular2-polymer). [src/elements.html](src/elements.html) lists all Polymer elements used by the app. [src/app/test.component.ts](src/app/test.component.ts) illustrates several patterns of Angular 2 databinding with Polymer's paper-checkbox.
* Angular Material integration
* Angular Router 3.0 integration

## Setup

* Clone the repository and [install Angular 2 CLI](https://github.com/angular/angular-cli/blob/master/README.md#installation)
* Run `npm install`
* Run `bower install`
* Patch webpack-build-common.js (see SASS Include Path under Known Problems)

At this point you should be able to run `ng serve` as described below.
If you need to do `ng build` on Windows, see EMFILE under Known Problems.

## Known Problems

### SASS Include Path

(Instructions updated for Angular CLI v1.0.0-beta.22)

In `node_modules\angular-cli\models\webpack-build-\[development,production,test\].js` add the following `sassLoader` key under `webpack.LoaderOptionsPlugin` options:

```js
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {  // all options here: https://github.com/sass/node-sass
            includePaths: [ path.resolve(projectRoot, appConfig.root, appConfig.assets,'bower_components') ]
        }
      }
    })
```

Here is why: Predix UI CSS (and pxh-chrome) Sass stylesheets use imports like `@import px-defaults-design/…` (px-default-design is a bower component); so 'bower\_components' has to be added to [node-sass includePaths](https://github.com/sass/node-sass#includepaths), via [sass-loader options](https://github.com/jtangelder/sass-loader#sass-options) in webpack configuration. Angular CLI does not yet allow customization of webpack config ([angular-cli#1656](https://github.com/angular/angular-cli/issues/1656)); so for now one has to patch the built-in one (node_modules\angular-cli\models\webpack-build-\[development,production,test\].js).

### EMFILE "too many open files" error when building on Windows

With many components in bower_components included in assets, `ng build` on Windows will likely fail with EMFILE, "too many open files" (`ng serve` will work fine, it does not use the filesystem.) This is due to webpack/copy-webpack-plugin hitting the Windows/CRT limit of 2048 open files ([kevlened/copy-webpack-plugin#59](https://github.com/kevlened/copy-webpack-plugin/issues/59#issuecomment-248443224)) Until there is a better solution, patch node\_modules\angular-cli\node\_modules\webpack\lib\Compiler.js as described in the referenced comment.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
