/*
 * grunt-deployd
 * https://github.com/taras/grunt-deployd
 *
 * Copyright (c) 2013 Taras Mankovski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          base: './public',
          middleware: function ( connect, options ) {
            return [
              connect.static(options.base),
              proxySnippet
            ];
          }
        },
        proxies: [
          {
            context: '/api',
            host: 'localhost',
            port: 7777, // port should match deployd port
            https: false,
            changeOrigin: true,
            rewrite: {
              '^/api/dpd.js': '/dpd.js',
              '^/api': '' // prefix all api requests with /api ( ie. /api/products )
            }
          }
        ]
      }
    },

    // Configuration to be run (and then tested).
    deployd: {
      dev: {
        options: {
          port: 7777,
          db: {
            host: 'localhost',
            port: 27017,
            name: 'development'
          },
          env: 'development'
        }
      },
      prod: {
        options: {
          port: 7777,
          db: {
            port: 27017,
            name: 'production',
            host: 'localhost',
            credentials: {
              username: 'prod_user',
              password: 'prod_pass'
            }
          },
          env: 'production'
        }
      }
    },

    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:9000/tests/index.html'
          ]
        }
      }
    },

    open : {
      tests : {
        path: 'http://localhost:9000/tests',
        app: 'Google Chrome'
      }
    }


  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-connect-proxy' );
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  grunt.loadNpmTasks( 'grunt-open' );

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', function( target ) {

    grunt.event.on('qunit.spawn', function (url) {
      grunt.log.ok("Running test: " + url);
    });

    var tasks;
    if ( typeof target === 'undefined' ) {
      tasks = [
        'deployd:dev',
        'configureProxies:server',
        'connect:server',
        'qunit'
      ];
    } else {
      tasks = [
        'deployd:'+target,
        'configureProxies:server',
        'open:tests',
        'connect:server:keepalive'
      ];
    }

    grunt.task.run( tasks );
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
