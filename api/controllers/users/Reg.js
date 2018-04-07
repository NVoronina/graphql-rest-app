'use strict';
const userModel = require('./../../models/userModel');
const generateToken = require('./generateToken');
const sha1 = require('sha1');

module.exports.Reg = async (req, res)=>{
	try {
		let valid = await userModel.validate(req.body);
		valid.token = await generateToken(32);
		valid.session_id = req.sessionID;
		valid.password = sha1(req.body.password + valid.login);
		let info = await userModel.add(valid);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			let user = await userModel.getById(info);
			res.send(user);
		}
	} catch (err){
		//TODO error handler
	}

};
