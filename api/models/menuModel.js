const CrudModel = require('./common/crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('menu-model');

class MenuModel extends CrudModel {
	constructor() {
		super();
		this.table = 'menus';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.menu);
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
	async getFullMenu(id){
		try {
			return await this.db(this.table)
				.select('*')
				.leftJoin('dish_types', 'menus.id', 'dish_types.menu_id')
				.where('menus.id', id)
				.then(result => result[0]);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}
}

module.exports = new MenuModel();