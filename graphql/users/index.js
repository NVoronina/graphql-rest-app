const graphql = require('graphql');
const queryType = require('./queryTypeUser');

const schema = new graphql.GraphQLSchema({
	query: queryType
});
module.exports = schema;