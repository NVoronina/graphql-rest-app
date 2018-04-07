function getRegForm(){
	document.getElementById('content').innerHTML = '<div class="form_header"><h2>'+reg_form[lang].header+'</h2></div>'+
		'<form method="post" id="reg_form">'+
			'<div><label for="login_reg">'+reg_form[lang].login+' *</label><br/><input type="text" name="login_reg" id="login_reg" >'+
			'</div>' +
			'<div class="row">' +
				'<div class="col-md-6">' +
					'<label for="pass_reg">'+reg_form[lang].password+' *</label><input type="password" name="pass_reg" id="pass_reg" >'+
				'</div>'+
				'<div class="col-md-6">' +
					'<label for="pass2_reg">'+reg_form[lang].password2+' *</label><input type="password" name="pass2_reg" id="pass2_reg" >' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-md-4">' +
					'<label for="firstname">'+reg_form[lang].firstname+' *</label><input type="text" name="firstname" id="firstname" >'+
				'</div>' +
				'<div class="col-md-4">' +
					'<label for="lastname">'+reg_form[lang].lastname+' *</label><input type="text" name="lastname" id="lastname" >'+
				'</div>' +
				'<div class="col-md-4">' +
					'<label for="midname">'+reg_form[lang].midname+'</label><input type="text" name="midname" id="midname">' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-md-6">' +
					'<label for="email">'+reg_form[lang].email+' *</label><input type="text" name="email" id="email" >'+
				'</div>'+
				'<div class="col-md-6">' +
					'<label for="phone">'+reg_form[lang].phone+'</label><input type="text" name="phone" id="phone">' +
				'</div>' +
			'</div>' +
			'<div class="buttons_block">' +
				'<button class="success" type="submit">'+reg_form[lang].buttons[0]+'</button>'+
				'<button class="danger" type="reset">'+reg_form[lang].buttons[1]+'</button>' +
			'</div>'+
		'</form>';
	//TODO validation input
	document.getElementById('login_reg').onblur = function(){
		var elem = document.getElementById('login_reg');
		var xhr = ajaxGet('?query={ userByLogin(login:"'+elem.value+'"){ id } }');
		xhr.onreadystatechange = function() { // (3)
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				console.log(xhr.responseText);
				var user = JSON.parse(xhr.responseText);
				var attr = 'error_login_isused';
				var errorText = reg_form[lang].error.login_used;
				if(user.data.userByLogin === null){
					elem.className = 'valid';
					var toRemove = document.getElementById(attr);
					if(toRemove) {
						toRemove.parentNode.removeChild(toRemove);
					}
				} else {
					elem.className = 'error';
					if(!document.getElementById(attr)) {
						var error = document.createElement('p');
						error.className = "error_text";
						error.id = attr;
						elem.style.marginTop = 0;
						error.innerText = errorText;
						elem.parentNode.insertBefore(error, elem);
					}
				}
			}
		};
	};
	document.getElementById('reg_form').onsubmit = function(e){
		e.preventDefault();
		var data = JSON.stringify({
			phone: document.getElementById('phone').value,
			firstname: document.getElementById('firstname').value,
			lastname: document.getElementById('lastname').value,
			midname: document.getElementById('midname').value,
			login: document.getElementById('login_reg').value,
			password: document.getElementById('pass_reg').value,
			email: document.getElementById('email').value
		});

		var xhr = ajaxPost('users/reg', data);
		xhr.onreadystatechange = function() { // (3)
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				var data = JSON.parse(xhr.responseText);
				// вывести результат
				document.cookie = `token=${data.token}`;
				document.cookie = `user=${data.id}`;
				window.location.href = '../';
			}
		}
	}
}

function getContent(){
	getAuthForm();
	getActiveLanguage();
	getMenu();
	getRegForm();
	getHeader();
}
getContent();
