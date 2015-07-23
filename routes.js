/**
 * Created by Bhavin on 7/22/2015.
 */

var pdf = require('html-pdf');
var appmodule = require('./app');
var report_options =
{
    "format": "Letter",
    "border": {
        "top": "0.5in",
        "right": "1in",
        "bottom": "0in",
        "left": "1in"
    },
    "footer": {
        "contents": '<span style="color: #444;">Page {{page}}</span>/<span>{{pages}}</span>'
    }
};

exports.printpdf1 = function (req, res) {
    var today = new Date();
    var obj = {
        date: today,
        data:{
            ticketnum : 12121212,
            dateissued: '2014-04-02',
            officername: 'john doe',
            notes:'lorem epsum'
        }
    };

    var renderedHtml =  appmodule.env.render('nunjucks.tmpl.html',obj);
    pdf.create(renderedHtml,report_options).toStream(function(err, stream){
        console.log(stream);
        stream.pipe(res);
    });
};