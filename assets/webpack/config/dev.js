'use strict';
const path = require('path');
const ROOT = `${__dirname}/..`;

module.exports = {

  dist:'./dist',

  server: {
    port: 1337,
    host: 'localhost',
    root: path.normalize(ROOT),
    build: path.normalize(`${ROOT}/build`),
    clientport:8080
  },

  client: {
    src: path.normalize(`${ROOT}/src`)
  }
};
