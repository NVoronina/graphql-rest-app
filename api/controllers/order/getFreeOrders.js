'use strict';
const orderModel = require('./../../models/orderModel');

module.exports.getFreeOrders = async (req, res)=>{
	try {
		const info = await orderModel.getFreeOrder(req.params.userId);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		res.status(500).send(err);
	}
};
