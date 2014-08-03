'use strict';

// Dependencies
var Promise   = require('bluebird');
var keychain  = require('keychain');

// Supported functions
var functions = ['getPassword', 'setPassword', 'deletePassword'];

functions.forEach(function (name) {
  module.exports[name] = function (options) {
    return new Promise(function (resolve, reject) {
      keychain[name](options, function (error, password) {
      	console.log(arguments);
        if (error) reject(error);
        else resolve(password);
      });
    });
  };
});
