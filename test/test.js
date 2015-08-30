var assert = require("chai").assert;
var fs = require("fs");

var plugin = require("../lib/Index");

describe("gulp-tsconfig-update", function () {

  var defaultConfig = {
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
  };

  var files = [
    "./src/bar.ts",
    "./src/foo.ts"
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