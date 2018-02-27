const CrudModel = require('./common/crudModel');
const CheckIt = require('checkit');
const logger = require('../logger')('restoran-model');

class RestoranModel extends CrudModel {
	constructor() {
		super();
		this.table = 'restorans';
		this.schema = require('./schema');
		this.checkit = new CheckIt(this.schema.restorans);
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

module.exports = new RestoranModel();