const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('orders-model');

class OrderModel extends CrudModel {
	constructor() {
		super();
		this.table = 'orders';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.order);
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

module.exports = new OrderModel();