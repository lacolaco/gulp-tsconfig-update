///<reference path="../typings/bundle.d.ts"/>
///<reference path="TsConfig.d.ts"/>

"use strict";

import path = require("path");
import fs = require("fs");
import gutil = require("gulp-util");
import through = require("through");
import vinylFile = require("vinyl");
import promise = require("es6-promise")

let PluginError: any = gutil.PluginError;

function defaultTsConfig(): model.TsConfig {
  let initiated: any = require("./_tsconfig.json");
  return <model.TsConfig>initiated;
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

  return through(
      function write(file: vinylFile) {
        if (file.isNull()) {
          return;
        }
        if (file.isStream()) {
          gutil.log(new PluginError("gulp-tslint", `Streaming not supported: ${file.path}`));
          return;
        }
        //gutil.log("glob hits: ", file.relative);
        tsFiles.push(file);
        this.emit("data", file);
      },
      function end() {
        tsConfig.files = tsFiles.map((file)=> {
          return file.path.replace(file.cwd, ".").replace(/\\/g,"/");
        });
        fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 4), "utf-8");
        this.emit("end")
      });
};

module.exports = plugin;
