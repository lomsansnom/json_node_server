'use strict';

const http = require('http');
const url = require('url');


const Route = require('./Route');


module.exports = class Server {
  constructor(name, options) {
    options = options || {};
    this._server = null;
    this._name = name;
    this._routes = [];

    // Options
    this._port = options.port || 80;
    this._verbose = options.verbose || false;


    // Middlewares
    this._middlewares = new Map();
    if (options.json) {
      this._middlewares.set('json', require('./middlewares/json'));
    }

    if (options.cors) {
      const Cors = require('./middlewares/Cors');
      const corsMid = new Cors(options.cors);
      this._middlewares.set('cors', corsMid);
    }
  }

  // Add middleware
  use(middleware) {
    this._middlewares.push(middleware);
  }

  start() {
    this._log(console.log, 'Server', this._name, 'listening on port', this._port);
    this._server = http.createServer((req, res) => {
      // Set default status code and headers
      res.statusCode = 200;
    });

    this._server.on('request', (req, res) => {
      const startReq = (new Date()).getTime();
      const reqUrl = url.parse(req.url, true);
      let body = '';
      let query = '';
      let routeMatch = null;

      // Check if we have one or more route matching this path
      const routeMatches = this._findRoutes(reqUrl.pathname);
      if (routeMatches.length === 0) {
        this._log(console.error, 'Unknown path', reqUrl.pathname);
        res.statusCode = 404;
        res.end();
        return;
      }

      // Check if we have one of the route for this path, except if 
      // cors middleware is used and the method is OPTIONS
      if ((this._middlewares.has('cors') && req.method !== 'OPTIONS')
        || !this._middlewares.has('cors')) {
        let i = 0;
        while (!routeMatch && i < routeMatches.length) {
          const route = routeMatches[i];
          if (route.method === req.method) {
            routeMatch = route;
          } else {
            i++;
          }
        }

        if (!routeMatch) {
          this._log(console.error, 'Method', req.method, 'is not supported');
          res.statusCode = 405;
          res.end();
          return;
        }
      }

      // Execute middlewares
      for (let middleware of this._middlewares.values()) {
        if (typeof middleware === 'object') {
          middleware.do(req, res);
        } else {
          middleware(req, res);
        }
      }

      // Handle parameters and execute the request
      req.params = routeMatch.buildUrlParams(reqUrl.pathname);
      req.query = reqUrl.query;
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        if ((req.method === 'POST' || req.method === 'PUT') && body) {
          try {
            req.body = JSON.parse(body);
          } catch (e) {
            this._log(console.trace, e);
            res.statusCode = 400;
            res.end();
          }
        }
        routeMatch.callback(req, res);
        this._log(console.log, 'Request done !', (new Date()).getTime() - startReq);
      });


    });

    this._server.listen(this._port);
  }

  stop() {
    this._server.close();
  }

  // Retrieve the routes matching a specific path (ignore the method)
  _findRoutes(path) {
    const matches = [];

    for (let i = 0; i < this._routes.length; i++) {
      const route = this._routes[i];
      if (route.matches(path)) {
        matches.push(route);
      }
    }

    return matches;
  }

  get(path, $get) {
    this._routes.push(new Route('GET', path, $get));
    return this;
  }

  post(path, $post) {
    this._routes.push(new Route('POST', path, $post));
    return this;
  }

  put(path, $put) {
    this._routes.push(new Route('PUT', path, $put));
    return this;
  }

  delete(path, $delete) {
    this._routes.push(new Route('DELETE', path, $delete));
    return this;
  }

  _log(logFn, ...msg) {
    if (this._verbose) {
      logFn(...msg);
    }
  }
}