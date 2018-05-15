const express = require('express');
const fs = require('fs');
const graphqlHTTP = require('express-graphql');
const fetch = require('node-fetch');
const BASE_URL = 'http://localhost:5000';
const schema = require('./schemas');
const path = require('path');
const app = express();
const cors = require('cors');
const qrReader = require('./qr/scanData');
app.use(cors());

app.use('/graphql',graphqlHTTP({
		schema: schema,
		pretty:true,
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

app.get('/restaurants/:id', async (req, res) => {
	await getHtml('restaurant.html', res);
});

app.get('/guest/:restaurant/:table', async (req, res) => {
	await getHtml('guest_restaurant.html', res);
});

app.get('/employee', async (req, res) => {
	await getHtml('waitress.html', res);
});

app.get('/admin/:id', async (req, res) => {
	await getHtml('restaurant.html', res);
});

app.get('/admin', async (req, res) => {
	await getHtml('restaurant.html', res);
});
app.get('/admin/restaurants', async (req, res) => {
	await getHtml('restaurant.html', res);
});
app.get('/admin/menus', async (req, res) => {
	await getHtml('restaurant.html', res);
});
app.post('/qr-code', async (req, res) => {
	await qrReader.scanData(req,res);
});
async function getHtml(fileName, res){
	await fs.readFile('./public/html/'+fileName, 'utf8', (err, data) => {
		if(err){
			console.log(fileName);
			throw new Error(err);
		}
		res.send(data);
	});
}
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
