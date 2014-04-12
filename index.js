var metalsmith = require('metalsmith');
var prompt = require('metalsmith-prompt');
var templates = require('metalsmith-templates');

var usage = "usage: dinoseed <seed name>";

var seedName = process.argv[2];

if (!seedName) {
  console.log("seed name not given!");
  console.log(usage);
  process.exit(1);
}

var seedPath = __dirname + "/" + seedName;
var seed;

try {
  seed = require(seedPath + '.json');
} catch (err) {
  console.log("seed does not exist!");
  console.log(usage);
  process.exit(2);
}

var cwd = process.cwd();

metalsmith(__dirname)
  .source(seedPath)
  .destination(cwd)
  .use(prompt(seed.prompt))
  .use(templates(seed.template))
  .build()
