var path = require('path'); //File System
fs=require('fs'); //FileSystem

var express =   require("express");
var multer  =   require('multer');
var app         =   express();

var bodyParser = require('body-parser');
var ejs = require('ejs')
var request = require('request');

app.set('views',__dirname + '/Views/html');
app.use(express.static(__dirname + '/Views/bin'));
app.use(express.static(__dirname + '/Views/bin/JS'));
app.use(express.static(__dirname + '/Views/bin/CSS'));
app.use(express.static(__dirname + '/Views/libs'));
app.use(express.static(__dirname + '/Views/bin/images'));
app.use(express.static(__dirname + '/Views/bin/Title_Images'));
app.use(express.static(__dirname + '/Views/bin/JSON'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());


/* Storage Settings */
var maxSize = 2 * 1000 * 1000;
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	var datatimestamp = Date.now();
	var fileExtension = file.originalname.split('.')[file.originalname.split('.').length-1];
	var fileName = file.originalname.toString().replace('.' + fileExtension,'');
    callback(null, fileName + '-' + Date.now() + '.' + fileExtension);
  }
});

var upload = multer({
	storage : storage,
	fileFilter : function(req, file, callback) { //file filter
					if (['zip'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
						return callback(new Error('Wrong extension type'));
					}
					callback(null, true);
				}
	}).single('userPhoto');

app.get('/',function(req,res){
	res.render('index.html');
});

app.post('/process',function(req,res){
    upload(req,res,function(err) {
        if(err) {
			return res.end("Error uploading file" + err);
        }
		if(!req.file){
			return res.end('No Files are uploaded');
		}
		if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'zip'){
			var fileSize = ((req.file.size)/1024)/1024;
			if(fileSize > 2){
				return res.end('File Size is too high, please download the latest version of software');
			}
			var filePath = __dirname + '/' + req.file.path;
		}
        res.end(res.render('home.html'));
    });
});

app.post('/process',function(req,res){
	fs.writeFileSync(__dirname + '/Views/bin/JSON/database.json',JSON.stringify(req.body, null, 4));
});


app.listen(3000,function(){
    console.log("Working on port 3000");
});