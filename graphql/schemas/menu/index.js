const menuType = require('./menuSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:5000';

module.exports = menu = {
	menus: {
		type: new graphql.GraphQLList(menuType),
		resolve:  async ()=>{
			return await fetch(`${BASE_URL}/menus`).then(res => res.json());
		}
	},
	menu: {
		type: menuType,
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/menu/${args.id}`).then(res => res.json());
		}
	},
	menuByRestaurantId: {
		type: menuType,
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/menu/restaurant/${args.id}`).then(res => res.json());
		}
	}
};