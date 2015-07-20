# node-html-pdf-sample  

Sample application for print pdf from node.js using middleware called 'node-html-pdf'. 

### Version
1.0.1

### Tech

Middleware/libraries used in this sample project - 

* [AngularJS] - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [node-html-pdf] - Html to pdf converter in nodejs. It spawns a phantomjs process and passes the pdf as buffer or as filename.
* [Body-Parser] - npm body-parser for node.js API 
* [nunjucks] - A rich and powerful templating language for JavaScript.
    * npm install --save nunjucks 


### Installation

```sh
$ npm install --save express
$ npm install --save body-parser
$ npm install --save html-pdf (main node-html-pdf npm command)
$ npm install --save nunjucks
```

### Server side node.js API code

```Javascript
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
//nunjucks templating 
var nunjucks = require('nunjucks');
//html file which you want to convert into pdf.
var html = fs.readFileSync('./businesscard_tmpl.html', 'utf8')

//Nunjucks is a product from Mozilla and we are using it as a template engine.
nunjucks.configure('public', {
    autoescape: true,
    express: app
});

app.get('/api/printpdf1', function (req, res) {
    console.log('request made....print 1 ');
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

    var renderedHtml =  nunjucks.render('nunjucks.tmpl.html',obj);
    pdf.create(renderedHtml,report_options).toStream(function(err, stream){
        console.log(stream);
        stream.pipe(res);
    });
});

app.get('/api/printpdf2', function (req, res) {
    console.log('request made....print 1 ');
    pdf.create(html).toStream(function(err, stream){
        console.log(stream);
        stream.pipe(res);
    });
});
```

### Client side angular.js code
```html
 <!-- To display pdf inline on page inside div/container -->
 <object data="{{content}}" style="width:100%;height:700px;" type="application/pdf"></object>
 
 <!-- To open pdf on new tab/windows -->
 <button type="button" ng-click="printPdf()">Print PDF in new window</button>
```

```javascript
//inject $scope, $q, $http, $sce to angular controller.
$scope.getPDF = function(){
                $scope.loading = true;
                var q = $q.defer();
                $http.defaults.headers.common['content-type']= 'application/pdf';
                $http.get('/api/printpdf1', {responseType:'arraybuffer'})
                        .success(function (response) {
                            console.log(response);
                            var file = new Blob([response], {type: 'application/pdf'});
                            var fileURL = URL.createObjectURL(file);
                            $scope.loading = false;
                            q.resolve(fileURL);
                        })
                        .error(function(err){
                            $scope.loading = false;
                            q.reject(err);
                        });
                return q.promise;
            };
            
            //To print pdf on new window/ Button_Click event.
            $scope.printPdf = function(){
                console.log('printing pdf...');
                $scope.getPDF().then(function(response){
                    console.log(response);
                    window.open(response);
                },function(err){
                    console.log('Error: ' + err);
                });
            };
                
            //Call this code to load pdf on same page inline
            $scope.getPDF().then(function(response){
                console.log(response);
                $scope.content = $sce.trustAsResourceUrl(response);
            },function(err){
                console.log('Error: ' + err);
            });
            
```

### Todo's
- Create report printing engine where we have to inject report template's html to node.js project.
- Report html template will call node.js API to get data and fill html placeholder/{{}} using angular.
- Read populated html file from node.js using fs.readFileSync and populate pdf.
- Send that pdf stream to client

License
----

MIT

### Happy Coding ...!! 
Bhavin Patel
[http://itsmebhavin.wordpress.com]


[john gruber]:http://daringfireball.net/
[@thomasfuchs]:http://twitter.com/thomasfuchs
[1]:http://daringfireball.net/projects/markdown/
[marked]:https://github.com/chjj/marked
[Ace Editor]:http://ace.ajax.org
[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[keymaster.js]:https://github.com/madrobby/keymaster
[jQuery]:http://jquery.com
[@tjholowaychuk]:http://twitter.com/tjholowaychuk
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org
[Gulp]:http://gulpjs.com
[node-html-pdf]:https://github.com/marcbachmann/node-html-pdf
[Body-Parser]:https://github.com/expressjs/body-parser
[nunjucks]:https://mozilla.github.io/nunjucks/
