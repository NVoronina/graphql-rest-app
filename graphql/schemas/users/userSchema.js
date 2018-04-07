const graphql = require('graphql');

module.exports = userType = new graphql.GraphQLObjectType({
	name: 'User',
	fields: {
		login: {
			type:graphql.GraphQLString
		},
		id: {
			type:graphql.GraphQLID
		},
		firstname: {
			type:graphql.GraphQLString
		},
		lastname: {
			type:graphql.GraphQLString
		}
	}
});