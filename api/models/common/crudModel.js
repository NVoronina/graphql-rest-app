const DB = require('../../db');
const logger = require('../../logger')('crud-model');

/**
 * Класс описывающий основные операции CRUD
 */
class CrudModel {
	constructor() {
		this.db = DB;
	}

	/**
	 * Получение списка
	 * */
	async getAll(limit) {
		try {
			return await this.db(this.table)
				.select('*')
				.limit(limit);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}

	/**
	 * Получение по id
	 * */
	async getById(id) {
		try {
			return await this.db(this.table)
				.select('*')
				.where('id', id)
				.then(result => result[0]);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}

	/**
	 * Получение по переданному параметру и значению
	 * @param param
 * 	 * @param value
	 * @returns {Promise.<*>}
	 */
	async getBy(param, value) {
		try {
			return await this.db(this.table)
				.select('*')
				.where(param, value);
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}

	/**
	 * Запись значений в базу
	 * @param item
	 * @returns {Promise.<*>}
	 */
	async add(item) {
		try {
			return await this.db(this.table)
				.insert(item, '*');
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}

	/**
	 * @param id
	 * @returns {Promise.<*>}
	 */
	async remove(id) {
		try {
			return await this.db(this.table)
				.where('id', id)
				.del();
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}

	/**
	 * @param id
	 * @param item
	 * @returns {Promise.<*>}
	 */
	async update(id, item) {
		try {
			return await this.db(this.table)
				.where('id', id)
				.update(item, '*');
		}
		catch(err) {
			logger.error('ERROR', err);
			return err;
		}
	}
}

module.exports = CrudModel;