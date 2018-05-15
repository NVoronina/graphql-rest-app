'use strict';
const employeeModel = require('../../models/employeeModel');

module.exports.getWaitress = async (req, res)=>{
	try {
		const info = await employeeModel.getWaitressInfo(req.params.id);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		res.status(500).send(err);
	}
};
