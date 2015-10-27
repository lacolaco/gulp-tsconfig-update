///<reference path="../typings/bundle.d.ts"/>
///<reference path="TsConfig.d.ts"/>
"use strict";
var path = require("path");
var fs = require("fs");
var gutil = require("gulp-util");
var through = require("through");
var PluginError = gutil.PluginError;
function defaultTsConfig() {
    var initiated = require("./_tsconfig.json");
    return initiated;
}
var plugin = function (pluginOptions) {
    pluginOptions = pluginOptions || {};
    var tsConfigPath = "./tsconfig.json";
    var tsConfig;
    if (pluginOptions.defaultConfig) {
        tsConfig = pluginOptions.defaultConfig;
    }
    else if (fs.existsSync(tsConfigPath)) {
        tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf-8"));
    }
    else {
        tsConfig = defaultTsConfig();
    }
    var tsFiles = [];
    return through(function write(file) {
        if (file.isNull()) {
            return;
        }
        if (file.isStream()) {
            gutil.log(new PluginError("gulp-tslint", "Streaming not supported: " + file.path));
            return;
        }
        tsFiles.push(file);
        this.emit("data", file);
    }, function end() {
        tsConfig.files = tsFiles.map(function (file) {
            return path.relative(file.cwd, file.path).replace(/\\/g, "/");
        });
        fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 4), "utf-8");
        this.emit("end");
    });
};
module.exports = plugin;
