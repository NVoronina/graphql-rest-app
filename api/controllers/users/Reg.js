'use strict';
const userModel = require('./../../models/userModel');

module.exports.Reg = async (req, res)=>{
	try {
		let valid = await userModel.validate(req.body);
		let info = await userModel.add(valid);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		//TODO error handler
	}

};
