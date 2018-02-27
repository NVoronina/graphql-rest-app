const userType = require('./userSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:5000';

module.exports = new graphql.GraphQLObjectType({
	name:"Query",
	fields:{
		userById:{
			type: userType,
			args:{
				id: {
					type: graphql.GraphQLID
				}
			},
			resolve:  async (root, args)=>{
				return await fetch(`${BASE_URL}/users/${args.id}`).then(res => res.json());
			}
		},
		userList:
			{
			type: new graphql.GraphQLList(userType),
			resolve:  async ()=>{
				return await fetch(`${BASE_URL}/users`).then(res => res.json());
			}
		}
	}
});