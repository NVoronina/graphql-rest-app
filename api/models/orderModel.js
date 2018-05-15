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
	/**
	 *
	 * @param userId
	 * @returns {Promise.<*>}
	 */
	async getFreeOrder(userId){
		try {
			return await this.db(this.table)
				.select(['table','orders.id','order_dishes.dishes_id',
					'dishes.name_ru','dishes.name_en','status',
					'orders.restaurant_id','orders.employee_id'])
				.leftJoin('restaurant', 'orders.restaurant_id', 'restaurant.id')
				.leftJoin('employees', 'restaurant.id', 'employees.restaurant_id')
				.leftJoin('order_dishes', 'orders.id', 'order_dishes.order_id')
				.leftJoin('dishes', 'order_dishes.dishes_id', 'dishes.id')
				.where('employees.user_id', userId)
				.andWhere('orders.employee_id', null);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}
	/**
	 *
	 * @param userId
	 * @returns {Promise.<*>}
	 */
	async getOrdersByWaitress(userId){
		try {
			return await this.db(this.table)
				.select(['table','orders.id','order_dishes.dishes_id',
					'dishes.name_ru','dishes.name_en','status',
					'orders.restaurant_id','orders.employee_id'])
				.innerJoin('employees', 'orders.employee_id', 'employees.id')
				.innerJoin('users', 'employees.user_id', 'users.id')
				.leftJoin('order_dishes', 'orders.id', 'order_dishes.order_id')
				.leftJoin('dishes', 'order_dishes.dishes_id', 'dishes.id')

				.where('users.id', userId);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}
}

module.exports = new OrderModel();