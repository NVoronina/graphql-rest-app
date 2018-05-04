'use strict';
const userModel = require('./../../models/userModel');
const generateToken = require('./generateToken');

module.exports.logout = async (req, res)=>{
	try {
		var data = {
			token: '',
			session_id: ''
		};
		let info = await userModel.update(req.body.id, data);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			let user = await userModel.getById(req.body.id);
			res.send(user);
		}

	} catch (err){
		res.status(500).send(err);
	}
};
