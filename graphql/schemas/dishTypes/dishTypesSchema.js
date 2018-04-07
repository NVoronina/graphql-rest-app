const graphql = require('graphql');
const dishesType = require('../dishes/dishesSchema');

module.exports = dishTypesType = new graphql.GraphQLObjectType({
	name: 'DishTypes',
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
		dishes:{
			type: dishesType
		}
	}
});