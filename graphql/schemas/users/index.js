const userType = require('./userSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:5000';

module.exports = user = {
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
		},
		userByLogin: {
			type: userType,
			args: {
				login: {
					type: graphql.GraphQLString
				}
			},
			resolve: async (root, args) => {
				var data = await fetch(`${BASE_URL}/users?login=${args.login}`).then(res => res.json());
				return data[0];
			}
		},
		userByToken: {
			type: userType,
			args: {
				token: {
					type: graphql.GraphQLString
				}
			},
			resolve: async (root, args) => {
				var data = await fetch(`${BASE_URL}/users?token=${args.token}`).then(res => res.json());
				return data[0];
			}
		}
	};