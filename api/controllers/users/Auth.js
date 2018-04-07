'use strict';
const userModel = require('./../../models/userModel');
const generateToken = require('./generateToken');
const sha1 = require('sha1');

module.exports.Auth = async (req, res)=>{
	try {
		let password = sha1(req.body.password + req.body.login);

		let findUser = await userModel.getByLoginPassword(req.body.login, password);
		if(findUser.length === 1) {
			var data = {
				token:await generateToken(32),
				session_id: req.sessionID
			};
			let info = await userModel.update(findUser[0].id, data);
			if (info._status) {
				res.status(info._status).send(info);
			} else {
				let user = await userModel.getById(findUser[0].id);
				res.send(user);
			}
		} else {
			res.send("No such user");
		}
	} catch (err){
		//TODO error handler
	}

};
