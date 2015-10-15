# gulp-tsconfig-update

[![Build Status](https://travis-ci.org/laco0416/gulp-tsconfig-update.svg)](https://travis-ci.org/laco0416/gulp-tsconfig-update)

A gulp plugin to update `files` property in tsconfig.json by `gulp.src` glob.

## Install

```
npm install --save-dev gulp-tsconfig-update
```

## Usage

```
var gulp = require("gulp");
var tsConfig = require('gulp-tsconfig-update');

gulp.task('tsConfig', function() {
  return gulp.src("./src/**/*.ts")
      .pipe(tsConfig());
});
```

## Notes

* If `./tsconfig.json` exists, its `files` property is overwritten.

* If `./tsconfig.json` doesn't exist, this plugin will generate the file similar to that created by `tsc --init`.

* You can use user-defined default config.

```js
var gulp = require("gulp");
var tsConfig = require('gulp-tsconfig-update');

gulp.task('tsConfig', function() {
  return gulp.src("./src/**/*.ts")
      .pipe(tsConfig({
        defaultConfig: {
           compilerOptions: {
               module: "commonjs",
               target: "es5",
               noImplicitAny: true
           }
        }
      }));
});
```
