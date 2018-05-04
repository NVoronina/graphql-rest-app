const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('restaurant-photo-model');

class MenuModel extends CrudModel {
	constructor() {
		super();
		this.table = 'restaurant_photos';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.restaurant_photo);
	}

	async validate(items){
		try {
			return this.checkit.run(items)
				.then(async data => {
					return data;
				})
				.catch(err => {
					logger.error('ERROR', err);
					return err;
				});
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}
}

module.exports = new MenuModel();