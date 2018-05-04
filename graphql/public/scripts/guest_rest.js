function getGuestPage(){
	var url = window.location.href.split('/');
	var id = url[url.length-2];
	var token = getCookie('token');

	var xhr = ajaxGet(`?query={
						restaurant(id:${id}){ id, name_${lang}
					        menu(id:${id}){id,name_${lang}}
					    }
					    cartDishesByToken(token:"${token}"){id}
					}`);
	//menuByRestaurantId(id_rst:${url[url.length-1]}){ id, name_${lang}, dish_type(id:${url[url.length-1]}){id, name_${lang}}
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var rest = JSON.parse(xhr.responseText);
			var html = function (){
				var name = (lang === 'ru') ? 'name_ru' : 'name_en';

				var html = '<div class="row" class="easy">';

				html += `<div class="col-md-12">
							<h1>${common[lang].welcome} "${rest.data.restaurant['name_'+lang]}"</h1>
							<i class="fa fa-shopping-cart fa-2x"></i>
							<span class="counter" id="cart_counter">${rest.data.cartDishesByToken.length}</span>
						</div>
						<div class="col-md-12">
							<button id="place_order" onclick="placeOrder()">${common[lang].place_order}</button>
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
function getClientPage(){
	var url = window.location.href.split('/');
	var id = url[url.length-2];
	var token = getCookie('token');

	var xhr = ajaxGet(`?query={
						restaurant(id:${id}){ id, name_${lang}
					        menu(id:${id}){id,name_${lang}}
					    }
					    cartDishesByToken(token:"${token}"){id}
					    orderDishesByToken(token:"${token}"){id, name_${lang}}
					}`);
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

				var html = '<div class="row" class="easy">';

				html += `<div class="col-md-12">
							<i class="fa fa-shopping-cart fa-2x"></i>
							<span class="counter" id="cart_counter">${rest.data.cartDishesByToken.length}</span>
						</div>
						<div class="col-md-12">
							<button id="place_order" onclick="placeOrder()">${common[lang].add_order}</button>
							<button id="get_waitress" class="danger">${common[lang].get_waitress}</button>
							<button id="take_bill" class="success">${common[lang].take_bill}</button>
						</div>
						<div class="col-md-12">`;
				for(let i = 0; i < rest.data.cartDishesByToken.length; i++){
					html += `<div class="col">${rest.data.cartDishesByToken[i]['name_'+lang]}</div>`
				}
				html += `</div>
						<div class="col-md-12 ">
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
function placeOrder(){
	document.getElementById('place_order').setAttribute('disabled','disabled');
	var token = getCookie('token');

	var body = JSON.stringify({
		token: token
	});
	var xhr = ajaxPost(`order`, body);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status !== 201) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			document.getElementById('cart_counter').innerText = "0";
			getClientPage();
			showNotation(common[lang].success_order);
		}
	}
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
}
function showDishesList(el){
	var id = el.id.replace('dish_type_', '');
	var url = window.location.href.split('/');
	var idFromUrl = url[url.length-2];
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
					list += `<li>
								<div class="col">
								<p class="dish_name">${dishes.data.dishesByDishesTypeId[i][name]}<p>
								<img src="../../assets/images/dishes/${idFromUrl}/${dishes.data.dishesByDishesTypeId[i].photo}"
								<p class="dish_desc">${dishes.data.dishesByDishesTypeId[i][desc]}</p>
								<p class="dish_kkal">${dishes.data.dishesByDishesTypeId[i].kkal} kkal</p>
								${dishes.data.dishesByDishesTypeId[i].price} р.<button class="btn btn-light" id="dish_${dishes.data.dishesByDishesTypeId[i].id}" onclick="addToCart(this)">${common[lang].order}</button>
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
function addToCart(el){
	var url = window.location.href.split('/');
	var token = getCookie('token');
	var body = {
		dish: el.id.replace('dish_', ''),
		restaurant: url[url.length-2],
		table: url[url.length-1]
	};
	if(token !== undefined) {
		body.token = token;
	}
	var xhr = ajaxPost('add-to-cart', JSON.stringify(body));
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var data = JSON.parse(xhr.responseText);
			if(data.token) {
				document.cookie = `token=${data.token}`;
			}
			var cnt = document.getElementById('cart_counter');
			console.log(cnt.textContent);
			cnt.innerText = Number(cnt.textContent)+1;

		}
	}

	event.stopPropagation();
}
function getContent(){
	// getAuthForm();
	getActiveLanguage();
	getMenu();
	getHeader();
	// getQrReader();
	getGuestPage();
}

getContent();