#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('virtual-stand-up-meeting-notes:server');
var http = require('http');
var path = require('path');
const fs = require('fs');
const https = require('https');

// import environmental variables
require('dotenv').config({ path: 'variables.env' });

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '7777');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

//======================================//

// define SSL/TLS options
// let tlsEnabled = false;
// let tlsOptions = {};

// if (
//   process.env.SSL === 'on' &&
//   process.env.SSL_CERT != undefined &&
//   process.env.SSL_KEY != undefined &&
//   process.env.SSL_CERT != '' &&
//   process.env.SSL_KEY != ''
// ) {
//   tlsEnabled = true;

//   try {
//     tlsOptions = {
//       key: fs.readFileSync(process.env.SSL_KEY),
//       cert: fs.readFileSync(process.env.SSL_CERT)
//     };

//     if (process.env.SSL_CHAIN != undefined && process.env.SSL_CHAIN != '') {
//       tlsOptions.ca = fs.readFileSync(process.env.SSL_CHAIN);
//     }

//     if (process.env.SSL_DHPARAM != undefined && process.env.SSL_DHPARAM != '') {
//       tlsOptions.dhparam = fs.readFileSync(process.env.SSL_DHPARAM);
//     }
//   } catch (e) {
//     console.error(`\n!!! ${e.message}\n`);
//     console.error('=> SSL could not be enabled. Using fallback.\n');
//     tlsEnabled = false;
//   }
// }

// // start the app
// app.set('port', process.env.PORT || 7777);

// if (tlsEnabled === true) {
//   const server = https
//     .createServer(tlsOptions, app)
//     .listen(app.get('port'), () => {
//       console.log(`Express running with TLS → PORT ${server.address().port}`);
//     });
// } else {
//   const server = app.listen(app.get('port'), () => {
//     console.log(`Express running → PORT ${server.address().port}`);
//   });
// }

//============================================//
