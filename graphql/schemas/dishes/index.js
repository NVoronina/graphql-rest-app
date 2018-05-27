const dishesType = require('./dishesSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = process.env.HOST + ':' + process.env.PORT;

module.exports = dishes = {
	dishes: {
		type: new graphql.GraphQLList(dishesType),
		resolve:  async ()=>{
			return await fetch(`${BASE_URL}/dishes`).then(res => res.json());
		}
	},
	dish: {
		type: dishesType,
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/dish/${args.id}`).then(res => res.json());
		}
	},
	dishesByDishesTypeId: {
		type: new graphql.GraphQLList(dishesType),
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/dishes/${args.id}`).then(res => res.json());
		}
	}
};