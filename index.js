'use strict';

const Server = require('./lib/Server');
module.exports = (name, options) => new Server(name, options);