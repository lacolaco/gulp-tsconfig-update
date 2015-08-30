///<reference path="../typings/bundle.d.ts"/>

import gulp = require("gulp");
import del = require("del");

let tsConfig: any = require('../index');

gulp.task("clean", (cb)=> {
  del("./tsconfig.json", cb);
});

gulp.task('default', ["clean"], () => {
  return gulp.src("./src/**/*.ts")
      .pipe(tsConfig({
        configFile: "./tsconfig.json"
      }))
      .pipe(gulp.dest("./"));
});
