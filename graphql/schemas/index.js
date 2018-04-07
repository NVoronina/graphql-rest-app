const graphql = require('graphql');
const user = require('./users/index');
const restorans = require('./restaurant/index');
const menu = require('./menu/index');

const commonObject = Object.assign(user, restorans, menu);

const schema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
		name: "Query",
		fields: commonObject
	})
});
module.exports = schema;