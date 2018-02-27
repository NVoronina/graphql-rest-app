'use strict';
const userModel = require('./../../models/userModel');

module.exports.getOne = async (req, res)=>{
	try {
		const info = await userModel.getById(req.params.id);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		//TODO error handler
	}

};
