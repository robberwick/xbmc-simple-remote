class XbmcAdapter
	
	constructor: (@ip, @port) ->
		@requests = {}
		@id = 0
		@connect @ip, @port
	
	connect: (ip, port) ->
		@ws = new WebSocket 'ws://'+ip+':'+port+'/jsonrpc'
	
	sendRequest: (data, cb) ->
		@id++
		@requests[@id] = cb
		data.id = @id
		@ws.send JSON.stringify data
	
	

module.exports = XbmcAdapter
