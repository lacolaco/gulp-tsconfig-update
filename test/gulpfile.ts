///<reference path="../typings/bundle.d.ts"/>

import gulp = require("gulp");
import del = require("del");
import runSequence = require("run-sequence");

let tsConfig: any = require('../index');

gulp.task("clean", (cb)=> {
  return del(["./tsconfig.json"], cb);
});

gulp.task('tsconfig', () => {
  return gulp.src([
    "./src/**/*.ts",
    "./src2/**/*.ts"
  ]).pipe(tsConfig({
    defaultConfig: require("./_tsconfig.json")
  }));
});

gulp.task('default', (cb) => {
  runSequence("clean", "tsconfig", cb);
});
