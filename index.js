var beeper = require('beeper')
var Charm = require('charm')

module.exports = function (io, name) {
	var charm = Charm(process)
	var currentWork = {}
	var confirm = null

	io.on('connect', function(err) {
		charm.write('Connected!\n')
	})
	io.on('connect_error', function(err) {
		charm.write('Connection error: ' + err.message + '\n')
	})
	io.on('reconnect_error', function(err) {
		charm.write('Error reconnecting: ' + err.message + '\n')
	})

	function write(str) {
		charm.display('bright')
			.write(str)
			.display('reset')
	}

	function reportWorkDone(work) {
		io.emit('work done', {
			workTypeName: work.workTypeName,
			reps: work.reps,
			personName: name
		})
	}

	charm.on('data', function(data) {
		var key = data.toString()

		if (confirm !== null && (key === 'y' || key === 'Y')) {
			confirm()
			write('\nSWEET ACTION BRO!\n')
			confirm = null
		}
	})

	io.on('work', function(work) {
		currentWork = work
		confirm = function() {
			reportWorkDone(work)
		}
		beeper()
		displayWorkPrompt(write, work)
	})

	io.on('somebody did work', function(work) {
		if (work.reps === currentWork.reps && work.workTypeName === currentWork.workTypeName) {
			write('✓ ' + work.personName + ' did the work!\n')

			if (confirm) {
				write('Why haven\'t you?\n')
				beeper()
			}
		}
	})
}

function displayWorkPrompt(write, work) {
	write([
		'Time for work: ' + work.workTypeName + ', ' + work.reps + ' ' + work.repName,
		'------------------',
		'Did you do the work?',
	].join('\n') + '\n')
}
