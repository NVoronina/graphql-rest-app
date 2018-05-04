'use strict';
const menuModel = require('../../models/dishTypesModel');

module.exports.getDishTypesByMenu = async (req, res)=>{
	try {
		const info = await menuModel.getBy('menu_id', req.query.menu);
		if (info._status) {
			res.status(info._status).send(info);
		} else {
			res.send(info);
		}
	} catch (err){
		res.status(500).send(err);
	}

};
