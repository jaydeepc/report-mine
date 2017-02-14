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
var colors = require('colors/safe');
var express = require('express');

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
fs_copy.copy(global , process.argv[2]+"/report-mine" , function (err) {
    if (err) {
        status.stop();
        return console.log(colors.red.bold("Please provide the directory of results.json"));
    } else {
        findRemoveSync(process.argv[2]+"/report-mine", {dir: 'node_modules',
            extensions: ['.json', '.md'], files: ['index.js', '.npmignore']})
        if (fs.existsSync(process.argv[2]+"/report-mine/data/")) {
            fs_copy.copy(process.argv[2]+"/result.json", process.argv[2]+"/report-mine/data/result.json" , function (err) {
                if (err) return console.error(err + "Please provide path to results to results.json")
                console.log(colors.green.bold("Success! Ported json to ReportMine. Ready to Serve"))
            });
        }
        status.stop();
    }
});

var findPort = require('find-port')

findPort('localhost', 6001, 8001, function(ports) {
    var StaticServer = require('static-server');
    var server = new StaticServer({
      rootPath: process.argv[2]+"/report-mine",
      port: ports[0],
      host: 'localhost',
      followSymlink: true,
      templates: {
        index: 'views/summary.html',
        notFound: '404.html'
      }
    });

    server.start(function (err) {
      if(err){
        console.log(err);
      }
      else{
        console.log(colors.yellow.bold('ReportMine server started in: ', "http://" + server.host + ":" + server.port));
      }

    });
})








