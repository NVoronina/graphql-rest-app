'use strict';
const userModel = require('./../../models/userModel');

module.exports.getList = async (req, res)=>{
	try {
		const info = await userModel.getAll(25);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		//TODO error handler
	}

};
