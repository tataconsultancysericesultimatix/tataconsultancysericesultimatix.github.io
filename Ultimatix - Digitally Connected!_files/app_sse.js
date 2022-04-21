'use strict';

var source;

var CONNECTING = 0;
var OPEN = 1;
var CLOSED = 2;
var error ={};
function connectValidationService_SSE(requestId){
  var empid = $(".userID").val().trim();
//console.log(empid);
  var ID = empid + "," + requestId ;
  var encodedID = btoa(ID);
  //var token=encodedID.replace("=","").replace("=","").replace("=","");
 //  var token=encodedID.replaceAll("=","");
 
var isIE = /*@cc_on!@*/false || !!document.documentMode || /Edge/.test(navigator.userAgent);
if (!isIE) {
var token=encodedID.replace(/=/g, "");
} else {
var token=encodedID.replace("=","").replace("=","").replace("=","");
}


 
var  url =
    'https://login.ultimatix.net/utxAuthService/subscribe' ;

  // document.cookie = "XSRF-TOKEN=" + token + "; path=/;domain=ultimatix.net";
   var headers = {};
   headers["X_XSRF_TOKEN"] = token;

  source = new EventSource_IE(url,headers);




  if (source == null || source.readyState == CLOSED) {
    // network error at a beginning of the connection
    var error = {
      message: 'Failed to connect server',
      status: 'fail',
    };
    easyAuthResponseHandler(error);
  }

  source.addEventListener('open', function (e) {
//    console.log('Connection opened');
  });

  source.addEventListener('message', function (e) {
  //  console.log(e);
    processResponse_SSE(JSON.parse(e.data));
  });


source.addEventListener(
  "error",
  function (e) {
  
	var switch_var =e.target_readyState;
    //    console.log(e);
    switch (switch_var) {
      case CONNECTING:
      //  console.log("Reconnecting to server after timeout");
        break;
      case OPEN:
       // console.log("Open connection in error phase");
        break;
      case CLOSED:
       // console.log("EVENT SOURCE CLOSED");
        source.close();
         error = {
//          message: switch_var + ' EVENT SOURCE CLOSED',
         	message: "Failed to connect server",
		 status: 'fail',
        };
	processResponse_SSE(error);
        //easyAuthResponseHandler(error);
        break;
      default:
      //console.log("Closed due to Server Error");
        source.close();
         error = {
//          message: switch_var+ ' Server Error',
		message: "Failed to connect server",
          status: 'fail',
        };
        processResponse_SSE(error);
	break;
    }
    

 
  },
  false
);
};

function processResponse_SSE(resp) {
  disconnect_SSE();
 // console.log('Response body : ' + resp);
  easyAuthResponseHandler(resp);
};

function disconnect_SSE () {
  if (source != null) {
    source.close();
  }
 // console.log('Disconnected');
};


