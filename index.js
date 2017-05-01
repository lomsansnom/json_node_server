'use strict';

const Server = require('./lib/Server');


/******** TODO REMOVE **********/
const http = require('http');
const url = require('url');

const server = new Server('Test', {
  port: 8080,
  json: true,
  cors: true
});

server.get('test/:id/:test/status', (req, res) => {
  console.log('ok1');
  res.end(JSON.stringify({query: req.query, params: req.params}));
});

server.get('test', (req, res) => {
  console.log('ok');
  res.end(JSON.stringify(req.query));
});
server.start();
/******** TODO REMOVE **********/


module.exports = (options) => new Server(options);