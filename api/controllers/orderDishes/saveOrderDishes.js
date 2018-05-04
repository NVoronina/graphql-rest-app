'use strict';
const orderDishesModel = require('./../../models/orderDishesModel');

module.exports.saveOrderDishes = async (req, res)=>{
	try {
		const info = await orderDishesModel.getById(req.params.id);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		res.status(500).send(err);
	}

};
