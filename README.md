# Angular 2 + Polymer Seed

This project was generated with [angular-cli](https://github.com/angular/angular-cli).
 On top of the base generated project, it has
* Basic scaffolding needed for use of Polymer elements. If follows the pattern established in Vaadin's [Polymer in Angular CLI Webpack Applications](https://github.com/vaadin/angular2-polymer/blob/master/docs/ng-cli-webpack.adoc), and includes [vaadin/angular2-polymer](https://github.com/vaadin/angular2-polymer). The [src/elements.html](src/elements.html) file lists all of the Polymer-based Predix components used by the app.
* Angular Router 3.0 integration

## Setup

* Clone the repository and [install Angular 2 CLI](https://github.com/angular/angular-cli/blob/master/README.md#installation)
* Run `npm install`
* Run `bower install`

At this point you should be able to run `ng serve` as described below.
If you need to do `ng build` on Windows, see EMFILE under Known Problems.

## Known Problems

### EMFILE "too many open files" error when building on Windows

With many components in bower_components included in assets, `ng build` on Windows will likely fail with EMFILE, "too many open files" (`ng serve` will work fine, it does not use the filesystem.) This is due to webpack/copy-webpack-plugin hitting the Windows/CRT limit of 2048 open files ([kevlened/copy-webpack-plugin#59](https://github.com/kevlened/copy-webpack-plugin/issues/59#issuecomment-248443224)) Until there is a better solution, patch node\_modules\angular-cli\node\_modules\webpack\lib\Compiler.js as described in the referenced comment.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
