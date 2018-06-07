function getRestaurantInfo(){
	var xhr = ajaxGet(`?query={ restaurants{ id,name_${lang},address,logo,phone_common, open_time, close_time  } }`);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			var rList = JSON.parse(xhr.responseText);
			var html = function (){
				var html = '<div class="row">';
				for(var i = 0; i < rList.data.restaurants.length; i++){
					var toShow = {};
					toShow.time_from = (rList.data.restaurants[i].open_time)?(common[lang].from+' '+rList.data.restaurants[i].open_time):common[lang].from+' -';
					toShow.time_till = (rList.data.restaurants[i].close_time)?(common[lang].till+' '+rList.data.restaurants[i].close_time):common[lang].till+' -';
					var name = (lang === 'ru') ? 'name_ru' : 'name_en';
					html += `<div class="col-md-4">
								<a class="link_no_line" href="${window.location}/${rList.data.restaurants[i].id}">
									<div class="restaurant_block">
										<img class="rest_logo" src="../assets/images/${rList.data.restaurants[i].logo}"/>
										<div class="rest_name">${rList.data.restaurants[i][name]}</div>
										<div class="rest_address">${common[lang].address}: ${rList.data.restaurants[i].address}</div>
										<div class="rest_phone">${common[lang].phone_common}: ${rList.data.restaurants[i].phone_common}</div>
										<div class="rest_time">${common[lang].time}: ${toShow.time_from} ${toShow.time_till}</div>
									</div>
								</a>
							</div>`;
				}
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
	getRestaurantInfo();
	getQrReader();
	getFooter();
}
getContent();