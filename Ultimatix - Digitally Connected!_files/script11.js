var errorMessage;
var isIE;
var modal;
var browserName ="Unknown", osName="Unknown";
$(document).ready(function () {
	isIE = /*@cc_on!@*/false || !!document.documentMode || /Edge/.test(navigator.userAgent);
	if (isIE) {

			document.getElementById("authcode1").type = "password";

		document.getElementById("rsa1").type = "password";
		document.getElementById("rsa1").style.fontFamily = "none";
	}
	var winWidth = $(window).width();

	$('html').css("visibility", "visible");
	$("#authcode1").attr("autocomplete", "new-password");
	$(".forget-link a:first-child").after("<br/>");
	//$("#logo-container").after("<div id='testing-env'><div id='critical'><div id='title-text'>Ultimatix Dev Environment</div><div id='knowmax-div'>For Application demo guidelines, <a id='knowmax-link' href='https://knowmax3.ultimatix.net/sites/internal_it-corpfn/Main/EAG/siteminder_project/Siteminder%20Documents/Application%20integration%20guidelines/SSO%20Guideline%20for%20Application%20Demo.doc?Web=1'>Click here !!</a></div></div></div>");
	/*browser and OS detection code*/

var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
/*var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));*/

var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var iosSafari;
if (isSafari && iOS) {
     iosSafari = true;  
    } else if(isSafari) {
        iosSafari = false;
    }
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
var android = /android/i.test(navigator.userAgent || navigator.vendor || window.opera);
//var UAStr = Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3;
var iosChrome = (window.navigator.userAgent.indexOf('Android') > -1 && (/Chrome\/[.0-9]*/).test(window.navigator.userAgent)) || navigator.userAgent.match('CriOS');
var iosFirefox = navigator.userAgent.toLowerCase().indexOf('fennec') > -1;

if(isOpera){
	browserName="Opera";
}else if(isFirefox){
	browserName="Firefox";
}else if(isSafari){
	browserName="Safari";
}else if(iosSafari){
	browserName="Safari"
}else if(iosFirefox){
	browserName="Firefox";
}else if(iosChrome){
	browserName = "Chrome";
}else if(isIE){
	browserName="Internet Explorer";
}else if(isEdge){
	browserName="Microsoft Edge"
}else if(isEdgeChromium){
	browserName="Edge Chromium";
}else if(isChrome){
	browserName="Chrome";
}

var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
if(navigator.platform.indexOf("Win")!=-1)
{
    osName="Windows";
}
if(navigator.platform.indexOf("Mac")!=-1)
{
    osName = "MacOS";
}
if(navigator.platform.indexOf("X11")!=-1)
{
    osName="Unix";
}
if(navigator.platform.indexOf("Linux")!=-1)
{
    osName="Linux";
}


if(iOS){
	osName ="iOS";
	if(browserName== "Unknown"){
		browserName = "Firefox";
	}
}
if(android){
        osName = "Android";
}


});
//Navigates to enter username screen so the user can edit the username
function editusernameOnOtherScreens() {
	$("#button-container").html("<button type='button' class='btn btn-primary' id='proceed-button' onclick='staticUsername()' tabindex='0' aria-label='Press enter key to Proceed or tab for Help'>Proceed<span class='spinner-grow spinner-grow-sm'></span></button>");
	document.getElementById("proceed-button").disabled = false;
	$("#field_blank").show();
$("#submit-button").removeAttr('style');
	getCodeBoxElement(1).value = "";
	getCodeBoxElementRSA(1).value = "";
	


	document.getElementById("password-login").value = "";
	$("#second-page-div").hide();
	$("#auth-code-outer").show();
	$("#password-outer").hide();
	$("#auth-code-inner1").hide();
	$("#submit-button").hide();
	$("#username-static").hide();
	$("#easyauth-outer").hide();
	$("#username-input-outer").show();
	$("#static-button-container").show();
	$("#submit-button button").show();
	$("#rsa-outer").hide();
	if (document.getElementById("staticInput").type == "password") {
		document.getElementById("form1").type = "password";
	}
	else
		document.getElementById("form1").type = "text";

	document.getElementById("auth-error").innerText = "";
	document.getElementById("pass-error").innerText = "";
	document.getElementById("rsa-error").innerText = "";
	document.getElementById("easyauth-error").innerText = "";
	document.getElementById("username-text-second").style.color = "#858585";
	userNameFocus();
}

function userNameFocus() {
	$("#form1").focus();
	document.getElementById("username-input").style.borderBottom = "1px solid #234e9b";
	document.getElementById("img1").style.borderBottom = "1px solid #234e9b";
}

