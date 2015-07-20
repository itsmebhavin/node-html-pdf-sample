'use strict';

var spawn = require('child_process').spawn;

function wkhtmltopdf(options, input, output) {

    var child, html;

    // options
    if (options) {
        options = options.join(' ');
    } else {
        options = '--quiet';
    }

    // input
    var isUrl = /^(https?|file):\/\//.test(input);

    if (!isUrl) {
        html = input;
        input = '-';
    }

    // output
    if (!output) {
        output = '-';
    }

    // Execute
    if (process.platform === 'win32') {
        child = spawn('wkhtmltopdf', options + ' ' + input + ' ' + output);
    } else {
        child = spawn('/bin/sh', ['-c', 'wkhtmltopdf ' + options + ' ' + input + ' ' + output + ' | cat']);
    }

    if (!isUrl) {
        child.stdin.end(html);
    }

    return child;
}

wkhtmltopdf.command = 'wkhtmltopdf';
module.exports = wkhtmltopdf;