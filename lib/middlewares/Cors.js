'use strict';

module.exports = class Cors {
  constructor(options) {
    this._allowOrigin = options.allowOrigin || '*';
  }

  do(req, res) {
    if(req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', this._allowOrigin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.end();
    }
  }
};