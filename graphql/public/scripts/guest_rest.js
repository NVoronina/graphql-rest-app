function getGuestPage(){
	var url = window.location.href.split('/');
	var xhr = ajaxGet(`?query={ 
					restaurant(id:${url[url.length-1]}){ id, name_${lang}, address, site, logo,phone_common, open_time, close_time
					  menu(id:${url[url.length-1]}){id,name_${lang}}}}
					`);
	//menuByRestaurantId(id_rst:${url[url.length-1]}){ id, name_${lang}, dish_type(id:${url[url.length-1]}){id, name_${lang}}
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var rest = JSON.parse(xhr.responseText);
			console.log(rest);
			var html = function (){
				var name = (lang === 'ru') ? 'name_ru' : 'name_en';

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
								<h1>${rest.data.restaurant[name]}</h1>
							</div>
						</div>`;
				html += `<div class="col-md-12 ">
							<ul class="restorans_menu">`;
				for(var i = 0; i < rest.data.restaurant.menu.length; i++){
					html += `<li onclick="menuModalShow(this)" id="menu_${rest.data.restaurant.menu[i].id}">${rest.data.restaurant.menu[i][name]}</li>`;
				}
				html +=	'</ul></div>';
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
			var menuType = JSON.parse(xhr.responseText);
			var html = function (){
				var name = (lang === 'ru') ? 'name_ru' : 'name_en';
				var desc = (lang === 'ru') ? 'desc_ru' : 'desc_en';
				var html = document.createElement('ul');
				var list = '';
				for(var i = 0; i < menuType.data.menu.dish_type.length; i++){
					list += `<li onclick="showDishesList(this)" id="dish_type_${menuType.data.menu.dish_type[i].id}">${menuType.data.menu.dish_type[i][name]}</li>`;
				}
				html.innerHTML = list;
				return html;
			};
			document.getElementById(el.id).appendChild(html());
		}
	};
	console.log(1);
}
function showDishesList(el){
	var id = el.id.replace('dish_type_', '');
	var url = window.location.href.split('/');
	var xhr = ajaxGet(`?query={ 
					dishesByDishesTypeId(id:${id}){ id, name_${lang},price,desc_${lang},photo, kkal}}
					`);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var dishes = JSON.parse(xhr.responseText);
			console.log(dishes);
			var html = function (){
				var name = (lang === 'ru') ? 'name_ru' : 'name_en';
				var desc = (lang === 'ru') ? 'desc_ru' : 'desc_en';
				var html = document.createElement('ul');
				html.className = 'dishes_list';
				var list = '';
				for(var i = 0; i < dishes.data.dishesByDishesTypeId.length; i++){
					list += `<li id="dish_${dishes.data.dishesByDishesTypeId[i].id}">
								<div class="col">
								<p class="dish_name">${dishes.data.dishesByDishesTypeId[i][name]}<p>
								<img src="../assets/images/dishes/${url[url.length-1]}/${dishes.data.dishesByDishesTypeId[i].photo}"
								<p class="dish_desc">${dishes.data.dishesByDishesTypeId[i][desc]}</p>
								<p class="dish_kkal">${dishes.data.dishesByDishesTypeId[i].kkal} kkal</p>
								${dishes.data.dishesByDishesTypeId[i].price} р.<button class="btn btn-light">${common[lang].order}</button>
								</div>
							</li>`;
				}
				html.innerHTML = list;
				return html;
			};
			document.getElementById(el.id).appendChild(html());
		}
	};
	event.stopPropagation();

}
function getCart(){

}
function getContent(){
	// getAuthForm();
	getActiveLanguage();
	getMenu();
	getHeader();
	// getQrReader();
	getCart();
	getGuestPage();
}
getContent();