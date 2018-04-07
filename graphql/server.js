const express = require('express');
const fs = require('fs');
const graphqlHTTP = require('express-graphql');

const schema = require('./schemas');

const app = express();
const cors = require('cors');

app.use(cors());

app.use('/graphql',graphqlHTTP({
		schema: schema,
		pretty:true,
		// rootValue: root,
		graphiql: true,

}));
app.use(express.static('public'));

app.get('/', async (req, res) => {
	await getHtml('index.html', res);
});
app.get('/registration', async (req, res) => {
	await getHtml('reg.html', res);
});
app.get('/about', async (req, res) => {
	await getHtml('about.html', res);
});
app.get('/restaurants', async (req, res) => {
	await getHtml('restaurants.html', res);
});
app.get('/restaurants/:id', async (req, res) => {
	await getHtml('restaurant.html', res);
});
async function getHtml(fileName, res){
	await fs.readFile('./public/html/'+fileName, 'utf8', (err, data) => {
		if(err){
			console.log(fileName);
			// TODO error
			throw new Error(err);
		}
		res.send(data);
	});
}
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

