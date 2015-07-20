/**
 * Created by Bhavin on 7/19/2015.
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var html = fs.readFileSync('./public/clerknotes/index.html', 'utf8');
var loremhtml = fs.readFileSync('./lorem_tmpl.html', 'utf8');

var options = { format: 'Letter' };

var app = express();

if (cluster.isMaster) {

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    Object.keys(cluster.workers).forEach(function(id) {
        console.log("I am running with ID : "+cluster.workers[id].process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {

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


    app.get('/api/printpdf1', function (req, res) {
        console.log('request made....print 1 ');
        pdf.create(html).toStream(function(err, stream){
            console.log(stream);
            stream.pipe(res);
        });
    });

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


}

app.listen(port);
console.log('node server for html-pdf is running on port ' + port);

