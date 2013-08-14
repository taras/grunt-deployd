# grunt-deployd

> Start and run [deployd.com](http://deployd.com/) API server while your Grunt task is running.

## Getting Started
This plugin requires Grunt `~0.4.1`

```shell
npm install grunt-deployd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-deployd');
```

## The "deployd" task

### Overview
* Your deployd server will start on the port that you specify in ```options.port``` property. 
* You have to specify ```options.db.name``` for your database, otherwise Grunt won't know what database should be used.

### Usage Examples

```js
grunt.initConfig({
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
      } },
})
```

**You have to add deployd:dev or deployd:prod to your task runner**

```js
grunt.task.run( [
        'deployd:dev',
        'configureProxies:server',
        'connect:server',
        'qunit'
      ] );
```

### Accessing API Endpoints ###
By default, this package will run your API endpoint on the port that you specified in ```options.port```. This is not very pretty when your app runs on a different port. You end up having you app on port 9000 ( or 80 ) and your API endpoints on port 7777.

To make your API endpoints accessible on the same port, you can use an HTTP Proxy. I included an example of how to use [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) to proxy your API to /api directory on same port as the connect server.

**Look in Gruntfile.js for an example of running a deployd server with a proxy**

### Running tests
* This package includes **Gruntfile.js** that allows you to run tests of this package

#### Installation of tests ####

To install the tests, run ```# npm install```

#### Running in browser ####

To run tests in the browser, run ```# grunt test:dev```

#### Running headless #####

To run headless tests, run ```# grunt```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
