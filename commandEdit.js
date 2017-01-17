var fs = require('fs');
var fileName = './languages.json';
var file = require(fileName);

function changeExtension(lang, newExtension){
	
   file[lang].extension = newExtension;
	
	fs.writeFile(fileName, JSON.stringify(file, null, 4), function (err) {

  	  if (err) return console.log(err);
  		console.log(JSON.stringify(file));
  	  	console.log('writing to ' + fileName);
  
  
	});

}

//example
//changeExtension("python","/Library/Frameworks/Python.framework/Versions/3.4/bin/python3");

module.exports = {
    change: changeExtension
};