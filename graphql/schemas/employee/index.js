const employeeType = require('./employeeSchema');
const graphql = require('graphql');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:5000';

module.exports = dishes = {
	employees: {
		type: new graphql.GraphQLList(employeeType),
		resolve:  async ()=>{
			return await fetch(`${BASE_URL}/employees`).then(res => res.json());
		}
	},
	employee: {
		type: employeeType,
		args:{
			id: {
				type: graphql.GraphQLID
			}
		},
		resolve:  async (root, args)=>{
			return await fetch(`${BASE_URL}/waitress/${args.id}`).then(res => res.json());
		}
	},
};