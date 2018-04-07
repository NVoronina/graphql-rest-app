var config = {
	all: {
		protocol: 'http://',
		host: 'localhost',
		port: ':5000'
	},
	get:{
		protocol: 'http://',
		host: 'localhost',
		port: ':4000'
	}
};

var lang = getUserLanguage();

function ajaxGet(url){
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open("GET", `${config.get.protocol}${config.get.host}${config.get.port}/graphql${url}`, true);
	xhr.send();
	return xhr;
}

function ajaxPost(url, data){
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open("POST", `${config.all.protocol}${config.all.host}${config.all.port}/${url}`, true);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.send(data);
	return xhr;
}

function getUserLanguage(){
	var lang = getCookie('lang');
	if(typeof(lang) === 'undefined'){
		lang = 'ru';
	}
	return lang;
}

// получаем cookie по имени
function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

// рисуем весь контент на странице
function getHeader(){
	document.querySelector('title').innerText = common[lang].title;
}
function getMenu(){
	var menu_list = '';
	var href = ['/', '/about', '/news', '/restaurants'];
	var cnt = 0;
	for(var li of main_menu[lang]){
		menu_list += '<li><a href="'+href[cnt]+'">'+li+'</a></li>';
		cnt++;
	}
	document.getElementById('main_menu').innerHTML = menu_list;
}
function getAuthForm(){
	var token = getCookie('token');
	var html = ' <form method="post" id="auth_form"><div>' +
		'<input type="text" name="login" id="login" placeholder="' + auth_form[lang].input[0] + '"></div>' +
		'<div><input type="password" name="pass" id="pass" placeholder="' + auth_form[lang].input[1] + '"></div>' +
		'<button type="submit" class="success">' + auth_form[lang].buttons[0] + '</button>' +
		'<button class="default"><a href="/registration">' + auth_form[lang].buttons[1] + '</a></button></form>';
	if(token !== undefined) {
		var xhr = ajaxGet('?query={ userByToken(token:"'+token+'"){ id, firstname, lastname } }');
		xhr.onreadystatechange = function() { // (3)
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else {
				console.log(xhr.responseText);
				var user = JSON.parse(xhr.responseText);

				if (user.data.userByToken !== null) {
					html = `
						<div class="autorized"></div>
							<img src="../assets/images/avatar-incognito.jpg" class="rounded-circle">
							<p class="welcome">${auth_form[lang].welcome}, ${user.data.userByToken.firstname}</p>
							<button class="default" id="logout">
								${auth_form[lang].buttons[2]}
							</button>
						</div>`;
					document.querySelector('#auth').innerHTML = html;
					document.getElementById('logout').onclick = logout;
				} else {
					document.querySelector('#auth').innerHTML = html;
					document.getElementById('auth_form').onsubmit = authoraizeUser;
				}
			}
		}
	} else {
		document.querySelector('#auth').innerHTML = html;
		document.getElementById('auth_form').onsubmit = authoraizeUser;
	}
}
function authoraizeUser(event){
	event.preventDefault();
	var data = JSON.stringify({
		login: document.getElementById('login').value,
		password: document.getElementById('pass').value
	});
	var xhr = ajaxPost('users/auth', data);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var data = JSON.parse(xhr.responseText);
			document.cookie = `user=${data.id}`;
			// вывести результат
			window.location.href = '/';
		}
	}
}
function logout(){
	var data = JSON.stringify({
		id: getCookie('user')
	});

	var xhr = ajaxPost('users/logout', data);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			document.cookie = "token=''; path=/; expires=-1";
			document.cookie = "user=''; path=/; expires=-1";
			console.log(JSON.parse(xhr.responseText));
			// вывести результат
			window.location.href = '/';
		}
	}
}
function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}
// удаляет cookie
function deleteCookie(name) {

	setCookie(name, null, { expires: -1 })

}
function getActiveLanguage(){
	document.querySelector('option[value="'+lang+'"]').setAttribute('selected', 'selected');
}

document.getElementById('language').onchange = function(){
	deleteCookie('lang');
	setCookie('lang', this.value);
	lang = getUserLanguage();
	getContent();
};
// функция валидации и вывода ошибок
function validate(data, regexp, errorText, attr){
	if(data.value.match(regexp)){
		data.className = 'valid';
		var toRemove = document.getElementById(attr);
		if(toRemove) {
			toRemove.parentNode.removeChild(toRemove);
		}
	} else {
		data.setAttribute('class','error');
		if(!document.getElementById(attr)) {
			var error = document.createElement('p');
			error.className = "error_text";
			error.id = attr;
			data.style.marginTop = 0;
			error.innerText = errorText;
			data.parentNode.insertBefore(error, data);
		}
	}
}
