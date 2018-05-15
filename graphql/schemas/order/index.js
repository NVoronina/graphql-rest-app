const orderType = require('./orderSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:5000';

module.exports = cart = {
	order: {
		type: orderType,
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/order/${args.id}`).then(res => res.json());
		}
	},
	ordersByWaitress: {
		type: new graphql.GraphQLList(orderType),
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/waitress-orders/${args.id}`).then(res => res.json());
		}
	},
	freeOrdersByWaitress: {
		type: new graphql.GraphQLList(orderType),
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/free-order/${args.id}`).then(res => res.json());
		}
	},
};