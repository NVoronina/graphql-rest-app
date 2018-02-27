const CrudModel = require('./common/crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('user-model');

class UserModel extends CrudModel {
	constructor() {
		super();
		this.table = 'users';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.user);
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

module.exports = new UserModel();