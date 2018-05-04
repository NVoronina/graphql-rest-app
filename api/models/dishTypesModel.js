const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('dish-type-model');

class RestaurantModel extends CrudModel {
	constructor() {
		super();
		this.table = 'dish_types';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.dish_types);
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