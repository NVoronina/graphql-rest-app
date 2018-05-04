const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('restaurant-model');

class RestaurantModel extends CrudModel {
	constructor() {
		super();
		this.table = 'restaurant';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.restaurant);
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

module.exports = new RestaurantModel();