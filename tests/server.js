'use strict';

const server = require('../')('testServer', {
  port: 3030,
  cors: true,
});

server.get('test', (req, res) => {
  res.end(JSON.stringify({ ok: true }));
});

server.post('test', (req, res) => {
  res.end(JSON.stringify({ ok: true }));
});

server.put('test', (req, res) => {
  res.end(JSON.stringify({ ok: true }));
});

server.delete('test', (req, res) => {
  res.end(JSON.stringify({ ok: true }));
});


server.get('/testQueryString', (req, res) => {
  res.end(JSON.stringify(req.query));
});

server.post('/testQueryString', (req, res) => {
  res.end(JSON.stringify(req.query));
});

server.put('/testQueryString', (req, res) => {
  res.end(JSON.stringify(req.query));
});

server.delete('/testQueryString', (req, res) => {
  res.end(JSON.stringify(req.query));
});


server.get('testParams/:id/:name', (req, res) => {
  res.end(JSON.stringify(req.params));
});

server.post('testParams/:id/:name', (req, res) => {
  res.end(JSON.stringify(req.params));
});

server.put('testParams/:id/:name', (req, res) => {
  res.end(JSON.stringify(req.params));
});

server.delete('testParams/:id/:name', (req, res) => {
  res.end(JSON.stringify(req.params));
});


server.post('testBody', (req, res) => {
  res.end(JSON.stringify(req.body));
});

server.put('testBody', (req, res) => {
  res.end(JSON.stringify(req.body));
});

module.exports = server;
