var colors = require('colors'),
  http = require('http'),
  deployd = require('deployd');

exports.init = function( env, options ) {

  var server = deployd({
    port: options.port,
    env:  env,
    db: options.db
  });

  server.listen();

  server.on('listening', function() {
    console.log("Deployd is running...");
  });

  server.on('error', function(err) {
    console.error(err);
    process.nextTick(function() { // Give the server a chance to return an error
      process.exit();
    });
  });

};