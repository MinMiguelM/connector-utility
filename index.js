#!/usr/bin/env node

const yaml = require('yaml');
const fs = require('fs');
const extract = require('extract-zip');
const IO = require('./src/createIO');
const doc = require('./src/createDoc');

var opts = require('node-getopt').create([
        ['y', 'yaml=PATH', 'Path to the YAML file to read inputs/outputs from.', 'doc.yml'],
        ['b', 'bizc=PATH', 'Path to the output bizc file with the updated inputs/output. If no path is specified, the script will overwrite the bizc file used as input.'],
        ['d', '', 'Generate documentation from the description specified in the YAML document.']
    ])
    .setHelp(
        "Usage:\n" +
        // TODO: que se pueda especificar el bizc con o sin la extension
        "  biz <bizc> [OPTIONS]\n" +
        "  <bizc> is the connector name (without the .bizc extension) that you want to set the inputs/outputs of.\n" +
        "\n" +
        "Options:\n" +
        "[[OPTIONS]]\n" +
        "\n"
    )
    .bindHelp()
    .parseSystem();

console.log(opts.options);

// console.log(opts.argv);

if (opts.argv.length !== 1) {
    console.info(opts.getHelp());
    process.exit(1);
}

IO.init(opts.argv[0], opts.options.yaml, opts.options.bizc);

if(opts.options.d) {
    doc.generateDocFile(opts.options.yaml);
}

