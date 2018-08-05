'use strict';

console.log("Node JS APP -- Start UP")

//var config = require('../config/config');
var config = require('./config');

var express = require('express');
var app = express();

module.exports = app; // for testing

  // error handler to emit errors as a json string
  app.use(function(err, req, res, next) {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        message: String(err) // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)
      Object.defineProperty(err, 'message', { enumerable: true });
    }

    // Return a JSON representation of #/definitions/ErrorResponse
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
  });

//  var ip = process.env.IP || config.server.host;
//  var port = process.env.PORT || config.server.port;
var ip = config.get("server_host");
var port = config.get("server_port");

// *********** START
console.log(" before attempt to connect to mongodb");

const initializeDatabases = require('./api/dbs/connection.js')
const routes = require('./api/routes/routes.js')
 
// Initialize the application once database connections are ready.
//initializeDatabases().then(dbs => {
initializeDatabases().then(function(dbs){  
  // Initialize the application once database connections are ready.
  //routes(app, dbs).listen(port, () => console.log('Listening on port ' + port))
  routes(app, dbs).listen(port, function(){console.log('Listening on port ' + port)
    console.log('try this:\ncurl http://' + ip + ':' + port + '/auth?oprid={OPRID}');
    console.log('Press Ctrl+C to quit.');
  })
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})


// *********** END

//console.log('try this:\ncurl http://' + ip + ':' + port + '/hello?name=Scott');
//});
