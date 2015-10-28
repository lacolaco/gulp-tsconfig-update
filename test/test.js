var assert = require("chai").assert;
var fs = require("fs");

var plugin = require("../lib/Index");

describe("gulp-tsconfig-update", function () {

  var defaultConfig = require("./_tsconfig.json");

  var files = [
    "src/bar.ts",
    "src/foo.ts",
    "src2/src3/bar.ts",
    "src2/src3/foo.ts",
    "src2/src4/bar.ts",
    "src2/src4/foo.ts",
    "src2/src5/bar.ts",
    "src2/src5/foo.ts",
    "src2/bar.ts",
    "src2/foo.ts"
  ];

  it("generates expected json", function () {
    var json = fs.readFileSync("./tsconfig.json", "utf-8");
    assert.isNotNull(json);
    var config = JSON.parse(json);
    Object.keys(defaultConfig).forEach(function (key) {
      assert.deepEqual(defaultConfig[key], config[key]);
    });
    assert.isNotNull(config.files);
    assert.deepEqual(files, config.files);
  });
});
