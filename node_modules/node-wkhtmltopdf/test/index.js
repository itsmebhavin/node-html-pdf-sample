'use strict';

var expect = require('Chai').expect,
    http = require('http'),
    request = require('request'),
    server = require('./server.js'),
    wkhtmltopdf = require('../index.js');

describe('wkhtmltopdf', function() {

    describe('module', function () {
        var options = [
            '--header-center TEST',
            '--header-font-size 20',
            '--header-spacing 1',
            '--margin-top 10'
        ];

        it('should render and save PDF', function () {
            wkhtmltopdf(options, 'http://google.com', 'google.pdf');
        });
    });

    describe('server response', function () {
        before(function () {
            server.listen(8080);
        });

        after(function () {
            server.close();
            console.log('\nServer closed');
        });

        it('should return 200', function (done) {
            this.timeout(10000);
            request.get('http://localhost:8080', function (err, res, body) {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it('should stream PDF', function (done) {
            var input,
                options,
                opts;

            this.timeout(10000);

            input = 'http://google.com/';

            options = [
                '--header-center TEST',
                '--header-font-size 20',
                '--header-spacing 1',
                '--margin-top 10'
            ];

            opts = {
                url: 'http://localhost:8080',
                input: input,
                options: options
            };

            request.get(opts, function (err, res, body) {
                expect(res.body).to.contain('PDF');
                done();
            });
        });
    });
});

