const restaurantType = require('./restaurantSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = process.env.HOST + ':' + process.env.PORT;

module.exports = restaurant = {
	restaurants: {
		type: new graphql.GraphQLList(restaurantType),
		resolve:  async ()=>{
			return await fetch(`${BASE_URL}/restaurants`).then(res => res.json());
		}
	},
	restaurant: {
		type: restaurantType,
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/restaurant/${args.id}`).then(res => res.json());
		}
	}
};