var uname = $("#username"),
	pass1 = $("#pass"),
	pass2 = $("#pass-confirm"),
	signup = $("#signup-btn");

//a little front end assistance to signing up
setInterval(function(){
	if(uname && uname.val().length > 3 && pass1.val().length > 3 && pass1.val() === pass2.val())
		signup.prop("disabled", false);
	else
		signup.attr("disabled", true);
}, 200);

	
