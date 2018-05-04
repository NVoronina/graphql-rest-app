const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('dishes-model');

class DishModel extends CrudModel {
	constructor() {
		super();
		this.table = 'dishes';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.dishes);
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

module.exports = new DishModel();