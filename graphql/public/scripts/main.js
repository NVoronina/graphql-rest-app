var config = {
	protocol: 'http://',
	host: 'localhost',
	port: ':5000'
};
function ajaxGet(type, url){
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open(type, `${config.protocol}${config.host}${config.port}/${url}`, true);
	xhr.send();
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			// вывести результат
			console.log(xhr.responseText);
		}
	}
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
function getContent(){
	this.lang = getUserLanguage();
	this.methods = [
		getAuthForm(),
		getActiveLanguage(),
		getMenu(),
		getPageContent()
	];
	function getMenu(){
		var menu_list = '';
		for(var li of main_menu[this.lang]){
			menu_list += '<li><a>'+li+'</a></li>';
		}
		document.getElementById('main_menu').innerHTML = menu_list;
	}
	function getAuthForm(){
		document.querySelector('#auth').innerHTML = ' <form method="post"><div>'+
			'<input type="text" name="login" id="login" placeholder="'+auth_form[this.lang].input[0]+'"></div>'+
			'<div><input type="text" name="pass" id="pass" placeholder="'+auth_form[this.lang].input[1]+'"></div>'+
			'<button class="success">'+auth_form[this.lang].buttons[0]+'</button>'+
			'<button class="default"><a href="reg.html">'+auth_form[this.lang].buttons[1]+'</a></button></form>';
	}
	function getActiveLanguage(){
		document.querySelector('option[value="'+this.lang+'"]').setAttribute('selected', 'selected');
	}

	function getUser(){
		// {
		// 	"login":"natalia2",
		// 	"firstname":"Natali",
		// 	"lastname":"Voronina",
		// 	"midname":"Viachesl",
		// 	"phone":"+79219292"
		// }
		var data = ajaxGet('GET', 'users');
		console.log(data);
	}

}

document.getElementById('language').onchange = function(){
	document.cookie = 'lang='+this.value;
	getContent();
};
// первичная отрисовка

