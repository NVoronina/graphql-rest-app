const cartDishesType = require('./cartDishesSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:5000';

module.exports = cartDishes = {
	cartDishesByToken: {
		type: new graphql.GraphQLList(cartDishesType),
		args:{
			token: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/cart-dishes/${args.token}`).then(res => res.json());
		}
	},
};