///<reference path="../typings/bundle.d.ts"/>
///<reference path="TsConfig.d.ts"/>

"use strict";

import path = require("path");
import fs = require("fs");
import gutil = require("gulp-util");
import through = require("through");
import vinylFile = require("vinyl");
import promise = require("es6-promise")

let map: any = require("map-stream");
let PluginError: any = gutil.PluginError;
let RcLoader: any = require("rcloader");

function defaultTsConfig(): model.TsConfig {
  return <model.TsConfig>{
    compilerOptions: {
      target: "es5",
      module: "commonjs",
      declaration: false,
      noImplicitAny: true,
      removeComments: false,
      noLib: false,
      preserveConstEnums: false,
      suppressImplicitAnyIndexErrors: false
    }
  }
}

let plugin = (pluginOptions: model.PluginOption) => {
  pluginOptions = pluginOptions || <model.PluginOption>{};

  let tsConfigPath = pluginOptions.configFile || "./tsconfig.json";
  let tsConfig: model.TsConfig;
  if (fs.existsSync(tsConfigPath)) {
    tsConfig = <model.TsConfig>JSON.parse(fs.readFileSync(tsConfigPath, "utf-8"));
  } else {
    tsConfig = defaultTsConfig();
  }

  let tsFiles = <vinylFile[]>[];

  let updateTsConfig = () => {
    tsConfig.files = tsFiles.map((file)=> {
      return file.path.replace(file.cwd, ".");
    });
    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 4), "utf-8");
    //gutil.log("update json: ", tsConfigPath);
  };

  return through(function (file: vinylFile) {
    if (file.isNull()) {
      return;
    }
    if (file.isStream()) {
      gutil.log(new PluginError("gulp-tslint", `Streaming not supported: ${file.path}`));
      return;
    }
    //gutil.log("glob hits: ", file.relative);
    tsFiles.push(file);
  }, updateTsConfig);
};

module.exports = plugin;