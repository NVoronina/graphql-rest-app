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
// media collapse navbar
var media = window.matchMedia("(max-width: 845px)");

media.addListener(getMenu); // Attach listener function on state changes
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
function activateMenu(){
	document.querySelector('#dark_background').className = 'show';
	var menu_list = '';
	var href = ['/', '/about', '/news', '/restaurants'];
	var cnt = 0;
	menu_list += '<i class="fa fa-times fa-close-icon" onclick="closeMenu(this)"></i><ul class="nav navbar-nav main_menu" id="main_menu_device">';
	for(var li of main_menu[lang]){
		menu_list += '<li><a href="'+href[cnt]+'">'+li+'</a></li>';
		cnt++;
	}
	menu_list += '</ul>';
	document.getElementById('menu_header').innerHTML = menu_list;

}
function closeMenu(){
	document.getElementById('main_menu_device').parentNode.innerHTML = '<i onclick="activateMenu()" class="fa fa-bars fa-navbar"></i>';
	document.querySelector('#dark_background').className = 'hide';

}
function getMenu(){
	var menu_list = '';
	var href = ['/', '/about', '/download', '/restaurants'];
	var cnt = 0;
	var media = window.matchMedia("(max-width: 845px)");
	if (media.matches) { // If media query matches
		menu_list += '<i onclick="activateMenu()" class="fa fa-bars fa-navbar"></i>';
	} else {
		menu_list = '<ul class="nav navbar-nav main_menu" id="main_menu">';
		for(var li of main_menu[lang]){
			menu_list += '<li><a href="'+href[cnt]+'">'+li+'</a></li>';
			cnt++;
		}
		menu_list += '</ul>';
	}
	document.getElementById('menu_header').innerHTML = menu_list;
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
function getQrReader(){
	document.getElementById('qr_reader').innerHTML = `
            <button onclick="videoStream()" class="danger col">${qr_reader[lang]}</button>    
	`;
}
function videoStream(){
	document.getElementById('video_block').className = 'show';
	var	videoGo = document.getElementById("video"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Ошибка видео захвата: ", error.code);
		};
	var constraints = { audio: false, video: { width: 100, height: 100 } };
	navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
		videoGo.srcObject = mediaStream;
		setTimeout(function(){
			var canvasElement = document.querySelector('canvas'),
				video = document.querySelector('video#video'),
				image = document.querySelector('img#snap'),

				context = canvasElement.getContext('2d');
			canvasElement.width = video.width;
			canvasElement.height = 10;
			context.drawImage(video, 0, 0, 10, 10);
			var imageData = context.getImageData(0, 0, 10, 10);
			console.log(imageData.data);
			var imageDataURL = canvasElement.toDataURL('image/png');
			image.setAttribute('src', imageDataURL);
			var imageDataSend = JSON.stringify({
				file:imageDataURL
			});
			var xhr = ajaxPost('qr-code', imageDataSend);
			xhr.onreadystatechange = function() { // (3)
				if (xhr.readyState != 4) return;
				if (xhr.status != 200) {
					console.log(xhr.status + ': ' + xhr.statusText);
				} else {
					//var data = JSON.parse(xhr.responseText);
					console.log(xhr.status + ': ' + xhr.statusText);
					console.log(videoGo);
					mediaStream.getTracks().forEach(function (track) { track.stop(); });
					document.getElementById('video_block').className = 'hide';
					// document.cookie = `user=${data.id}`;
					// вывести результат
					// window.location.href = '/';
				}
			}
		},3000);
	});
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
			console.log(xhr.responseText);
			var data = JSON.parse(xhr.responseText);
			document.cookie = `user=${data.id}`;
			document.cookie = `token=${data.token}`;

			// вывести результат
			getAuthForm();
		}
	}
}
console.log(document.cookie)
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
function showNotation(text, type){
	var div = document.createElement('div');
	div.className = 'notation';
	div.id = type+'notation';
	div.innerText = text;
	document.body.appendChild(div);
	setTimeout(function(){
		var elem = document.getElementById(type+'notation') ;
		elem.parentNode.removeChild(elem);
	},3000);
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
		let toRemove = document.getElementById(attr);
		if(toRemove) {
			toRemove.parentNode.removeChild(toRemove);
		}
	} else {
		data.setAttribute('class','error');
		if(!document.getElementById(attr)) {
			let error = document.createElement('p');
			error.className = "error_text";
			error.id = attr;
			data.style.marginTop = 0;
			error.innerText = errorText;
			data.parentNode.insertBefore(error, data);
		}
	}
}

function getFooter(){
	var year = new Date().getFullYear();
	var htmlFooter = `
	<div class="col-4">
		<div>
			<h4><img class="footer_logo" src="../assets/images/waiter-148663.svg"> ${footer_info[lang].app_name}</h4>
			<p>${footer_info[lang].about}</p>
		</div>
	</div>
	<div class="col-4">
		<div>
			<h4>${footer_info[lang].address_w}</h4>
			<p>${footer_info[lang].phone}: +7 (812) 230-23-23</p>
			<p>${footer_info[lang].address}</p>
		</div>
	</div>
	<div class="col-4">
		<div>
			<h4>${footer_info[lang].social}</h4>
			<i class="fab fa-facebook-square"></i>
			<i class="fab fa-vk"></i>
			<i class="fab fa-google-plus-g"></i>
			<i class="fab fa-twitter"></i>		
			<i class="fab fa-instagram"></i>	
		</div>
	</div>
	<p class="footer_rights">${year} ${footer_info[lang].year_rights}</p>
`;
	document.getElementById('footer_info').innerHTML = htmlFooter;
}
