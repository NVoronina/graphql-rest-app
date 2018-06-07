function getRestoransList(){
	var url = window.location.href.split('/');
	var xhr = ajaxGet(`?query={ 
					restaurant(id:${url[url.length-1]}){ id, name_${lang}, desc_${lang}, address, site, logo,phone_common, open_time, close_time
					  menu(id:${url[url.length-1]}){id,name_${lang}},photos(id:${url[url.length-1]}){id,photo} }}
					`);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var rest = JSON.parse(xhr.responseText);
			console.log(rest);
			var html = function (){
				var name = (lang === 'ru') ? 'name_ru' : 'name_en';
				var desc = (lang === 'ru') ? 'desc_ru' : 'desc_en';

				var html = '<div class="row">';
				var toShow = {};
				toShow.time_from = (rest.data.restaurant.open_time)?(common[lang].from+' '+rest.data.restaurant.open_time):common[lang].from+' -';
				toShow.time_till = (rest.data.restaurant.close_time)?(common[lang].till+' '+rest.data.restaurant.close_time):common[lang].till+' -';
				toShow.address = (rest.data.restaurant.address) ? rest.data.restaurant.address : common[lang].no_address;
				toShow.phone_common = (rest.data.restaurant.phone_common) ? rest.data.restaurant.phone_common : common[lang].no_phone_common;
				toShow.phone_tables_booked = (rest.data.restaurant.phone_tables_booked) ? rest.data.restaurant.phone_tables_booked : common[lang].no_phone_tables_booked;

				html += `<div class="col-md-12">
							<div class="restaurant_block">
								<img class="rest_logo" src="../assets/images/${rest.data.restaurant.logo}"/>
								<div class="rest_address">${common[lang].address}: ${toShow.address}</div>
								<div class="rest_phone">${common[lang].phone_common}: ${toShow.phone_common}</div>
								<div class="rest_time">${common[lang].time}: ${toShow.time_from} ${toShow.time_till}</div>
							</div>
						</div>`;
				html += `<div class="col-md-6">
							<h1>${rest.data.restaurant[name]}</h1>
							<p>${rest.data.restaurant[desc]}</p><ul class="restorans_menu">`;
				for(var i = 0; i < rest.data.restaurant.menu.length; i++){
					html += `<li onclick="menuModalShow(this)" id="menu_${rest.data.restaurant.menu[i].id}">${rest.data.restaurant.menu[i][name]}</li>`;
				}
				html +=	'</ul></div>';
				html += '<div class="col-md-6">';
				for(var i = 0; i < rest.data.restaurant.photos.length; i++){
					html += `<img class="restaurant_photo" src="../assets/images/restaurant/${url[url.length-1]}/${rest.data.restaurant.photos[i].photo}">`;
				}

				html += '</div>';
				html += '</div>';
				return html;
			};

			document.getElementById('content').innerHTML = html();
		}
	};
}
function menuModalShow(el){
	var id = el.id.replace('menu_', '');
	var xhr = ajaxGet(`?query={ 
					menu(id:${id}){ id, name_${lang}, dish_type(id:${id}){id, name_${lang}}}}
					`);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var rest = JSON.parse(xhr.responseText);
			console.log(rest);
			var html = function (){
				var name = (lang === 'ru') ? 'name_ru' : 'name_en';
				var desc = (lang === 'ru') ? 'desc_ru' : 'desc_en';

				var html = '<div class="row">';
				html += `<div class="col-md-12">
							<div class="restaurant_block">
								<img class="rest_logo" src="../assets/images/${rest.data.restaurant.logo}"/>
								<div class="rest_address">${common[lang].address}: ${toShow.address}</div>
								<div class="rest_phone">${common[lang].phone_common}: ${toShow.phone_common}</div>
								<div class="rest_time">${common[lang].time}: ${toShow.time_from} ${toShow.time_till}</div>
							</div>
						</div>`;
				html += `<div class="col-md-6">
							<h1>${rest.data.restaurant[name]}</h1>
							<p>${rest.data.restaurant[desc]}</p><ul class="restorans_menu">`;
				for(var i = 0; i < rest.data.restaurant.menu.length; i++){
					html += `<li onclick="menuModalShow(this)" id="menu_${rest.data.restaurant.menu[i].id}">${rest.data.restaurant.menu[i][name]}</li>`;
				}
				html +=	'</ul></div>';
				html += '<div class="col-md-6">';
				for(var i = 0; i < rest.data.restaurant.photos.length; i++){
					html += `<img class="restaurant_photo" src="../assets/images/${url[url.length-1]}/${rest.data.restaurant.photos[i].photo}">`;
				}

				html += '</div>';
				html += '</div>';
				return html;
			};
			document.getElementById('content').innerHTML = html();
		}
	};
}
function getContent(){
	getAuthForm();
	getActiveLanguage();
	getMenu();
	getHeader();
	getRestoransList();
	getQrReader();
	getFooter();
}
getContent();