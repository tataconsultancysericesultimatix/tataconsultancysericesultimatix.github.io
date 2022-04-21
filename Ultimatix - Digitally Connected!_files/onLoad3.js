	var isIE;
$(document).ready(function () {
	isIE = /*@cc_on!@*/false || !!document.documentMode || /Edge/.test(navigator.userAgent);
	if(isIE)
	{
		$("#image-logout").hide();
	}
	setTimeout(userNameFocus, 300);
	$("#field_blank").show();
	$("#second-page-div").hide();
	$("#auth-code-outer").show();
	$("#password-outer").hide();
	$("#easyauth-outer").hide();
	$("#auth-code-inner1").hide();
	$("#submit-button").hide();
	$("#username-static").hide();
	$("#msg2").hide();
		$.ajax({
			url: "/login/txt/termsOfUse.txt",
			cache: false,
			success: function(html){
				document.getElementById("termsModal").innerHTML = html;
				document.getElementById("termsofUseModalLongTitle").innerHTML = "Terms of Use";
				document.getElementById("termsModalMobile").innerHTML = html;
                                document.getElementById("termsofUseModalLongTitleMobile").innerHTML = "Terms of Use";
		
	}
		}); 
		$.ajax({
			url: "/login/txt/browserCompatibility.txt",
			cache: false,
			success: function(html){
				document.getElementById("browserCompatibilityTitleBody").innerHTML = html;
				document.getElementById("browserCompatibilityTitle").innerHTML = "Browser and Display Compatibility";
			}
		}); 
	});

	function alertDowntime(){
		alert(downtimeMessage);
	}

//Show Hide img toggle

$('.ok-button').hide();

document.getElementById('edit-button').addEventListener("keydown", function(event){
	if(event.keyCode==13)
	{
		hideShowFirst();
	}
  });
document.getElementById('ok-button').addEventListener("keydown", function(event){
	if(event.keyCode==13)
	{
		hideShowSecond();
	}
  });


document.getElementById('edit-button2').addEventListener("keydown", function(event){
	if(event.keyCode==13)
	{
		hideShowFirst();
	}
  });
document.getElementById('ok-button2').addEventListener("keydown", function(event){
	if(event.keyCode==13)
	{
		hideShowSecond();
	}
  });
