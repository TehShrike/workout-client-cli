var socketio = require('socket.io')
var socketioClient = require('socket.io-client')
var client = require('./index')
var http = require('http')

var server = http.createServer()

var io = socketio(server)

server.listen(9999)

client(socketioClient('http://localhost.com:9999'), 'Bubba')

io.on('connection', function(socket) {

	socket.on('work done', function(workReported) {
		console.log('Work was reported as done!', workReported)
	})


	console.log('connection')

	io.emit('work', {
		workTypeName: 'pushups',
		repName: 'reps',
		reps: 3
	})

	setTimeout(function() {
		io.emit('work', {
			workTypeName: 'burpees',
			repName: 'reps',
			reps: 3
		})
	}, 10 * 1000)

})


