#!/usr/bin/env node

var stdio = require('stdio');
var chalk       = require('chalk');
var CLI         = require('clui');
var figlet      = require('figlet');
var fs = require("fs");
var fs_copy = require("fs-extra")
var Spinner     = CLI.Spinner;



console.log(
    chalk.blue(
        figlet.textSync('Report-Mine', { horizontalLayout: 'full' })
    )
);

var ops = stdio.getopt({
    'json': {key: '-json', args: 1
        , description: 'Path to the json file'},
});

// var report_path = process.argv[2];
// console.log(report_path)
var mv = require('mv');
var path = require('path');
global = path.resolve(__dirname);
console.log(global + '/node_modules/bluebird')
fs_copy.copy(global + '/node_modules/bluebird', global, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("success!");
    }
});

var status = new Spinner('Generating Reports, please wait...');
status.start();
