/**
 * Created by Natalia on 08.05.2018.
 */
function getWaitressPage(){
	var user = getCookie('user');
	var xhr = ajaxGet(`?query={ 
						employee(id:${user}){ id, name_${lang}, firstname, lastname, name}
						ordersByWaitress(id:${user}){id,name_${lang},status,table}
						freeOrdersByWaitress(id:${user}){id,name_${lang},status,table}
					}`);
	xhr.onreadystatechange = function() { // (3)
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
		} else {
			console.log(xhr.responseText);
			let data = JSON.parse(xhr.responseText);
			let freeOrdersHtml = '';
			let waitressOrdersHtml = '';
			for(let i = 0; i < data.data.ordersByWaitress.length; i++){
				waitressOrdersHtml += `<div class='col' onclick="">
											<div class='order_waitress'>
												${common[lang].table} № ${data.data.ordersByWaitress[i].table}
												${data.data.ordersByWaitress[i]['name_'+lang]}
											</div>
										</div>`
			}
			for(let i = 0; i < data.data.freeOrdersByWaitress.length; i++){
				freeOrdersHtml += `<div class='col-3'>
										<div class='order_free'>
											${common[lang].table} № ${data.data.freeOrdersByWaitress[i].table}
										</div>
									</div>`
			}
			let html = `<div class="row">
							<h2>Ресторан ${data.data.employee['name_'+lang]}</h2>
							<h3>Свободные заказы</h3>
							<div class="row">${freeOrdersHtml}</div>
							<h3>Ваши столики</h3>
							<div class="row">${waitressOrdersHtml}</div>
						</div>`;

			document.getElementById('content').innerHTML = html;
		}
	};
}
function acceptTable(){

}
function getContent(){
	getAuthForm();
	getActiveLanguage();
	getMenu();
	getWaitressPage();
	getHeader();
	getFooter();
}
getContent();
