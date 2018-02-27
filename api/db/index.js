class DB {
  constructor() {
    return this.db = require('knex')({
      client: 'mysql',
      debug: 3,
      connection: {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "legarcon"
      }
    });
  }
}
module.exports = new DB();