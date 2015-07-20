# node-wkhtmltopdf

A very simple wrapper for [wkhtmltopdf](http://wkhtmltopdf.org/downloads.html).

## Dependencies

* [Node.js](http://nodejs.org/)
* [wkhtmltopdf](http://wkhtmltopdf.org/)

## Installation

1. Install [wkhtmltopdf](http://wkhtmltopdf.org/downloads.html).

2. Install node-wkhtmltopdf:
```
npm install node-wkhtmltopdf
```

## Usage
```
wkhtmltopdf(options, input, output);
```

## Examples

### Render and Save:
```
wkhtmltopdf(null, 'http://google.com', 'google.pdf');
```

### Render and Stream:
```
var options = [
'--quiet',
'--cookie connect.sid ' + connectSid,
'--margin-bottom 1',
'--margin-left 1',
'--margin-right 1',
'--margin-top 1'
];

var input = 'http://mydomain.com/mysecurehtmlpage';

var doc = wkhtmltopdf(options, input);

doc.stdout.pipe(res);

res.writeHead(200, {
'Content-Type': 'application/pdf',
'Access-Control-Allow-Origin': '*',
'Content-Disposition': 'inline; filename=order.pdf'
});

```

## Test
```
npm test
```
 
 To test via server implementation:
 ```
 node test/server.js
 ```
 Then navigate to:
 ```
 http://localhost:8080/?input=https://en.wikipedia.org/wiki/Foobar#Usage_in_code
 ```
 
 