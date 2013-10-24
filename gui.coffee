
Drawer     = require 'drawer'
XbmcClient = require 'xbmc-client'

buttons  = {
	'Player': ['PlayPause', 'Stop'],
	'Input' : ['Up', 'Down', 'Left', 'Right', 'Select', 'Back', 'Home']
}
ip       = document.getElementById 'ip'
port     = document.getElementById 'port'
form     = ip.parentNode
drawer   = new Drawer document.getElementById('drawer'), 'horizontal'
settings = document.getElementById 'settings'
xbmcs    = document.querySelectorAll '[data-xbmc]'
playIcon = document.getElementById('PlayPause').children[0]

xbmc = null

playPause = (iconName) ->
	->
		playIcon.className = 'icon-'+iconName

connect = (ip, port) ->
	if ip isnt null && port isnt null
		xbmc = new XbmcClient(ip,port)
		xbmc.on 'play',  playPause 'pause'
		xbmc.on 'pause', playPause 'play'
		xbmc.on 'stop',  playPause 'play'
		xbmc.on 'connected', drawer.close()

if localStorage.ip isnt undefined && localStorage.port isnt undefined
	ip.value = localStorage.ip
	port.value = localStorage.port
	connect localStorage.ip, localStorage.port
else
	drawer.drawTop()

click = (elem, cb) ->
		elem.addEventListener 'click', cb
		elem.addEventListener 'touchstart', cb

addEventListener = ->
	form.addEventListener 'submit', (ev) ->
		ev.preventDefault()
		localStorage.ip = ip.value
		localStorage.port = port.value
		connect ip.value, port.value
		return false

	click settings, (e) ->
		drawer.toggleTop()
		
	addClick = (el, method) ->
		click el, (e) ->
			e.preventDefault()
			e.stopPropagation()
			if xbmc?
				xbmc[method]()
			else
				alert 'Please specify IP and port of your XBMC.'

	for el in xbmcs
		method = el.getAttribute 'data-xbmc'
		addClick el, method

addEventListener()

