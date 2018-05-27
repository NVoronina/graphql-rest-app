const graphql = require('graphql');
const dishTypesType = require('../dishTypes/dishTypesSchema');
const fetch = require('node-fetch');
const BASE_URL = process.env.HOST + ':' + process.env.PORT;

module.exports = menuType = new graphql.GraphQLObjectType({
	name: 'Menu',
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
		dish_type:{
			type: new graphql.GraphQLList(dishTypesType),
			args:{
				id: {
					type: graphql.GraphQLID
				}
			},
			resolve:  async (root, args)=>{
				return await fetch(`${BASE_URL}/dish-type?menu=${args.id}`).then(res => res.json());
			}
		}
	}
});