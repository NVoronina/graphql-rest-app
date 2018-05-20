const cartType = require('./cartSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = process.env.HOST + ':' + process.env.PORT;

module.exports = cart = {
	cart: {
		type: cartType,
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/cart/${args.id}`).then(res => res.json());
		}
	},
};