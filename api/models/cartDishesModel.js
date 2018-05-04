const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('cart-dishes-model');

class CartDishesModel extends CrudModel {
	constructor() {
		super();
		this.table = 'cart_dishes';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.cart_dishes);
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
	async getByToken(token){
		try {
			return await this.db(this.table)
				.select('*')
				.leftJoin('cart', 'cart_dishes.cart_id', 'cart.id')
				.where('cart.token', token);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}

}

module.exports = new CartDishesModel();