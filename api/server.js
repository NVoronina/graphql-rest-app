const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
app.set('trust proxy', 1); // trust first proxy
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
	const users = require('./controllers/users');
	await users.getList(req, res);
});

app.post('/users/auth', async (req, res) => {
	const users = require('./controllers/users');
	await users.Auth(req, res);
});

app.post('/users/reg', async (req, res) => {
	const users = require('./controllers/users');
	await users.Reg(req, res);
});

app.post('/users/logout', async (req, res) => {
	const users = require('./controllers/users');
	await users.Logout(req, res);
});
app.get('/users/:id', async (req, res) => {
	const users = require('./controllers/users');
	await users.getOne(req, res);
});

app.get('/restaurants', async (req, res) => {
	const restaurant = require('./controllers/restaurants');
	await restaurant.getList(req, res);
});

app.get('/restaurant/:id', async (req, res) => {
	const restaurant = require('./controllers/restaurants');
	await restaurant.getOne(req, res);
});

app.get('/menu', async (req, res) => {
	const menu = require('./controllers/menus');
	await menu.getRestaurantMenu(req, res);
});

app.get('/menus', async (req, res) => {
	const menu = require('./controllers/menus');
	await menu.getList(req, res);
});

app.get('/menu/:id', async (req, res) => {
	const menu = require('./controllers/menus');
	await menu.getOne(req, res);
});

app.get('/dish-type', async (req, res) => {
	const menu = require('./controllers/dishType');
	await menu.getDishTypesByMenu(req, res);
});

app.get('/restaurant-photos/:id', async (req, res) => {
	const restaurantPhotos = require('./controllers/restaurantPhotos');
	await restaurantPhotos.getRestaurantPhotos(req, res);
});

app.listen(5000);
console.log('Running API server at localhost:5000');
