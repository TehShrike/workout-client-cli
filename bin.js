var argv = require('minimist')(process.argv.slice(2))

if (!argv.name || !argv.server) {
	console.log('required arguments: name, and server')
	return
}

var socket = require('socket.io-client')

var io = socket(argv.server)

require('./index')(io, argv.name)
