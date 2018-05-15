const graphql = require('graphql');

module.exports = employeeType = new graphql.GraphQLObjectType({
	name: 'Employee',
	fields: {
		id: {
			type:graphql.GraphQLID
		},
		user_id: {
			type:graphql.GraphQLID
		},
		position_id: {
			type:graphql.GraphQLID
		},
		company_id: {
			type:graphql.GraphQLID
		},
		restaurant_id: {
			type:graphql.GraphQLID
		},
		firstname:{
			type:graphql.GraphQLString
		},
		lastname: {
			type:graphql.GraphQLString
		},
		phone: {
			type:graphql.GraphQLString
		},
		permission:{
			type:graphql.GraphQLInt
		},
		email: {
			type:graphql.GraphQLString
		},
		name: {
			type:graphql.GraphQLString
		},
		logo:{
			type:graphql.GraphQLString
		},
		name_ru:{
			type:graphql.GraphQLString
		},
		name_en:{
			type:graphql.GraphQLString
		}
	}
});