//Navigates to next screen
function staticUsername() {
	var regex = /^[a-zA-Z0-9\-_.@]+$/;
	if (document.getElementById("form1").value.trim().localeCompare("")) {
		if (!regex.test(document.getElementById("form1").value.trim()) || !(document.getElementById("form1").value.trim().length <= 256))
			document.getElementById("field_blank").innerText = "The username you have entered has invalid character/s";
		else {
			//RSA
			$("#button-container").html("<button type='button' class='btn btn-primary' class='col-md-3 bg' id='loader-parent'><div id='loader-4'><span></span><span></span><span></span></div></button>");
			getLoginOptionsAjax();
		}
	}
	else {
		document.getElementById("field_blank").innerText = "Username is mandatory";
	}
}
var isSSE = false;
function getLoginOptionsAjax() {
	var authcode, password, rsa, easyauth;
	
	var requestData = {
		empid: $("#form1").val(),
		target: $("input[name=target]").val()
	}

	$.ajax({
		url: loginOptionURL,
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(requestData),
		timeout: 10000,
		cache: false,
                headers: {"cache-control": "no-cache"},
		success: function (data) {
			window.sessionStorage.setItem("loginOption", JSON.stringify(data.loginOptions));
			window.sessionStorage.setItem("modal", data.modal);
			modal = data.modal;
			$("#rsa-auth-inner").hide();
			$("#pass-auth-inner").hide();
			$("#authentication-button-inner").hide();
			$("#easyAuth-button-inner").hide();
			$("#easyAuthGuide").hide();
			if (data.status == "success") {
				
				if (data.loginOptions.indexOf("EasyAuth_2") >= 0) {
					isSSE = true;
				}
				else{
					isSSE = false;
				}
				if (data.loginOptions.length == 1) {
					//$("#disabled-button").hide();
					$("#second-page-div").hide();
					if (data.loginOptions.indexOf("AuthCode") >= 0) {
						authCode();
						$("#other-login-methods-auth").hide();
						$("#auth-error").css("height", "17vh");
					}
					else {
						passwordValue();
						$("#other-login-methods-pass").hide();
						//$("#pass-error").css("height", "16vh");
					}
					usernameSuccessOneOption();
				}else if (data.loginOptions.length == 4) {
					$("#username-static").show();
					$("#second-page-div").hide();
					$("#username-input-outer").hide();
					$("#static-button-container").hide();
					if (data.loginOptions.indexOf("Password") >= 0) {
						passwordValue();
						$("#other-login-methods-pass").show();
						//$("#pass-error").css("height", "16vh");
						
					}
				}else {
					if (data.loginOptions.indexOf("AuthCode") >= 0) {
						$("#authentication-button-inner").show();
						$("#other-login-methods-auth").show();
						$("#auth-code-btn").focus();
					}
					if (data.loginOptions.indexOf("Password") >= 0) {
						$("#pass-auth-inner").show();
					}
					if (data.loginOptions.indexOf("TokenCode") >= 0) {
						$("#rsa-auth-inner").show();
					}
					if (data.loginOptions.indexOf("EasyAuth") >= 0 || data.loginOptions.indexOf("EasyAuth_2") >= 0) {
						$("#easyAuth-button-inner").show();
						$("#easyAuthGuide").show();
					}
					usernameSuccess();
				}

			}
			else {
				$("#field_blank").html(data.message);
				$("#rsa-auth-inner").hide();
				$("#pass-auth-inner").show();
				$("#authentication-button-inner").show();
				$("#easyAuth-button-inner").hide();
				$("#easyAuthGuide").hide();
				$("#auth-code-btn").focus();
				usernameSuccess();
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$("#rsa-auth-inner").hide();
			$("#pass-auth-inner").show();
			$("#authentication-button-inner").show();
			$("#easyAuth-button-inner").hide();
			$("#easyAuthGuide").hide();
			usernameSuccess();
			modal = true;

		},
		complete: function () {
			var username = document.getElementById("form1").value;
			document.getElementById("staticInput").value = username;
			document.getElementById("username").value = username;
			$("#auth-error2").hide();
		}
	});
}

function usernameSuccessOneOption() {
	$("#username-input-outer").hide();
	$("#static-button-container").hide();
	$("#username-static").show();
}
function usernameSuccess() {
	$("#username-input-outer").hide();
	$("#second-page-div").show();
	$("#submit-button").hide();
	$("#auth-code-outer").show();
	$("#static-button-container").hide();
	$("#username-static").show();
	$("#field_blank").hide();
	$("#select-login-method").focus();

	
	
}

var userID;
var usernameState;

//This function provides the screen to enter AuthCode
function authCode() {
	setTimeout(function(){ $("#easyauth-outer").hide(); }, 1200);
	var usernameValue;
        if($("#username").val() != ""){
                usernameValue = $("#username").val();
        }else{
                usernameValue = $("#form1").val();
        }
	var requestData = {
		empid: usernameValue,
		target: $("input[name=target]").val()
	}
	$.ajax({
		url: sendNotificationUrl,
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(requestData),
		cache: false,
                headers: {"cache-control": "no-cache"},

	});
	document.getElementById("form-submit").disabled = true;
	document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
	errorMessage = "Wrong Credentials!";
	$("#auth-code-outer").show();
	$("#auth-code-inner1").show();
	 $("#auth-code-inner").show();
	$("#password-outer").hide();
	$("#second-page-div").hide();
	$("#submit-button").show();
	$("#submit-button button").show();
	$("#AuthType").val(1);
	$("#authcode1").val("");

	usernameState = document.getElementById("staticInput").type;
	document.getElementById("password-login").disabled = true;
	document.getElementById("password-loginRSA").disabled = true;
	document.getElementById("partitionedRSA").disabled = true;
	document.getElementById("easyAuth-login").disabled = true;
	document.getElementById("authcode1").disabled = false;
	if (isSessionStorageAvailable == true) {
		var storage = sessionStorage;
		// userID = document.getElementById("form1").value;
		var authType = document.getElementById("AuthType").value;
		// storage.setItem("lastLoginUser", userID);
		storage.setItem("utxLastAuthType", authType);
		storage.setItem("usernameType", usernameState);
		// storage.setItem("errorMessage", errorMessage);
	}
	document.getElementById("authcode1").focus();
	document.getElementById("auth-error").innerHTML = getAppInfo();
	document.getElementById("auth-error").style.color = "#313131";
}
function passwordValue() {
	$('#pwdModal').modal('hide');
	document.getElementById("form-submit").disabled = true;
	document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
	errorMessage = "Wrong Credentials!";
	$("#auth-code-outer").show();
	$("#password-outer").show();
	$("#password-inner").show();
	$("#auth-code-inner1").hide();
	$("#second-page-div").hide();
	$("#submit-button").show();
	$("#AuthType").val(0);
	$("#other-login-methods-pass").show();
	$("#submit-button button").show();
	usernameState = document.getElementById("staticInput").type;
	document.getElementById("authcode1").disabled = true;
	document.getElementById("partitionedRSA").disabled = true;
	document.getElementById("password-loginRSA").disabled = true;
	document.getElementById("easyAuth-login").disabled = true;
	document.getElementById("password-login").disabled = false;
	if (isSessionStorageAvailable == true) {
		var storage = sessionStorage;
		// userID = document.getElementById("form1").value;
		var authType = document.getElementById("AuthType").value;
		// storage.setItem("lastLoginUser", userID);
		storage.setItem("utxLastAuthType", authType);
		storage.setItem("usernameType", usernameState);
		// storage.setItem("errorMessage", errorMessage);
	}
	$("#password-login").focus();
	document.getElementById("password-login").style.borderBottom = "1px solid #234e9b";
}
function getUserName() {
	var userName = $("#username").val();
	$(".editUsername").text(userName);
	$("#USER").val(userName);
}
var value = "password";
function onButtonClickPass() {
	value = 0;
	$("#AuthType").val(value);
}
function onButtonClickOTP() {
	value = 1;
	$("#AuthType").val(value);
}
function onButtonClickBiometric() {
	value = 2;
	$("#AuthType").val(value);
}

//Changes color
function changeColor() {
	document.getElementById("username-input").style.borderBottom = "1px solid #234e9b";
	document.getElementById("img1").style.borderBottom = "1px solid #234e9b";
}
//Changes color
function passwordColor() {
	document.getElementById("password-login").style.borderBottom = "1px solid #234e9b";
	document.getElementById("pass-error").innerText = "";
	document.getElementById("password-loginRSA").style.borderBottom = "1px solid #234e9b";
	//document.getElementById("rsa-error").innerText = "";
}
//Changes color
function authColor() {
	document.getElementById("auth-error").innerHTML = getAppInfo();
	document.getElementById("auth-error").style.color = "#313131";
}
//Changes color
function defaultColor() {
	document.getElementById("username-input").style.borderBottom = "1px solid #858585";
	$("#form1").blur();
	document.getElementById("img1").style.borderBottom = "1px solid #858585";
}
//Changes color
function passwordFocusOut() {
	document.getElementById("password-login").style.borderBottom = "1px solid #858585";
	document.getElementById("password-loginRSA").style.borderBottom = "1px solid #858585";
	//document.getElementById("enter-password").style.color = "#858585";
}
//Changes color
function authFocusOut() {
	document.getElementById("username-text-second").style.color = "#858585";
}

//hideShowFirst() and hideShowSecond() is to toggle the images
function hideShowFirst() {
	document.getElementById("form1").type = "password";
	document.getElementById("staticInput").type = "password";
	$('.edit-button,.ok-button').toggle()
}
function hideShowSecond() {
	document.getElementById("form1").type = "text";
	document.getElementById("staticInput").type = "text";
	$('.edit-button,.ok-button').toggle()
}

var isSessionStorageAvailable = sessionStorageAvailable();

function sessionStorageAvailable() {
	try {
		var storage = sessionStorage;
		x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch (e) {
		return e instanceof DOMException && (
			// everything except Firefox
			e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0;
	}
}


// Other login Methods
function otherLoginMethods() {
	$("#auth-code-outer").attr('action', '/ultimatixLogin/login_pwdless.fcc');
	$("#password-loginRSA").val("");
	$("#easyauth-outer").hide();
	$("#auth-error2").hide();
	$("#easyAuth-btn").focus();
	$("#submit-button").removeAttr('style');
	var storage = sessionStorage;
	var authType = storage.getItem("utxLastAuthType");
	var authcode, password, rsa, easyauth;
	if (sessionStorage.getItem("loginOption")) {
		//var loginOptions = storage.getItem("loginOption");
		var loginOptions = JSON.parse(sessionStorage.getItem("loginOption"));
		authcode = loginOptions.indexOf("AuthCode");
		password = loginOptions.indexOf("Password");
		rsa = loginOptions.indexOf("TokenCode");
		easyauth = loginOptions.indexOf("EasyAuth")> 0 ? loginOptions.indexOf("EasyAuth") : loginOptions.indexOf("EasyAuth_2");
		if (loginOptions.length > 1) {
			if (rsa < 0) {
				$("#rsa-auth-inner").hide();
			} else
				$("#rsa-auth-inner").show();
			if (password < 0) {
				$("#pass-auth-inner").hide();
				$("#password-button-inner").hide()
			}
			if (authcode < 0) {
				$("#authentication-button-inner").hide();
			}
			else
				$("#authentication-button-inner").show();
			if (easyauth < 0) {
				$("#easyAuth-button-inner").hide();
				$("#easyAuthGuide").hide();
			}
			else {
				$("#easyAuth-button-inner").show();
				$("#easyAuthGuide").show();
				$("#easyAuth-btn").focus();
			}
		}
		if(loginOptions.length == 4){
			$("#pass-auth-inner").hide();
                        $("#password-button-inner").hide();
			document.getElementById("easyAuth-btn").focus();
		}
		loadOptions();
	}
	else {
		var requestData = {
			empid: $("#username").val(),
			target: $("input[name=target]").val()
		}
		$.ajax({
			url: loginOptionURL,
			type: 'post',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(requestData),
			timeout: 10000,
			async: false,
			cache: false,
                        headers: {"cache-control": "no-cache"},
			success: function (data) {
				window.sessionStorage.setItem("loginOption", JSON.stringify(data.loginOptions));
				if (data.status == "success") {
					authcode = data.loginOptions.indexOf("AuthCode");
					password = data.loginOptions.indexOf("Password");
					rsa = data.loginOptions.indexOf("TokenCode");
					easyauth = loginOptions.indexOf("EasyAuth")> 0 ? loginOptions.indexOf("EasyAuth") : loginOptions.indexOf("EasyAuth_2");
					modal = data.modal;
					window.sessionStorage.setItem("modal", data.modal);

					if (rsa < 0) {
						$("#rsa-auth-inner").hide();
					}
					else
						$("#rsa-auth-inner").show();
					if (password < 0) {
						$("#pass-auth-inner").hide();
						$("#password-button-inner").hide()
					}
					else {
						if(loginOptions.length < 3){
							$("#pass-auth-inner").show();
							$("#password-button-inner").show()
						}
					}
					if (authcode < 0) {
						$("#authentication-button-inner").hide();

					}
					else
						$("#authentication-button-inner").show();
					 if (easyauth < 0) {
                                                $("#easyauth-button-inner").hide();

                                        }
                                        else{
                                                $("#easyauth-button-inner").show();
					}
					if(loginOptions.length == 4){
        			                $("#pass-auth-inner").hide();
                        			$("#password-button-inner").hide()
			                }

					usernameSuccess();
				}
				else {
					$("#field_blank").html(data.message);
					$("#rsa-auth-inner").hide();
					$("#pass-auth-inner").show();
					$("#easyAuth-button-inner").show();
					$("#easyAuthGuide").show();
					$("#authentication-button-inner").show();
					usernameSuccess();
				}
			},
			error: function (data) {
				$("#rsa-auth-inner").hide();
				$("#easyAuth-button-inner").hide();
				$("#easyAuthGuide").hide();
				$("#pass-auth-inner").show();
				$("#authentication-button-inner").show();
				usernameSuccess();
			}
		});

	}
                                if(isSSE){
                                        disconnect_SSE();
                                }
                                else{
                                        disconnect();
                                }

	loadOptions(authType);

}

function loadOptions(authType) {
	if (authType == 1) {
		$("#authcode1").val("");
		getCodeBoxElement(1).value = "";
			if (!getCodeBoxElement(1).value)
				getCodeBoxElement(1).style.borderBottomColor = "black";

	}

	else {
		if (sessionStorage.getItem("loginOption") == "undefined") {
			$("#rsa-auth-inner").hide();

			$("#authentication-button-inner").show();
				usernameSuccess();
			}


		}

		$("#authcode1").val("");
		$("#partitionedRSA").val("");
		$("#password-login").val("");
		$("#password-loginRSA").val("");
		loadOptionsPage();
		document.getElementById("auth-error").innerHTML = getAppInfo();
		document.getElementById("pass-error").innerText = "";
		document.getElementById("rsa-error").innerText = "";
		document.getElementById("easyauth-error").innerText = "";
		document.getElementById("username-text-second").style.color = "#858585";
		var availableOpt = JSON.parse(sessionStorage.getItem("loginOption"));	
		if(availableOpt != null){
		if(availableOpt.indexOf("EasyAuth") < 0 || availableOpt.indexOf("EasyAuth_2") < 0){
			$("#auth-code-btn").focus();
		}
		else{
			$("#easyAuth-btn").focus();
		}
		}else{
			$("#auth-code-btn").focus();
		}
	}
	function loadOptionsPage() {
		$("#second-page-div").show();
		$("#auth-code-inner1").hide();
		$("#password-outer").hide();
		$("#submit-button").hide();
		$("#rsa-outer").hide();
	}
	var flagAuthCode = 0;

	// on load this function is  being called
	function getLastLoginDetails() {
		$("#field_blank").show();

		document.getElementById("form-submit").disabled = true;
		if (user != "") {
			if ($("input[name=target]").val().indexOf("uxapps.ultimatix.net") > 1) {
				modal = false;
			} else {
				modal = true;
			}
		}
		$('html').css("visibility", "visible");
		//	$("#logo-container").after("<div id='testing-env'><div id='critical'>We are working on some critical activity.</br>If you face any issue wait for 60 minutes before raising GHD ticket.</div></div>");
		// Username and Authtype Will come from backendS

		var storage = sessionStorage;
		var authType = storage.getItem("utxLastAuthType");
		document.getElementById("staticInput").type = storage.getItem("usernameType");
		if (user != null && user != "") {
			document.getElementById("form1").value = user;
			document.getElementById("username").value = user;
			$("#form1").focus();
			document.getElementById("username-input").style.borderBottom = "1px solid #234e9b";
			document.getElementById("img1").style.borderBottom = "1px solid #234e9b";
			$("#input-label").addClass("active");
			if (authType == 1 && (loginErrorMessage != null || loginErrorMessage != "")) {
				$(document).ready(function () {
					$("#field_blank").hide();
					$("#second-page-div").hide();
					document.getElementById("staticInput").value = user;
					$("#auth-code-inner1").show();
					$("#password-outer").hide();
					$("#password-outerRSA").hide();
					$("#easyauth-outer").hide();
					$("#submit-button").show();
					$("#username-static").show();
					$("#username-input-outer").hide();
					$("#static-button-container").hide();
					document.getElementById("authcode1").disabled = false;
					document.getElementById("password-login").disabled = true;
					document.getElementById("password-loginRSA").disabled = true;
					document.getElementById("partitionedRSA").disabled = true;
					document.getElementById("easyAuth-login").disabled = true;
					$("#AuthType").val(1);
					if(JSON.parse(sessionStorage.getItem("loginOption")).length == 1){
    $("#other-login-methods-auth").hide()
}
					if (loginErrorMessage.indexOf("incorrect") > 0)
						document.getElementById("auth-error").innerHTML = loginErrorMessage + "<br><strong>Note: </strong>If current AuthCode has already been used for a previous login, please retry with a new one.";
					else
						document.getElementById("auth-error").innerHTML = loginErrorMessage;

					document.getElementById("auth-error").style.color = "#cc0000";
					$("#authcode1").focus();
					if(JSON.parse(sessionStorage.getItem("loginOption")).length == 1){
 					   $("#other-login-methods-auth").hide()
					}
					flagAuthCode = 1;
				});
			}
			else if (authType == 0 && (loginErrorMessage != null || loginErrorMessage != "")) {
				$(document).ready(function () {
					$("#field_blank").hide();
					$("#second-page-div").hide();
					document.getElementById("staticInput").value = user;
					$("#auth-code-inner1").hide();
					$("#easyauth-outer").hide();
					$("#password-outer").show();
					$("#submit-button").show();
					$("#username-static").show();
					$("#username-input-outer").hide();
					$("#static-button-container").hide();
					document.getElementById("password-login").disabled = false;
					document.getElementById("password-loginRSA").disabled = true;
					document.getElementById("authcode1").disabled = true;
					document.getElementById("partitionedRSA").disabled = true;
					document.getElementById("easyAuth-login").disabled = true;
					$("#AuthType").val(0);
					document.getElementById("pass-error").innerHTML = loginErrorMessage;
					document.getElementById("pass-error").style.color = "#cc0000";
					$("#password-login").focus();
					if(JSON.parse(sessionStorage.getItem("loginOption")).length == 1){
 					   $("#other-login-methods-pass").hide()
					}
				});
			}
			else if (authType == 3 && (loginErrorMessage != null || loginErrorMessage != "")) {
				$(document).ready(function () {
					$("#field_blank").hide();
					$("#second-page-div").hide();
					document.getElementById("staticInput").value = user;
					$("#auth-code-inner1").hide();
					$("#password-outer").hide();
					$("#password-outerRSA").show();
					$("#submit-button").show();
					$("#username-static").show();
					$("#username-input-outer").hide();
					$("#static-button-container").hide();
					$("#easyauth-outer").hide();
					$("#rsa-outer").show();
					$("#enter-passwordRSA").show();
					document.getElementById("partitionedRSA").disabled = false;
					document.getElementById("authcode1").disabled = true;
					document.getElementById("password-loginRSA").disabled = false;
					document.getElementById("password-login").disabled = true;
					document.getElementById("easyAuth-login").disabled = true;
					$("#AuthType").val(3);
					if (loginErrorMessage.indexOf("incorrect") > 0)
						document.getElementById("rsa-error").innerHTML = loginErrorMessage + "<br><strong>Note: </strong>If current TokenCode has already been used for a previous login, please retry with a new one.";
					else
						document.getElementById("rsa-error").innerHTML = loginErrorMessage;

					document.getElementById("rsa-error").style.color = "#cc0000";
					$("#password-loginRSA").focus();
					if(JSON.parse(sessionStorage.getItem("loginOption")).length == 1){
 					   $("#other-login-methods-rsa").hide()
					}
					flagAuthCode = 2;
					$("#auth-code-outer").attr('action', '/ultimatixLogin/login_rsa.fcc');
				});
			} else if (authType == 4 && (loginErrorMessage != null || loginErrorMessage != "")) {
				$(document).ready(function () {
					$("#field_blank").hide();
					$("#second-page-div").hide();
					document.getElementById("staticInput").value = user;
					$("#auth-code-inner1").hide();
					$("#password-outer").hide();
					$("#password-outerRSA").hide();
					$("#easyauth-outer").show();
					$("#digit_container").hide();
					$("#timeout").show();
					$("#easyauth-page-subtitle").hide();
					$("#username-static").show();
					$("#username-input-outer").hide();
					$("#static-button-container").hide();
					$("#submit-button").show();
                                        $("#submit-button button").hide();

					$("#timeout").show();
	                                $("#ea_error").css("visibility", "hidden");
					if(loginErrorMessage.indexOf("suspended") > 0){
                                                        $("#retry_opt").hide();
							document.getElementById("ERR").src = "/login/img/Modified/easyAuthSuspended.svg";
							$("#timeout_msg").hide();

			                                $("#ea_error").css("visibility", "visible");
					}

					if(loginErrorMessage.indexOf("The information") > 0){

						document.getElementById("ERR").src = "/login/img/Modified/easyAuthIncorrect.svg";
						$("#timeout_msg").html("Incorrect login attempt.");
						$("#timeout_msg").hide();
		                                $("#ea_error").css("visibility", "visible");

					}else{

						if(loginErrorMessage.indexOf("Second") > 0){
                                                        $("#ea_error").css("visibility", "visible");
                                                        document.getElementById("ERR").src = "/login/img/Modified/easyAuthSecond.svg";
                                                        $("#timeout_msg").hide();
                                                }

						if(loginErrorMessage.indexOf("Account") > 0){
							$("#ea_error").css("visibility", "visible");
							$("#retry_opt").hide();
							document.getElementById("ERR").src = "/login/img/Modified/easyAuthLocked.svg";
							$("#timeout_msg").hide();
						}
						if(loginErrorMessage.indexOf("authorised") > 0){
		                                document.getElementById("ERR").src = "/login/img/Modified/notAuthorized.svg";
						}
                                                if(loginErrorMessage.indexOf("validated") > 0){
							$("#timeout_msg").html(loginErrorMessage);
							$("#timeout_msg").hide();
                	                                document.getElementById("ERR").src = "/login/img/Modified/notValidated.svg";
                                                }
						$("#ea_error").css("visibility", "visible");	
					}

					document.getElementById("partitionedRSA").disabled = true;
					document.getElementById("authcode1").disabled = true;
					document.getElementById("password-loginRSA").disabled = true;
					document.getElementById("password-login").disabled = true;
					document.getElementById("easyAuth-login").disabled = false;
					$("#AuthType").val(4);
					if(JSON.parse(sessionStorage.getItem("loginOption")).length == 1){
 					   $("#other-login-methods-easyauth").hide()
					}
					
				});
			}
			else {
				$("#field_blank").html(loginErrorMessage);
			}

		}
	}

	function enterOtherLogin(event) {
		if (event.keyCode == 13)
			otherLoginMethods();
	}

	// Capslock on/off checker and Enter

	function capLock(e) {
		if (document.getElementById("field_blank").innerHTML != "")
			hideErroMsg();
		if (e.which == 13) {
			staticUsername();
		}
	}
	function enterKey(e) {
		if (e.which == 13) {
			editusernameOnOtherScreens();
			$("#field_blank").html("");
		}

	}
	function capLockPass(e) {
		kc = e.keyCode ? e.keyCode : e.which;
		sk = e.shiftKey ? e.shiftKey : ((kc == 16) ? true : false);
		if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
			document.getElementById('pass-error').innerText = "CapsLock is on!";
		}
		else {
			document.getElementById('pass-error').innerText = "";
		}
		passwordColor();
	}


	// Browser Focus

	function checkPageFocus() {
		var body = document.querySelector('body');
		if (!document.hasFocus()) {
			document.getElementById("authcode1").value = "";
			document.getElementById("password-login").value = "";
			document.getElementById("password-loginRSA").value = "";
			document.getElementById("partitionedRSA").value = "";
			document.getElementById("rsa1").value = "";
			getCodeBoxElementRSA(1).style.borderBottomColor = "#858585";
			document.getElementById("password-loginRSA").style.borderBottomColor = "#858585";

		}

	}
	setInterval(checkPageFocus, 300);



	function getCodeBoxElement(index) {
		return document.getElementById('authcode' + index);
	}

	function getCodeBoxElementRSA(index) {
		return document.getElementById('rsa' + index);
	}



	var authCodeAppend;
	var rsaAppend;
	function onKeyUpEvent(index, event) {
	if (document.getElementById('authcode1').value.trim().length == 6) {
        document.getElementById("form-submit").disabled = false;
        document.getElementById("form-submit").style.backgroundColor = "#234e9b";
    }
    else {
        document.getElementById("form-submit").disabled = true;
        document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
    }
	}

	function onKeyDownEvent(index,event) {
	
	authColor();
    if (event.keyCode == 9) {
        $("#other-login-methods-auth").focus();
    }
    if (!((event.keyCode >= 8 && event.keyCode <= 57) || (event.keyCode == 86) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 112 && event.keyCode <= 145))) {
        event.preventDefault();
        var x = document.getElementById("auth-error");
        x.innerHTML = "Only numbers are allowed";
        x.style.color = "#cc0000";
        setTimeout(function () {
            x.innerHTML = getAppInfo();
            x.style.color = "#313131";
        }, 2000);
    }
}
	//   On focus out of auth code

	function onFocusEvent(index) {
		getCodeBoxElement(1).style.borderBottomColor = "#234e9b";
	}


	//Hides the error for blank field check
	function hideErroMsg() {
		document.getElementById("field_blank").innerText = "";
	}

function onFocusOutEvent(index) {
    if (!getCodeBoxElement(1).value)
        document.getElementById("enter-auth").style.color = "#323232";
    getCodeBoxElement(1).style.borderBottomColor = "#858585";
}



	function enabledPassBtn() {
		if (document.getElementById("password-login").value.trim().length < 8 || document.getElementById("password-login").value.trim().length > 20) {
			document.getElementById("form-submit").disabled = true;
			document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
		}
		else {
			document.getElementById("form-submit").disabled = false;
			document.getElementById("form-submit").style.backgroundColor = "#234e9b";
		}

	}

	function enabledRSABtn() {

		if ((document.getElementById("rsa-error").textContent).indexOf("information") > 0) {
			document.getElementById("rsa-error").innerText = "";
		}
		if ((document.getElementById("rsa1").value.trim().length == 6 || document.getElementById('rsa1').value.trim().length == 8) && ($("#password-loginRSA").val().length >= 8 && $("#password-loginRSA").val().length <= 20)) {
			document.getElementById("form-submit").disabled = false;
			document.getElementById("form-submit").style.backgroundColor = "#234e9b";
		}
		else {
			document.getElementById("form-submit").disabled = true;
			document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
		}

	}


	function authValidation() {
		$("#form-submit").html("Login");
		$("#form-submit").focus();
		$('#form-submit').attr('disabled', 'disabled');
		document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
		if ($("#AuthType").val() == '3') {
			for (var j = 1; j <= 6; j++) {
				document.getElementById("partitionedRSA").value += document.getElementById("rsa" + j).value.trim();
			}
			if (document.getElementById("partitionedRSA").value == '') {
				clearRSA();
				return false;
			}
		} else {
			return true;
		}

	}



	function clearAuthCode() {
		$("#complete_authcode").children().val("");
		$("#authcode1").focus();
		document.getElementById("auth-error").innerText = "Please enter numbers only";
		document.getElementById("form-submit").disabled = true;
		document.getElementById("auth-error").style.color = "#cc0000";
		return false;
	}

	function clearRSA() {
		$("#complete_rsa").children().val("");
		$("#rsa1").focus();
		document.getElementById("rsa-error").innerText = "Please enter numbers only";
		document.getElementById("form-submit").disabled = true;
		document.getElementById("rsa-error").style.color = "#cc0000";
		return false;
	}



	function getAppInfo() {
		var info = "Use AuthCode generated using Ultimatix <a data-toggle='modal' id='authApp' href='#exampleModalCenter' style='font-size:13px; text-decoration:none;' tabindex='-1'>Authenticator app</a>";
		return info;
	}

	function maxLengthCheck(object) {
		// object.setAttribute("type", "password");
		if (object.value.length > object.maxLength) {
			object.value = object.value.slice(0, object.maxLength)
		}
		key = object.value;
		var regex = /[0-9]|\./;
		if (!regex.test(key))
			object.value = '';
	}

	//On click function for TokenCode button

	function rsaValue() {
		document.getElementById("form-submit").disabled = true;
		document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
		$("#AuthType").val(3);
		$("#rsa-outer").show();
		$("#auth-code-outer").show();
		$("#auth-code-inner1").hide();
		$("#password-outer").hide();
		$("#second-page-div").hide();
		$("#other-login-methods-pass").hide();
		$("#submit-button").show();
		$("#submit-button button").show();
		$("#enter-passwordRSA").show();
		$("#password-page-inputRSA").show();
		document.getElementById("password-login").disabled = true;
		document.getElementById("authcode1").disabled = true;
		document.getElementById("password-loginRSA").disabled = false;
		document.getElementById("easyAuth-login").disabled = true;
		document.getElementById("partitionedRSA").disabled = false;
		if (isSessionStorageAvailable == true) {
			var storage = sessionStorage;
			var authType = document.getElementById("AuthType").value;
			storage.setItem("utxLastAuthType", authType);
			storage.setItem("usernameType", usernameState);
		}
		$("#password-loginRSA").focus();
		document.getElementById("password-loginRSA").style.borderBottom = "1px solid #234e9b";

		$("#auth-code-outer").attr('action', '/ultimatixLogin/login_rsa.fcc');
		$("#rsa-error").html(getAppInfoRSA());
		$("#rsa-error").css("color", "#313131")
	}

	//Function to fetch info for token code

	function getAppInfoRSA() {
		if ($('#auth-code-outer').attr('name') === "loginForm") {
			var info = "Use Token Code generated on <a data-toggle='modal' id='authApp' href='#rsa-info-modal' style='font-size:13px; text-decoration:none;' tabindex='-1'>Software/Hardware token</a>"
			return info;
		}
		else {
			var info = "Use Token Code generated on Software/Hardware token"
			return info;
		}
	}


	function onFocusEventRSA(index) {

		getCodeBoxElementRSA(1).style.borderBottomColor = "#234e9b";

	}

	function onFocusOutEventRSA(index) {

		if (!getCodeBoxElementRSA(1).value)
			document.getElementById("enter-passwordRSA").style.color = "#323232";
		document.getElementById("enter-rsa").style.color = "#323232";
		document.getElementById("password-loginRSA").style.borderBottomColor = "#858585";
		getCodeBoxElementRSA(1).style.borderBottomColor = "#858585";
	}


	function onKeyUpEventRSA(index, event) {
		if ((document.getElementById('rsa1').value.trim().length == 6 || document.getElementById('rsa1').value.trim().length == 8) && ($("#password-loginRSA").val().length >= 8 && $("#password-loginRSA").val().length <= 20)) {
			document.getElementById("form-submit").disabled = false;
			document.getElementById("form-submit").style.backgroundColor = "#234e9b";
		}
		else {
			document.getElementById("form-submit").disabled = true;
			document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
		}
	}

	function onKeyDownEventRSA(event) {

		//authColor();
		if (event.keyCode == 9) {
			$("#other-login-methods-rsa").attr('tabindex', '0');
			$("#other-login-methods-rsa").focus();
		}
		if (!((event.keyCode >= 8 && event.keyCode <= 57) || (event.keyCode == 86) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 112 && event.keyCode <= 145))) {
			event.preventDefault();
			var x = document.getElementById("rsa-error");
			x.innerHTML = "Only numbers are allowed";
			x.style.color = "#cc0000";
			setTimeout(function () {
				x.innerHTML = getAppInfoRSA();
				x.style.color = "#313131";
			}, 2000);
		}
	}

	//RSA paste code
	$('#rsa1').on('paste', function () {
		if (document.getElementById("rsa1").value.trim().length != 6 || document.getElementById("rsa1").value.trim().length != 8) {
			document.getElementById("form-submit").disabled = false;
			document.getElementById("form-submit").style.backgroundColor = "#234e9b";
		}
		else {
			document.getElementById("form-submit").disabled = true;
			document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
		}
	});

