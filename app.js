
Drawer = require('drawer');
//Xbmc = require('xbmc');

var xbmc = null;

var connect = function(ip, port){
	if(ip !== null && port !== null){
		xbmc = new Xbmc(ip,port);
	}
}

document.getElementById("ip").parentNode.addEventListener('submit', function(ev){
	ev.preventDefault();
	ip   = document.getElementById("ip").value;
	localStorage.ip = ip;
	port = document.getElementById("port").value;
	localStorage.port = port;
	connect(ip, port);
	return false
});

var addClick = function(el, method) {
	var fn = function(e) {
		e.preventDefault();
		e.stopPropagation();
		xbmc[method]();
	};
	el.addEventListener('click', fn);
	el.addEventListener('touchstart', fn);
};

var xbmcs = document.querySelectorAll('[data-xbmc]');
for (var i=0; i<xbmcs.length; i++) {
	var el = xbmcs[i];
	var method = el.getAttribute('data-xbmc');
	addClick(el, method);
}

if(localStorage.ip !== undefined && localStorage.port !== undefined){
	ip = localStorage.ip;
	document.getElementById("ip").value = ip;
	port = localStorage.port;
	document.getElementById("port").value = port;
	connect(ip, port);
}

var drawer = new Drawer(document.getElementById('drawer'), 'horizontal');
window.drawer = drawer;

var settings = document.getElementById('settings');
var settingsClick = function(e) {
	drawer.toggleTop();
};
settings.addEventListener('click', settingsClick);
settings.addEventListener('touchstart', settingsClick);
