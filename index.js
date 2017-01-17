#!/usr/bin/env node
//console.log('Hello, world!');
var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var shell = require("shelljs");
var languageFinder = require('./commandFinder');
var languageLiner = require('./commandLiner');
var languageEdit = require('./commandEdit');

//find correct command for file extension 

//todo:
//add and update languages
//find

program
 .arguments('<file>')
 .action(function(file) {
	 var languageObj = languageFinder.find(file)
	 var oneLiner = languageLiner.line(languageObj, file)
	 //console.log(languageObj.path)
	 //console.log(chalk.bold.cyan('found file: ' + file ));
	 //shell.exec(languageObj.path + " " + file);
	 shell.exec(oneLiner);
	 //console.log(program.args[0]);
	 //languageFinder.list();
 });
 
program
  .command('list')
  .action(function(){
    languageFinder.list();
  });
  
program
  .command('change')
  .action(function(){
    console.log("change language attributes")
  });  
  
program
  .command('watch')
  .arguments('<file>')
  .action(function(file){
	console.log("watching " + file + "...");
    var languageObj = languageFinder.find(file);
    var oneLiner = languageLiner.line(languageObj, file);
    shell.exec("nodemon --exec " + oneLiner);

  });  
  
program
  .version('electric 0.0.1')
  .command('versions')
  .action(function(){
    console.log("log all language versions")
  });    

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $ electric list        (shows languages setup)');
	console.log('    $ electric versions	   (shows versions of setup languages)');
	console.log('    $ electric watch	   (watches file and runs it when it is saved)');
    console.log('    $ electric change ruby --extension rb --firstcommand ruby');
    console.log('    $ electric change C/C++ --extension c|cpp --firstCommand make --secondCommand none --isCompiled true');
  });  

 program.parse(process.argv);