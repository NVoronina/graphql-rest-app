const graphql = require('graphql');

module.exports = restoranPhotoType = new graphql.GraphQLObjectType({
	name: 'RestaurantPhoto',
	fields: {
		id: {
			type:graphql.GraphQLID
		},
		photo: {
			type:graphql.GraphQLString
		}
	}
});