const graphql = require('graphql');

module.exports = orderDishesType = new graphql.GraphQLObjectType({
	name: 'OrderDishes',
	fields: {
		id: {
			type:graphql.GraphQLID
		},
		name_ru:{
			type:graphql.GraphQLString
		},
		name_en:{
			type:graphql.GraphQLString
		},
		price:{
			type:graphql.GraphQLInt
		}
	}
});