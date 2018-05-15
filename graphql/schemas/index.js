const graphql = require('graphql');
const user = require('./users/');
const restaurant = require('./restaurant/');
const menu = require('./menu/');
const dishes = require('./dishes/');
const cart = require('./cart/');
const cartDishes = require('./cartDishes/');
const order = require('./order/');
const orderDishes = require('./orderDishes/');
const employee = require('./employee/');

const commonObject = Object.assign(user, restaurant, menu, dishes,cart,cartDishes,order,orderDishes,employee);

const schema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
		name: "Query",
		fields: commonObject
	})
});
module.exports = schema;