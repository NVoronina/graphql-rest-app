const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('order-dishes-model');

class OrderDishesModel extends CrudModel {
	constructor() {
		super();
		this.table = 'order_dishes';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.order_dishes);
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
				.leftJoin('orders', 'order_dishes.order_id', 'orders.id')
				.leftJoin('dishes', 'order_dishes.dishes_id', 'dishes.id')
				.where('orders.token', token);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}
}

module.exports = new OrderDishesModel();