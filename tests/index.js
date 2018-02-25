'use strict';


const assert = require('assert');
const http = require('http');

const server = require('./server');

const protocol = 'http:';
const hostname = '127.0.0.1';
const port = 3030;
const uri = `${protocol}//${hostname}:${port}`;

describe('HTTP Methods', () => {
  before(function () {
    server.start();
  });

  after(function () {
    server.stop();
  });

  describe('GET', () => {
    it('should have code 200', (done) => {
      http.get(uri + '/test', (res) => {
        assert.equal(res.statusCode, 200);
        done();
      });
    });

    it('should have code 404', (done) => {
      http.get(uri + '/test/unknown', (res) => {
        assert.equal(res.statusCode, 404);
        done();
      });
    });

    it('should return the query string as json (also ensure the response is a valid JSON)', (done) => {
      http.get(uri + '/testQueryString?id=1&name=test', (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });
    });

    it('should return the URLs params as json (also ensure the response is a valid JSON)', (done) => {
      http.get(uri + '/testParams/1/test', (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });
    });
  });

  describe('POST', () => {
    const options = {
      protocol, hostname, port, method: 'POST'
    };

    it('should have code 200', (done) => {
      const opts = Object.assign({ path: '/test' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 200);
        done();
      });

      req.end();
    });

    it('should have code 404', (done) => {
      const opts = Object.assign({ path: '/test/unknown' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      });

      req.end();
    });

    it('should have code 400', (done) => {
      const opts = Object.assign({ path: '/test' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 400);
        done();
      });

      req.write('{[]');
      req.end();
    });

    it('should return the body as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testBody' }, options);
      const body = JSON.stringify({ id: 1, name: 'test' });
      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          assert.equal(data, body);
          done();
        })
      });

      req.write(body);
      req.end();
    });

    it('should return the query string as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testQueryString?id=1&name=test' }, options);

      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });

      req.end();
    });

    it('should return the URLs params as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testParams/1/test' }, options);

      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });

      req.end();
    });
  });

  describe('PUT', () => {
    const options = {
      protocol, hostname, port, method: 'PUT'
    };

    it('should have code 200', (done) => {
      const opts = Object.assign({ path: '/test' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 200);
        done();
      });

      req.end();
    });

    it('should have code 404', (done) => {
      const opts = Object.assign({ path: '/test/unknown' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      });

      req.end();
    });

    it('should have code 400', (done) => {
      const opts = Object.assign({ path: '/test' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 400);
        done();
      });

      req.write('{[]');
      req.end();
    });

    it('should return the body as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testBody' }, options);
      const body = JSON.stringify({ id: 1, name: 'test' });
      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          assert.equal(data, body);
          done();
        })
      });

      req.write(body);
      req.end();
    });

    it('should return the query string as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testQueryString?id=1&name=test' }, options);

      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });

      req.end();
    });

    it('should return the URLs params as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testParams/1/test' }, options);

      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });

      req.end();
    });
  });

  describe('DELETE', () => {
    const options = {
      protocol, hostname, port, method: 'DELETE'
    };

    it('should have code 200', (done) => {
      const opts = Object.assign({ path: '/test' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 200);
        done();
      });

      req.end();
    });

    it('should have code 404', (done) => {
      const opts = Object.assign({ path: '/test/unknown' }, options);

      const req = http.request(opts, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      });

      req.end();
    });

    it('should return the query string as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testQueryString?id=1&name=test' }, options);

      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });

      req.end();
    });

    it('should return the URLs params as json (also ensure the response is a valid JSON)', (done) => {
      const opts = Object.assign({ path: '/testParams/1/test' }, options);

      const req = http.request(opts, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk
        });

        res.on('end', () => {
          const expected = JSON.stringify({ id: '1', name: 'test' }); // Put 1 as a string because with HTTP there is no type so numbers are parsed as Strings
          assert.equal(data, expected);
          done();
        })
      });

      req.end();
    });
  });
});