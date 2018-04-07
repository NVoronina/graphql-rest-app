const graphql = require('graphql');

module.exports = dishesType = new graphql.GraphQLObjectType({
	name: 'Dish',
	fields: {
		id: {
			type:graphql.GraphQLID
		},
		name_ru: {
			type:graphql.GraphQLString
		},
		name_en: {
			type:graphql.GraphQLString
		},
		desc_ru: {
			type:graphql.GraphQLString
		},
		desc_en: {
			type:graphql.GraphQLString
		},
		kkal:{
			type:graphql.GraphQLInt
		}
	}
});