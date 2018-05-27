const orderDishesType = require('./orderDishesSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = process.env.HOST + ':' + process.env.PORT;

module.exports = orderDishes = {
	orderDishesByToken: {
		type: new graphql.GraphQLList(orderDishesType),
		args:{
			token: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/order-dishes/${args.token}`).then(res => res.json());
		}
	},
};