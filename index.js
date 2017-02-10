#!/usr/bin/env node

var stdio = require('stdio');
var chalk  = require('chalk');
var CLI    = require('clui');
var figlet = require('figlet');
var fs = require("fs");
var fs_copy = require("fs-extra")
var Spinner = CLI.Spinner;
var path = require('path');
var findRemoveSync = require('find-remove')



console.log(
    chalk.blue(
        figlet.textSync('Report-Mine', { horizontalLayout: 'full' })
    ))

var ops = stdio.getopt({
    'json': {key: 'results.json', args: 0
        , description: 'Path to the json file'},
});

var mv = require('mv');
var path = require('path');
global = path.resolve(__dirname);

var status = new Spinner('Generating Reports, please wait...');
status.start();
console.log(global)
fs_copy.copy(global , process.argv[2]+"/report-mine" , function (err) {
    if (err) {
        status.stop();
    } else {
        findRemoveSync(process.argv[2]+"/report-mine", {dir: 'node_modules',
            extensions: ['.json', '.md'], files: ['index.js', '.npmignore']})
        if (fs.existsSync(process.argv[2]+"/report-mine/data/")) {
            fs_copy.move(process.argv[2]+"/results.json", process.argv[2]+"/report-mine/data/results.json" , function (err) {
                if (err) return console.error(err + "Please provide path to results to results.json")
                console.log("success!")
            });
        }
        status.stop();
    }
});


