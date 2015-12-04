#!/usr/bin/env node

var minimist = require('minimist')
var socket = require('socket.io-client')
var client = require('./index')

var argv = minimist(process.argv.slice(2))

if (!argv.name || !argv.server) {
	console.log('required arguments: name, and server')
	return
}

var io = socket(argv.server)

client(io, argv.name)
