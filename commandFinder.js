var fs = require('fs');
var fileName = './languages.json';
var file = require(fileName);
var shell = require("shelljs");
var
  csv = require('csv'),
  Table = require('cli-table')
  ;



var modes = [];


function getModeForPath(path) {
	
    var mode = null;
	
    var fileName = path.split(/[\/\\]/).pop();
	
	
    for (var i = 0; i < modes.length; i++) {
        if (modes[i].supportsFile(fileName)) {
            mode = modes[i];
			//console.log(mode);
            break;
        }
    }

    return mode;
}



var Mode = function(path, path2, compiled, name, extensions) {
	
   this.name = name;
   this.extensions = extensions;
	this.path = path;
	this.path2 = path2;
	this.compiled = compiled;
	
	
    if (/\^/.test(extensions)) {
        var re = extensions.replace(/\|(\^)?/g, function(a, b){
            return "$|" + (b ? "^" : "^.*\\.");
        }) + "$";
    } else {
        var re = "^.*\\.(" + extensions + ")$";
    }

    this.extRe = new RegExp(re, "gi");
};

Mode.prototype.supportsFile = function(filename) {
	//console.log("filename: " + filename);
    return filename.match(this.extRe);
};


//stringify json file
var jsonString = JSON.stringify(file);

//turn into standard javascript object
var supportedModes =  JSON.parse(jsonString);

//object to turn into mode
var modesByName = {};

for (var name in supportedModes) {
	
	var modeObject = supportedModes[name];	
    var data = modeObject.extension;	
	var path = modeObject.path;	
	var path2 = modeObject.path2;	
	var compiled = modeObject.compiled;	
    var filename = name.toLowerCase();
    var mode = new Mode(path, path2, compiled, filename, data);
		
    modesByName[name] = mode;

    modes.push(mode);


}

function listModes(){
	//stringify json file
	var jsonString = JSON.stringify(file);

	//turn into standard javascript object
	var supportedModes =  JSON.parse(jsonString);

  var output =
    'Language,Extension,First Command,Second Command,Compiled?\n';	

	
	function loopFunction(callback){

		for (var name in supportedModes) {	
			
			
			var modeObject = supportedModes[name];	
		    var data = modeObject.extension;	
			var path = modeObject.path;	
			var path2 = modeObject.path2;	
			var compiled = modeObject.compiled;			
			output = output + name + "," + data + "," + path + "," + path2 + "," + compiled + "\n";
	
		}

	  return callback(function(){
	    return true;
	  });
	}
	function tableFunction(callback){
	    csv().from.string(output).to.array(function(output) {  
	      var
	        headers = output[0],
	        values = output.slice(1),
	        table = new Table({ head: headers })
	        ;

	      table.push.apply(table, values);
	      console.log(table.toString());
	    });

	  return callback();
	}

	loopFunction(tableFunction);

}


module.exports = {
    find: getModeForPath,
	list: listModes
};

              
            