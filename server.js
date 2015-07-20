/**
 * Created by Bhavin on 7/19/2015.
 */

var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

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
    //Do further processing.
    require("./app.js");
}
