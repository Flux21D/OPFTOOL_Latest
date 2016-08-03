var path = require('path'); //File System
fs=require('fs'); //FileSystem
var argv=require('optimist').argv; //Arguments
var writetofile=require('./libs/writetofile'); //file writer
var readfile=require('./libs/readfile'); //file writer
var underscore=require('./libs/underscore.js'); //file writer

//var input = 'D:\\Dinesh\\BEC\\ePub_Splitting';

var input = argv.i;
var database = [];

fromDir(input,'.html');
jsonString = JSON.stringify(database);

fs.writeFileSync(input + '\\database.json',jsonString);

function fromDir(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
			item = {}
			item ["folderName"] = files[i];
			coverImageTravels(files[i],filename,files[i]);
			database.push(item);
		}
		else if (filename.indexOf(filter) >= 0) {}
		else {};
    };
};

function coverImageTravels(fileName,filePath,titleFolderName){

	if(!fs.existsSync(filePath)){
		console.log("no dir ", filePath);
		return;
	}
	
	var files = fs.readdirSync(filePath);
	for(var f=0; f<files.length; f++){
		filename = path.join(filePath, files[f]);
		var stat = fs.lstatSync(filename);
		if(stat.isDirectory()){
			coverImageTravels(files[f],filename,titleFolderName);
		}
		else{
			
			if(filename.toString().indexOf('\\cover.jpg')>=0){
				item ["coverImage"] = filename;
			}
			else{}
		}
	}
}


/* 
 */





