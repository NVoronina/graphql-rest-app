const graphql = require('graphql');

module.exports = orderType = new graphql.GraphQLObjectType({
	name: 'Order',
	fields: {
		id: {
			type: graphql.GraphQLID
		},
		table: {
			type: graphql.GraphQLInt
		},
		restaurant_id: {
			type: graphql.GraphQLID
		},
		employee_id: {
			type: graphql.GraphQLID
		}
	}
});