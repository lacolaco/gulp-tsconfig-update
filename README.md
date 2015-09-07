# gulp-tsconfig-update

[![Circle CI](https://circleci.com/gh/laco0416/gulp-tsconfig-update.svg?style=svg)](https://circleci.com/gh/laco0416/gulp-tsconfig-update)

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

* If `./tsconfig.json` doesn't exist, this plugin will generate the file with default options like below.

```
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "declaration": false,
        "noImplicitAny": true,
        "removeComments": false,
        "noLib": false,
        "preserveConstEnums": false,
        "suppressImplicitAnyIndexErrors": false
    }
}
```
