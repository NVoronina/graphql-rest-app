const graphql = require('graphql');
const user = require('./users/');
const restorans = require('./restaurant/');
const menu = require('./menu/');
const dishes = require('./dishes/');
const cart = require('./cart/');
const cartDishes = require('./cartDishes/');
const order = require('./order/');
const orderDishes = require('./orderDishes/');

const commonObject = Object.assign(user, restorans, menu, dishes,cart,cartDishes,order,orderDishes);

const schema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
		name: "Query",
		fields: commonObject
	})
});
module.exports = schema;