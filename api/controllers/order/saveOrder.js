'use strict';
const cartModel = require('../../models/cartModel');
const orderModel = require('./../../models/orderModel');
const orderDishesModel = require('./../../models/orderDishesModel');
const cartDishesModel = require('./../../models/cartDishesModel');

module.exports.saveOrder = async (req, res)=>{
	try {
		if(req.body.token !== '') {
			const cart = await cartModel.getBy('token', req.body.token);
			if (cart.length === 1) {
				let order = await orderModel.add({
					table: cart[0].table,
					restaurant_id: cart[0].restaurant_id,
					token: req.body.token,
				});
				let cartDishes = await cartDishesModel.getByToken(req.body.token);
				if(order.length === 1 && cartDishes.length > 0) {
					let orderDishes = [];
					let cartDishesIds = [];
					for (let i = 0; i < cartDishes.length; i++) {
						cartDishesIds.push(cartDishes[i].id);
						orderDishes.push({
							order_id: order[0],
							dishes_id: cartDishes[i].dishes_id,
						});
					}
					let orderDishesSave = await orderDishesModel.add(orderDishes);
					if(orderDishesSave.length > 0){
						console.log('suc');
						await cartModel.remove(cart[0].id);
						res.status(201).send("created")
					} else {
						res.status(400).send("error")
					}
				} else{
					res.status(400).send("error")
				}
			} else {
				res.status(400).send("error")
			}

		} else {
			res.send(400, 'error');
		}
	} catch (err){
		res.status(500).send(err);
	}

};
