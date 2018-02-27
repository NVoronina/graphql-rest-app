getContent.getPageContent = function(){
	document.getElementById('content').innerHTML = '<form method="post">'+
		'<label for="login_reg">'+reg_form[lang].login+'</label><input type="text" name="login_reg" id="login_reg">'+
		'</form>';
};

getContent();
