const graphql = require('graphql');
const cartDishesType = require('../cartDishes/cartDishesSchema');

module.exports = cartType = new graphql.GraphQLObjectType({
	name: 'Cart',
	fields: {
		id: {
			type: graphql.GraphQLID
		},
		table: {
			type: graphql.GraphQLInt
		},
		restaurant_id: {
			type: graphql.GraphQLID
		}
	}
});