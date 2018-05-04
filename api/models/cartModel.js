const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('cart-model');

class CartModel extends CrudModel {
	constructor() {
		super();
		this.table = 'cart';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.cart);
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

module.exports = new CartModel();