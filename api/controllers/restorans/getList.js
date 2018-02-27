'use strict';
const restoranModel = require('./../../models/restoranModel');

module.exports.getList = async (req, res)=>{
	try {
		const info = await restoranModel.getAll(25);
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
