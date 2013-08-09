var util      = require( 'util' ),
  http        = require( 'http' ),
  colors      = require( 'colors' ),
  httpProxy   = require( 'http-proxy' );

exports.init = function( env, options ) {

  var router = {};
  router[ options.domain ] = 'localhost:' + options.port;

  httpProxy.createServer({
    router: router
  }).listen( 80, options.ip, function(err) {
      if (err) return cb(err);

      // Find out which user used sudo through the environment variable
      var uid = parseInt( process.env.SUDO_UID );
      // Set our server's uid to that user
      if (uid) process.setuid(uid);
      console.log('Server\'s UID is now ' + process.getuid());
    } );

  //
  // Target Http Server
  //
  http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  }).listen(9000);

  util.puts('http proxy server '.blue + 'started '.green.bold + 'on port '.blue + '80 '.yellow + 'with proxy table'.magenta.underline);
  util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '7777 '.yellow);

};