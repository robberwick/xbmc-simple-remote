
Drawer = require 'drawer'
XbmcAdapter = require 'xbmc'

class Gui

	constructor: ->
		@buttons = {
			'Player': ['PlayPause', 'Stop'],
			'Input' : ['Up', 'Down', 'Left', 'Right', 'Select', 'Back', 'Home']
		}
		@ip      = document.getElementById 'ip'
		@port    = document.getElementById 'port'
		@connect = ip.parentNode
		if(localStorage.ip !== undefined && localStorage.port !== undefined)
			@ip.value = localStorage.ip;
			@port.value = localStorage.port;
		@drawer   = new Drawer document.getElementById 'drawer', 'horizontal'
		@settings = document.getElementById 'settings'
	
	click: (elem, cb, params) ->
			f = cb params
			elem.addEventListener 'click', f
			elem.addEventListener 'touchstart', f
	
	addEventListener: ->
		@connect.addEventListener 'submit', (ev) =>
			ev.preventDefault
			localStorage.ip = @ip.value
			localStorage.port = @port.value
			#connect(ip, port);
			return false

		@click @settings, (e) ->
			@drawer.toggleTop

module.exports = Gui
