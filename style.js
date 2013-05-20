
var pad = document.getElementById('pad');
var update = function() {
	pad.style.height = getComputedStyle(pad)['width'];
};
addEventListener('resize', update);
update();
