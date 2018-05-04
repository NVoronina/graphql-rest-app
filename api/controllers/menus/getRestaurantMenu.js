'use strict';
const menuModel = require('../../models/menuModel');

module.exports.getRestaurantMenu = async (req, res)=>{
	try {
		const info = await menuModel.getBy('restaurant_id', req.query.restaurant);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		res.status(500).send(err);
	}
	
};
