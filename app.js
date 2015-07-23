/**
 * Created by bpatel on 7/20/2015.
 */

var express = require('express');
var http = require('http');
var path = require ('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var nunjucks = require('nunjucks');
var html = fs.readFileSync('./public/nunjucks.tmpl.html', 'utf8');
var loremhtml = fs.readFileSync('./lorem_tmpl.html', 'utf8');


var routes = require('./routes');
var app = express();

//Nunjucks is a product from Mozilla and we are using it as a template engine.
exports.env = nunjucks.configure('public', {
    autoescape: true,
    express: app
});

var port = process.env.port || 1350;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Add headers for CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/printpdf1', routes.printpdf1);

app.get('/api/printpdf2', function (req, res) {
    /*
     pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
     if (err) return console.log(err);
     console.log(res);
     });
     */

    console.log('request made.... print 2 ');
    pdf.create(loremhtml).toBuffer(function(err, buffer){
        console.log('This is a buffer:', Buffer.isBuffer(buffer));
        res.download(buffer);
    });

});

app.get('/api/getsampledataforreport',function(req,res){
    var data = {
        applications:[
            {id:1, app:'Cite'},
            {id:2, app:'Crash'},
            {id:3, app:'Vault'},
            {id:4, app:'Crime'}
        ]
    };
    res.json(data);
});

app.listen(port);
console.log('node server for html-pdf is running on port ' + port);

