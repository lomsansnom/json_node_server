# json_node_server

json_node_server is a lightweight nodeJS library for the creation of simple APIs.
It supports the methods GET, POST, PUT and DELETE and handles JSON payloads by default.

## Installation

`npm install @lomsansnom/json_node_server`

## Usage

`const server = require('@lomsansnom/json_node_server')(name, options);`

**Options**
* `port`    - Listening port number
* `verbose` - Enable logging (for debugging purpose), default `false`
* `json`    - `true` to enable json middleware (set the response content-type to application/json), default `false`
* `cors`    - `true` or `{ allowOrigin: ''}` to enable cors middleware, default `false`

### Register routes

```js
  /*
   * path     - String, with or without leading '/'. Parameters can be defined with the syntax :paramName
   * callback - Function
   *   params - (req, res) Node request and response objects.
   */
  server.get(path, callback);

  server.post(path, callback);

  server.put(path, callback);

  server.delete(path, callback);
```

### Parameters

* query string
  
  Query string is converted to an Object and stored under `req.query`

  ```js
    // GET /sample?id=1&name=sample
    server.get('/sample', (req, res) => {
      console.log(req.query)
      // Outputs {id: '1', name: 'sample'}
    });
  ```

* URL parameters  
  
  URL parameters are defined in the path with the syntax `:parameterName`.
  They are converted to an Object and stored under req.params

  ```js
    // GET /sample/1/sample
    server.get('/sample/:id/:name', (req, res) => {
      console.log(req.params)
      // Outputs {id: '1', name: 'sample'}
    });
  ```

* body
  
  body must be a valid JSON string and is automatically parsed and stored under `req.body`

  ```js
    // POST /sample, {id: 1, name: 'sample'}
    server.post('/sample', (req, res) => {
      console.log(req.params)
      // Outputs {id: 1, name: 'sample'}
    });
  ```

### Middlewares

* `json` middleware adds `Content-Type: application/json` to response headers
* `cors` middleware handles `OPTIONS` requests in order to allow cross origin requests. Adds the following to reponse headers:
  ```js
  {
    Access-Control-Allow-Origin: options.allowOrigin,
    Access-Control-Allow-Methods: 'GET, POST, PUT, DELETE'
  }
  ```
* Custom middlewares can be added by using the function `server.use(middleware)`, where middleware must be a function
taking `(req, res)` as parameters or an object with a function `do(req, res)`