//Authcode Paste Code
$('#authcode1').on('paste', function () {
    if (document.getElementById("authcode1").value.trim().length != 6) {
        document.getElementById("form-submit").disabled = false;
        document.getElementById("form-submit").style.backgroundColor = "#234e9b";
    }
    else {
        document.getElementById("form-submit").disabled = true;
        document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
    }
});




	//Button loader onClick event
	$('#load2').on('click', function () {
		var $this = $(this);
		$this.button('loading');
		setTimeout(function () {
			$this.button('reset');
		}, 8000);
	});



	$("#password-btn").on("click", function (e) {
		if (enablePasswordModal && modal) {
			$(".pwdMessage > a").attr("href", "https://auth.ultimatix.net/login/pages/authCodeHelpPage.html");
			updatePwdModal();
		}
		else {
			passwordValue();
			e.stopPropagation();
		}
	});


		var identity;
		function updatePwdModal() {
			var element = document.getElementById("progressBar");
			var width = 1;
			var value = 0;
			identity = setInterval(scene, passwordModalInterval * 10);
			function scene() {
				if (width >= 100) {
					clearInterval(identity);
					passwordValue();
				} else {
					width++;
					$("#progressBar").val(width * 20)
					//element.style.width = width + '%';
				}
			}
		}

		$('#pwdModal').on('hidden.bs.modal', function () {
			resetBar();
		});


		function resetBar() {
			clearTimeout(identity);
		}
		$("#rsa1").on('keydown', function (e) {
			if (e.shiftKey && e.keyCode === 9) {
				$("#password-loginRSA").focus();
			}
		});



		/*Code for easy auth*/
