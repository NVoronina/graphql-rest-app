const CrudModel = require('./crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('menu-model');

class EmployeeModel extends CrudModel {
	constructor() {
		super();
		this.table = 'employees';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.employee);
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
	async getWaitressInfo(id){
		try {
			return await this.db(this.table)
				.select('*')
				.leftJoin('users', 'employees.user_id', 'users.id')
				.leftJoin('positions', 'employees.position_id', 'positions.id')
				.leftJoin('restaurant', 'employees.restaurant_id', 'restaurant.id')
				.where('employees.user_id', id)
				.andWhere('employees.deleted', 0)
				.then(result => result[0]);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}
}

module.exports = new EmployeeModel();