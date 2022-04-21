var stompClient = null;
var subscription = null;
var reconnect = true;
var reconnectCount = 0;

function connectValidationService(requestId) {
	reconnectCount = 0;
	connect(requestId);
}

function connect(requestId) {
        var empid = $(".userID").val().trim();
//console.log(empid);
        var ID = empid + "," + requestId ;
        var encodedID = btoa(ID);
        //var token=encodedID.replace("=","").replace("=","").replace("=","");
	//var token=encodedID.replaceAll("=","");
	
var isIE = /*@cc_on!@*/false || !!document.documentMode || /Edge/.test(navigator.userAgent);
if (!isIE) {
var token=encodedID.replace(/=/g, "");
} else {
var token=encodedID.replace("=","").replace("=","").replace("=","");
}

	document.cookie = "XSRF-TOKEN=" + token + "; path=/;domain=ultimatix.net";
	var headers = {};
	headers["X-XSRF-TOKEN"] = token;
	var socket = new SockJS(
			'https://login.ultimatix.net/utxAuthService/auth'
, null, {
				transports : [ 'websocket' ],
				//transportMinTimeout : 10000
			}
);

	stompClient = Stomp.over(socket);
//	stompClient.heartbeat.outgoing = 10000;
//	stompClient.heartbeat.incoming = 10000;
	stompClient.debug = function(str) {};
	stompClient.connect(headers, function(frame) {
		subscription = stompClient.subscribe('/login/status/' + requestId,
				function(response) {
					processResponse(JSON.parse(response.body));
				});
		// Add Call to display no on screen
	},function(error) {
//                                        console.log(error);
					var error = {
				"message" : "Failed to connect server",
				"status" : "fail"
					};
                                        processResponse(error);
                                });

	socket.onclose = function(e) {
		if (reconnect && reconnectCount < 3) {
			reconnectCount += 1;
			connect(requestId);
		} else {
			var error = {
				"message" : "Failed to connect server",
				"status" : "fail"
			};
			processResponse(error);
		}
	};
}

function processResponse(resp) {
	disconnect();
//	console.log('Response body : ' + resp);
	easyAuthResponseHandler(resp);
}

function disconnect() {
	if (subscription !== null) {
		subscription.unsubscribe();
	}
	if (stompClient !== null) {
		stompClient.disconnect();
	}
}
