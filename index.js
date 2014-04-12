var path = require('path');
var metalsmith = require('metalsmith');
var prompt = require('metalsmith-prompt');
var templates = require('metalsmith-templates');

var usage = "usage: dinoseed <directory> <seed name>";

var dir = process.argv[3];
if (!dir) {
  console.log("directory not given!");
  console.log(usage);
  process.exit(1);
}

var seedName = process.argv[3];
if (!seedName) {
  console.log("seed name not given!");
  console.log(usage);
  process.exit(1);
}

var seedPath = "./" + seedName;
var seed;

try {
  seed = require(seedPath + '.json');
} catch (err) {
  console.log("seed does not exist!");
  console.log(usage);
  process.exit(2);
}

var cwd = process.cwd();
var cwdRelative = path.relative(__dirname, cwd);
var dirRelative = path.join(cwdRelative, dir);

metalsmith(__dirname)
  .source(seedPath)
  .destination(dirRelative)
  .use(prompt(seed.prompt))
  .use(templates(seed.templates))
  .build(function (err) {
    if (err) { throw err; }
  });
