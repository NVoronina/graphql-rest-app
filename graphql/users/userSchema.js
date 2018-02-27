const graphql = require('graphql');
const restoranType = require('../restorans/restoranSchema');

module.exports = userType = new graphql.GraphQLObjectType({
	name: 'User',
	fields: {
		login: {
			type:graphql.GraphQLString
		},
		id: {
			type:graphql.GraphQLID
		}
	}
});