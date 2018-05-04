'use strict';
const userModel = require('./../../models/userModel');

module.exports.getList = async (req, res)=>{
	if(req.query.login) {
		try {
			const info = await userModel.getBy('login', req.query.login);
			if (info._status) {
				res.status(info._status).send(info);
			} else {
				res.send(info);
			}
		} catch (err) {
			res.status(500).send(err);
		}

	} else if(req.query.token){
		try {
			const info = await userModel.getBy('token', req.query.token);
			if (info._status) {
				res.status(info._status).send(info);
			} else {
				res.send(info);
			}
		} catch (err) {
			res.status(500).send(err);
		}
	} else {
		try {
			const info = await userModel.getAll(25);
			if (info._status) {
				res.status(info._status).send(info);
			} else {
				res.send(info);
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}

};
