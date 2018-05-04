'use strict';
const cartModel = require('../../models/cartModel');
const cartDishesModel = require('../../models/cartDishesModel');
const generateToken = require('../users/generateToken');

module.exports.addToCart = async (req, res)=>{
	try {
		if(req.body.token !== '') {
			const cartId = await cartModel.getBy('token', req.body.token);
			if (cartId.length === 1) {
				await cartDishesModel.add({
					cart_id: cartId[0].id,
					dishes_id: req.body.dish
				});
				res.send({status:"ok"});
			} else {
				const token = await generateToken(32);
				let cartId = await cartModel.add({
					table: req.body.table,
					restaurant_id: req.body.restaurant,
					token: token,
				});
				await cartDishesModel.add({
					cart_id: cartId,
					dishes_id: req.body.dish
				});
				res.send({token:token});
			}

		} else {
			const token = await generateToken(32);
			let cartId = await cartModel.add({
				table: req.params.table,
				restaurant_id: req.params.restaurant,
				token: token
			});
			await cartDishesModel.add({
				cart_id: cartId,
				dishes_id: req.body.dish
			});
			res.send({token:token});
		}
	} catch (err){
		res.status(500).send(err);
	}

};
