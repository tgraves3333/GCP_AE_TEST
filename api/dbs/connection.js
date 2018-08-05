
//var env = process.env.NODE_ENV || 'development';
var env = 'development';
var config = require('../../config/config.js')[env];

var async = require('asyncawait/async');
var wait = require('asyncawait/await');

const MongoClient = require('mongodb').MongoClient
 
// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
//const URI = "mongodb://app_user:209xm1ga@172.16.136.29:27017/Security?authSource=admin";
//const URI = "mongodb://app_user:209xm1ga@35.185.80.72:27017/Security?authSource=admin";
const mongoURL = "mongodb://"
        + config.database.user
        + ":"
        + config.database.pwd
        + "@"
        + config.database.host
        + ":"
        + config.database.port
        + "/"
        + config.database.auth_db; 
console.log("Printing MongoConnection URL:" + mongoURL);

function connect(url) {
  // return MongoClient.connect(url).then(client => client.db())
  return MongoClient.connect(url, {poolSize: 10}).then(function(client){
    console.log('Connected to Mongodb: ' + config.database.host + ':' + config.database.port);
  	return client.db()
  })
}
 
module.exports = async (function() {
 
  //let databases = wait (Promise.all([connect(URI)]))
  //var databases = wait (Promise.all([connect(URI)]))
  var databases = wait (Promise.all([connect(mongoURL)]))

  return {
    collections: databases[0]
  }
})
