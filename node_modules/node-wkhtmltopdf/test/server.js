var http = require('http'),
    url = require('url'),
    wkhtmltopdf = require('../index.js');

const PORT=8080;

/**
 * Handle request
 * @param req
 * @param res
 */
function handleRequest(req, res){
    var params = url.parse(req.url,true).query;

    var input,
        options;

    if (params.input) {
        input = params.input;
    } else if (req.input) {
        input = req.input;
    } else {
        input = 'http://google.com';
    }

    if (req.options) {
        options = req.options;
    } else {
        var options = [
            '--header-center TEST',
            '--header-font-size 20',
            '--header-spacing 1',
            '--margin-top 10'
        ];
    }

    var doc = wkhtmltopdf(options, input);

    doc.stdout.pipe(res);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'inline; filename=test.pdf'
    });
}

// Create server
var server = http.createServer(handleRequest);

// Server listen
server.listen(PORT, function(){
    console.log('Server listening on: http://localhost:%s\n', PORT);
});

module.exports = server;