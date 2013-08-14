/*
 * grunt-deployd
 * https://github.com/taras/grunt-deployd
 *
 * Copyright (c) 2013 Taras Mankovski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var http    = require('http'),
    deployd   = require('deployd');

  grunt.registerMultiTask('deployd', 'Run Deployd.app server', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      port: 3000,
      db: {
        port: 27017,
        host: 'localhost',
        name: 'deployd',
        credentials: undefined
      },
      env: 'development'
    });

    var server = deployd( options );

    server.listen();

    server.on( 'listening', function() {
      grunt.log.write( "Deployd started" );
    });

    server.on( 'error', function( err ) {
      grunt.fail.warn( err );
    });

  });

};
