// const restoranType = require('./restoranSchema');
// const Models = require('models').getRestoran();
// const graphql = require('graphql');
//
// module.exports = {
// 	name:"Query",
// 	fields:{
// 		restoran:{
// 			type: restoranType,
//
// 			resolve: async (root)=>{
// 				var info = await Models.getAll();
// 				return info[0];
// 			}
// 		}
// 	}
// };