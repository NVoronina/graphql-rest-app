'use strict';
const restaurantPhotosModel = require('../../models/restaurantPhotosModel');

module.exports.getRestaurantPhotos = async (req, res)=>{
	try {
		const info = await restaurantPhotosModel.getBy('restaurant_id', req.params.id);
		console.log(info);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		res.status(500).send(err);
	}
	
};
