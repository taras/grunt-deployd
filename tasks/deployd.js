/*
 * grunt-deployd
 * https://github.com/taras/grunt-deployd
 *
 * Copyright (c) 2013 Taras Mankovski
 * Licensed under the MIT license.
 */

'use strict';

var http    = require('http'),
    deployd = require('deployd');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('deployd', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.

    var targetDefaults = {
      dev : {
        port: 7777,
        db: {
          port: 27017,
          host: 'localhost',
          name: 'deployd',
          credentials: undefined
        },
        env: 'development'
      },
      production: {
        port: 7777,
        db: {
          port: 27017,
          host: 'localhost',
          name: 'deployd',
          credentials: undefined
        },
        env: 'production'
      }
    }

    var options = this.options( targetDefaults[ this.target ] );

    var server = deployd( options );

    server.listen();

    server.on( 'listening', function() {
      grunt.log( "Deployd started" )
    });

    server.on( 'error', function( err ) {
      grunt.fail.warn( error );
    });

  });

};
