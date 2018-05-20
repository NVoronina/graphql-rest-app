const graphql = require('graphql');
const menuType = require('../menu/menuSchema');
const restoranPhotoType = require('../restaurantPhoto/restaurantPhotoSchema');
const fetch = require('node-fetch');
const BASE_URL = process.env.HOST + ':' + process.env.PORT;

module.exports = restoranType = new graphql.GraphQLObjectType({
	name: 'Restoran',
	fields: {
		id: {
			type:graphql.GraphQLID
		},
		name_ru: {
			type:graphql.GraphQLString
		},
		name_en: {
			type:graphql.GraphQLString
		},
		desc_ru: {
			type:graphql.GraphQLString
		},
		desc_en: {
			type:graphql.GraphQLString
		},
		address: {
			type:graphql.GraphQLString
		},
		site: {
			type:graphql.GraphQLString
		},
		phone_common: {
			type:graphql.GraphQLString
		},
		phone_tables_booked: {
			type:graphql.GraphQLString
		},
		open_time: {
			type:graphql.GraphQLString
		},
		close_time: {
			type:graphql.GraphQLString
		},
		logo: {
			type:graphql.GraphQLString
		},
		menu: {
			type: new graphql.GraphQLList(menuType),
			args:{
				id: {
					type: graphql.GraphQLID
				}
			},
			resolve:  async (root, args)=>{
				return await fetch(`${BASE_URL}/menu?restaurant=${args.id}`).then(res => res.json());
			}
		},
		photos: {
			type: new graphql.GraphQLList(restoranPhotoType),
			args:{
				id: {
					type: graphql.GraphQLID
				}
			},
			resolve:  async (root, args)=>{
				return await fetch(`${BASE_URL}/restaurant-photos/${args.id}`).then(res => res.json());
			}
		}
	}
});