'use strict';

module.exports = class Route {
  constructor(method, path, callback) {
    this.method = method;
    this.path = path.startsWith('/') ? path.substring(1) : path;
    this.callback = callback;

    // params contains the name of the parameters and their index in
    // the array obtained by splitting the path on '/' character
    this._params = this._generateParams();
  }

  _generateParams() {
    const params = new Map();

    const pathItems = this.path.split('/');
    for (let i = 0; i < pathItems.length; i++) {
      const pathItem = pathItems[i];

      if (pathItem.startsWith(':')) {
        params.set(i, pathItem.substring(1));
      }
    }
    return params;
  }

  buildUrlParams(path) {
    path = path.startsWith('/') ? path.substring(1) : path;
    const params = {};
    const pathItems = path.split('/');

    for (const entry of this._params) {
      const index = entry[0];
      const paramName = entry[1];
      params[paramName] = pathItems[index];
    }

    return params;
  }

  matches(path) {
    path = path.startsWith('/') ? path.substring(1) : path;
    if (this.path === path) {
      return true;
    }

    const pathItems = path.split('/');
    const thisPathItems = this.path.split('/');

    // The path items length doesn't match this.path items length
    if (pathItems.length !== thisPathItems.length) {
      return false;
    }

    // For each path items, check if it's equal to this.path items
    for (let i = 0; i < pathItems.length; i++) {
      // Skip indexes corresponding to a param
      if (!this._params.has(i) && thisPathItems[i] !== pathItems[i]) {
        return false;
      }
    }

    return true;
  }
};
