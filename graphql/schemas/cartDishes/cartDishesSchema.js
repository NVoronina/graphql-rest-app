const graphql = require('graphql');

module.exports = cartDishesType = new graphql.GraphQLObjectType({
	name: 'CartDishes',
	fields: {
		id: {
			type:graphql.GraphQLID
		},
	}
});