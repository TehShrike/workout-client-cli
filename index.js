var beeper = require('beeper')
var Charm = require('charm')

module.exports = function (io, name) {
	var charm = Charm(process)
	var confirm = null

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
		}
		confirm = null
	})

	io.on('work', function(work) {
		confirm = function() {
			reportWorkDone(work)
		}
		beeper()
		displayWorkPrompt(write, work)
	})
}

function displayWorkPrompt(write, work) {
	write([
		'Time for work: ' + work.workTypeName + ', ' + work.reps + ' ' + work.repName,
		'------------------',
		'Did you do the work?',
	].join('\n') + '\n')
}
