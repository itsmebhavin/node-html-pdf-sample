/**
 * Created by Bhavin on 7/19/2015.
 */
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var html = fs.readFileSync('./businesscard_tmpl.html', 'utf8')
var loremhtml = fs.readFileSync('./lorem_tmpl.html', 'utf8');

var options = { format: 'Letter' };


var app = express();
var port = process.env.port || 1350;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/printpdf1', function (req, res) {
    /*
    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
    */

    console.log('request made....print 1 ');
    pdf.create(html).toStream(function(err, stream){
        console.log(stream);
        stream.pipe(res);
        //res.end();
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


app.listen(port);
console.log('node server for pdfkit is running on port ' + port);
