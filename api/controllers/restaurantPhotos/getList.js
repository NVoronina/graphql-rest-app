'use strict';
const menuModel = require('./../../models/menuModel');

module.exports.getList = async (req, res)=>{
	try {
		const info = await menuModel.getAll(25);
		console.log(info);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		//TODO error handler
	}
	
};
