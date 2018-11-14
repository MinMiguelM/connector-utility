#!/usr/bin/env node

const IO = require('./src/createIO');
const doc = require('./src/createDoc');
const package = require('./package');

var opts = require('node-getopt').create([
        ['y', 'yaml=PATH', 'Path to the YAML file to read inputs/outputs from.', 'doc.yml'],
        ['b', 'bizc=PATH', 'Path to the output bizc file with the updated inputs/output. If no path is specified, the script will overwrite the bizc file used as input.'],
        ['d', '', 'Generate documentation from the description specified in the YAML document.'],
        ['v', 'version', 'Print bizc version']
    ])
    .setHelp(
        "Usage:\n" +
        "  bizc <connector_name> [OPTIONS]\n" +
        "  <connector_name> is the connector name (with or without .bizc extension) that you want to set the inputs/outputs of.\n" +
        "\n" +
        "Options:\n" +
        "[[OPTIONS]]\n" +
        "\n"
    )
    .bindHelp()
    .parseSystem();

if (opts.options.version) {
    console.info(`v${package.version}`);
    process.exit(0);
}

if (opts.argv.length !== 1) {
    console.info(opts.getHelp());
    process.exit(1);
}

IO.init(opts.argv[0], opts.options.yaml, opts.options.bizc);

if(opts.options.d) {
    doc.generateDocFile(opts.options.yaml);
}

