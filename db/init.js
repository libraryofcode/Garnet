'use strict';
var MongoClient = require('mongodb').MongoClient,
  db;


module.exports = function connect(url, callback) {
  if (db) { callback(null, db); }
  else { 
    MongoClient.connect(url, function(err, conn) {
      db = conn;
      callback(err, conn);
    });
  }
};