'use strict';
const cartDishesModel = require('./../../models/cartDishesModel');

module.exports.getByToken = async (req, res)=>{
	try {
		const info = await cartDishesModel.getByToken(req.params.token);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		res.status(500).send(err);
	}

};
