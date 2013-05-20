var buttons = {
	'Player': ['PlayPause', 'Stop'],
	'Input' : ['Up', 'Down', 'Left', 'Right', 'Select', 'Back', 'Home']
}

var requests = {};

var ws = null;
var id;

var connect = function(ip, port){
	if(ip !== null && port !== null){
		id = 0;
		ws = new WebSocket("ws://"+ip+":"+port+"/jsonrpc");
		ws.onmessage = function(e){
			try {
				var data = JSON.parse(e.data);
				if(data.id !== undefined){
					if(requests[id] !== undefined){
						requests[id](data);
						delete requests[id];
					}
				}
			} catch (ex){
				console.error(ex);
			}
		}
	}
}

var sendRequest = function(data, cb){
	id++;
	requests[id] = cb;
	ws.send(JSON.stringify(data));
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

var click = function(method, button){
	button.addEventListener('click', function(ev){
		ev.preventDefault();
		if(ws !== null){
			if(method === "Player"){
				sendRequest({jsonrpc: "2.0", method: "Player.GetActivePlayers", id: 1},
				function(res){
					if(res.result.length > 0){
						var playerid = res.result[0].playerid;
						sendRequest({jsonrpc: "2.0", method: method+"."+button.id, id: 1, params: {playerid: playerid}},
						function(result){
							console.log(result);
						});
					}
				});
			} else {
				sendRequest({jsonrpc: "2.0", method: method+"."+button.id, id: 1},
				function(res){
					console.log(res);
				});
			}			  
		} else {
			alert("Please specify IP and port of your XBMC.");
		}
		return false
	});
}

var methods = Object.keys(buttons)
for (i = 0; i < methods.length; i++) {
	var method = methods[i];
	var btns = buttons[method];
	for (j = 0; j < btns.length; j++) {
		var button = btns[j];
		click(method, document.getElementById(button));
	}
}

if(localStorage.ip !== undefined && localStorage.port !== undefined){
	ip = localStorage.ip;
	document.getElementById("ip").value = ip;
	port = localStorage.port;
	document.getElementById("port").value = port;
	connect(ip, port);
}