var flagEA;
	function easyAuth() {
		$("#timeout_msg").text("");

		var requestData = {
			empid: $(".userID").val().trim(),
			browserName: browserName,
			osName: osName 
		}
		$.ajax({
			url: easyAuthUrl,
			type: "POST",
			data: JSON.stringify(requestData),
			timeout: 10000,
			cache: false,
			headers: {"cache-control": "no-cache"},
			success: function (result) {
				if (result.status == 1) {
					document.getElementById("form-submit").disabled = true;
					document.getElementById("form-submit").style.backgroundColor = "#d1d9e9";
					errorMessage = "Wrong Credentials!";
					$("#digit_container").show();
					$("#timeout").hide();
					$("#easyauth-page-subtitle").show();
					usernameState = document.getElementById("staticInput").type;
					document.getElementById("authcode1").disabled = true;
					document.getElementById("partitionedRSA").disabled = true;
					document.getElementById("password-loginRSA").disabled = true;
					document.getElementById("password-login").disabled = true;
					document.getElementById("easyAuth-login").disabled = false;
					$("#easyAuth-login").val(result.challengeId);
					$("#AuthType").val(4);
					$(".digits").html(result.easyAuthOtp);
					if(isSSE)
						connectValidationService_SSE(result.challengeId);
					else	
						connectValidationService(result.challengeId);
					$("#digit_container").show();
					$("#timeout").hide();
					$("#easyauth-page-subtitle").show();
					var remainingTime = 60 - ((Date.now() / 1000 | 0) - result.issuedTime);
					$(".digits").attr('aria-label', "The number for validation is "+result.easyAuthOtp+" and is valid for" +remainingTime+" seconds");
					reset(remainingTime);
				}else if(result.status == 0){
					$("#easyauth-page-subtitle").hide();
					$("#digit_container").hide();
					$("#timeout").show();
					$("#timeout_msg").text("");
	                                $("#ea_error").css("visibility", "visible");
					document.getElementById("ERR").src = "";
					if(result.message == "limit exceeded"){
						hideNumber(1);
					}else if(result.message  == "option disabled"){
						hideNumber(2);
					}else if(result.message == "Processing"){
						hideNumber(3);
					}else if(result.message == "EA not supported"){
						hideNumber(8);
					}else if(result.message == "No data available"){
                                                hideNumber(9);
                                        }else{
						hideNumber(5);
					}

				}else {
						document.getElementById("ERR").src = "";

		                                if(isSSE){
		                                        disconnect_SSE();
                		                }
                                		else{
                                        		disconnect();
                                		}	

						document.getElementById("ERR").src = "/login/img/Modified/easyAuthTimeout.svg";
						$("#timeout_msg").text("");
						$("#timeout_msg").html("EasyAuth request has timed-out.</br>");
						$("#timeout_msg").focus();
						$("#timeout_msg").hide();
		                                $("#ea_error").css("visibility", "visible");
						$("#timeout").show();
						
					}
					$("#second-page-div").hide();
                                        $("#easyauth-outer").show();
                                        $("#submit-button").show();
                                        $("#submit-button button").hide();
                                        $("#timeout_msg").focus();

					if (isSessionStorageAvailable == true) {
						var storage = sessionStorage;
						userID = $(".userID").val();

						var authType = document.getElementById("AuthType").value;
						storage.setItem("lastLoginUser", userID);
						storage.setItem("utxLastAuthType", authType);
						storage.setItem("usernameType", usernameState);
						storage.setItem("errorMessage", errorMessage);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {

					document.getElementById("ERR").src = "";
					document.getElementById("ERR").src = "/login/img/Modified/easyauthErrors.svg";
					$("#timeout_msg").text("");
				   	$("#timeout_msg").html("Your request could not be processed due to network fluctuations.</br> Please use Other Login methods");
					$("#timeout_msg").hide();
					$("#retry_opt").focus();
	                                $("#ea_error").css("visibility", "visible");
					$("#timeout").show();
				}
			});

		}

		/*script for loader*/

		let progressBar = document.querySelector('.e-c-progress');
		let base = document.querySelector('.e-c-base');
		let dot = document.querySelector('.e-c-pointer')
		let pointer = document.getElementById('e-pointer');
		let display = document.querySelector('.display-remain-time');
		let length = Math.PI * 2 * 100;

		progressBar.style.strokeDasharray = length;

		function update(value, timePercent) {
			var offset = - length - length * value / (timePercent);
			progressBar.style.strokeDashoffset = offset;
			var rotationVal = 360 * value / (timePercent);
			pointer.style.transform = "rotate(" + rotationVal +"deg)";
		};

		const displayOutput = document.querySelector('.display-remain-time')
		var intervalTimer;
		var remainTime;
		let timeLeft;
		let wholeTime = 0.5 * 120; // manage this to set the whole time 

		update(wholeTime, wholeTime); //refreshes progress bar
		displayTimeLeft(wholeTime);
		timer(wholeTime);

		function timer(seconds) { //counts time, takes seconds
			remainTime = Date.now() + (seconds * 1000);
			displayTimeLeft(seconds);
			intervalTimer = setInterval(function () {
				timeLeft = Math.round((remainTime - Date.now()) / 1000);

				if (timeLeft <= 0) {
					clearInterval(intervalTimer);
					isStarted = false;
					displayTimeLeft(wholeTime);

					if($("#timeout_msg").text() == "")
					{

						document.getElementById("ERR").src = "";
						hideNumber(7);}
					return;
				}

				displayTimeLeft(timeLeft);
			}, 1000);
		}

		function displayTimeLeft(timeLeft) { //displays time on the input
			let minutes = Math.floor(timeLeft / 60);
			let seconds = timeLeft % 60;
			var min = minutes < 10 ? '0'+minutes : minutes;
			//var sec = seconds < 10 ? '6'+seconds : seconds;
			var sec = seconds < 1 ? '6'+seconds : seconds < 10 ? '0'+seconds : seconds;
			displayString = sec;
			displayOutput.textContent = displayString+"\nseconds";
			colorChange(timeLeft);
			update(timeLeft, wholeTime);
		}

		function colorChange(timeLeft) {
			if (timeLeft < 16) {
				base.style.stroke = "#E2476C";
				dot.style.fill = "#E2476C";
				dot.style.stroke = "#E2476C";
				display.style.color = "#E2476C";
			}
			else {
				base.style.stroke = "#234e9b";
				dot.style.fill = "#234e9b";
				dot.style.stroke = "#234e9b";
				display.style.color = "#234e9b";
			}
		}

		function reset(t) {
			intervalTimer = 1;
			remainTime = 0;
			timeLeft = t;
			wholeTime = 0.5 * 120;
			update(wholeTime, wholeTime); //refreshes progress bar
			displayTimeLeft(wholeTime);
			timer(wholeTime);
		}

		function hideNumber(flagEA) {

			$("#digit_container").hide();
			$("#timeout").show();
			$("#ea_error").css("visibility", "hidden");
			$("#easyauth-page-subtitle").hide();
			document.getElementById("ERR").src = "";
			if(flagEA == 1 || flagEA == 2){
				document.getElementById("ERR").src = "/login/img/Modified/easyAuthDisabled.svg";
				$("#timeout_msg").text("");		
				$("#timeout_msg").html("EasyAuth option is disabled.</br> Please enable or use another login method.");
				$("#timeout_msg").hide();
				$("#retry_opt").hide();
				$("#ea_error").css("visibility", "visible");
			}else if(flagEA == 3){
				document.getElementById("ERR").src = "/login/img/Modified/easyAuthProcessing.svg";
				$("#timeout_msg").text("");
				$("#timeout_msg").text("Processing your request.");
				$("#timeout_msg").hide();
				 $("#retry_opt").show();
				document.getElementById("retry_opt").disabled = false;
                                $("#ea_error").css("visibility", "visible");
			}else if (flagEA == 4){
				document.getElementById("ERR").src = "/login/img/Modified/easyAuthCanceled.svg";
				$("#timeout_msg").text("");
				 $("#timeout_msg").text("Login request has been canceled.");
				$("#timeout_msg").hide();
				$("#retry_opt").show();
				document.getElementById("retry_opt").disabled = false;
                $("#ea_error").css("visibility", "visible");
			}else if(flagEA == 5 || flagEA == 0){
				document.getElementById("ERR").src = "/login/img/Modified/easyauthErrors.svg";
				$("#timeout_msg").text("");
				$("#timeout_msg").html("Your request could not be processed due to network fluctuations.</br> Please use Other Login methods.");					
				$("#timeout_msg").hide();
				 $("#retry_opt").hide();
				$("#ea_error").css("visibility", "visible");
			}else if (flagEA == 6){

				$("#timeout_msg").text("");

                $("#timeout_msg").hide();
				$("#retry_opt").show();
				document.getElementById("retry_opt").disabled = false;
				document.getElementById("form-submit").disabled = false;
				$("#auth-code-outer").submit();	
			}else if(flagEA == 7){
				document.getElementById("ERR").src = "/login/img/Modified/easyAuthTimeout.svg";
				$("#timeout_msg").text("");
                    		$("#timeout_msg").html("EasyAuth request has timed-out.</br>");
					$("#timeout_msg").hide();
                    $("#retry_opt").show();
					document.getElementById("retry_opt").disabled = false;
                                $("#ea_error").css("visibility", "visible");
			}else if (flagEA == 8){
                                document.getElementById("ERR").src = "/login/img/Modified/easyAuthVersion.svg";
                                $("#timeout_msg").text("");
                                $("#timeout_msg").text("EasyAuth is not supported on your current Authenticator App version.");
								$("#timeout_msg").hide();
                                $("#retry_opt").hide();
                                $("#ea_error").css("visibility", "visible");
                        }else if (flagEA == 9){
                                document.getElementById("ERR").src = "/login/img/Modified/easyAuthData.svg";
                                $("#timeout_msg").text("");
                                $("#timeout_msg").text("Failed to initiate EasyAuth request. Reactivate the app or reopen it if recently reactivated.");
                                $("#timeout_msg").hide();
                                $("#retry_opt").hide();
                                $("#ea_error").css("visibility", "visible");
                        }


                                if(isSSE){
                                        disconnect_SSE();
                                }
                                else{
                                        disconnect();
                                }

		}

function easyAuthResponseHandler(payload) {
	
			if (payload.status == "success") {
				document.getElementById("form-submit").disabled = false;
				$("#auth-code-outer").submit();

			} else {
				$("#easyauth-page-subtitle").hide();
				$("#digit_container").hide();

				$("#timeout_msg").text("");
				document.getElementById("ERR").src = "";

				if(payload.message == "User declined the request"){

					 hideNumber(4);
					
				}else if(payload.message == "option disabled"){
					hideNumber(2);
				}
				else if(payload.message == "Failed to connect server"){
					hideNumber(5);
					$("#retry_opt").show();
					document.getElementById("retry_opt").disabled = false;
				}else if(payload.message == "Invalid Login Attempt"){
					hideNumber(6);

				}

			}
}

$("#retry_opt").on("click", function () {

        if(document.getElementById("retry_opt").disabled == false)
                document.getElementById("retry_opt").disabled = true;

});

