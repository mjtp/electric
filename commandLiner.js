


function lineMaker(mode, filename){
	
	var line = null;
	
	if(mode.compiled === false){
		//interpreted style; 1 command.
		
		var path = mode.path.replace(/\s/g, '');
		
		line = path + " " + filename;
		
				
	}else if (mode.compiled === true){		
		//compiled style; 2 commands.
		var path = mode.path.replace(/\s/g, '');
		var path2 = mode.path2.replace(/\s/g, '');
		var extensionLess = filename.replace(/\..+$/, '').replace(/\s/g, '');
		
		//check if 
		
		if (path2 === ""){
			
			line = mode.path + " " + filename + "&& " + path2 + " ./" + extensionLess;
			
	    }else{
			
	    	line = mode.path + " " + filename + "&& " + path2 + " " + extensionLess;
		}
		//console.log(line);
		
		
	}else{
		
		return
	}
	
	
	return line;
	
	
}







module.exports = {
    line: lineMaker
};
