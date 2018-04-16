const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const QrCode = require('qrcode-reader');
const qr = new QrCode();

app.set('trust proxy', 1); // trust first proxy
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));

app.use(cors());

app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('./files/tmp'));

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
app.get('/dishes', async (req, res) => {
	const dish = require('./controllers/dishes');
	await dish.getList(req, res);
});

app.get('/dish/:id', async (req, res) => {
	const dish = require('./controllers/dishes');
	await dish.getOne(req, res);
});

app.get('/dishes/:id', async (req, res) => {
	const dish = require('./controllers/dishes');
	await dish.getListByDishType(req, res);
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

app.get('/menu/restaurant/:id', async (req, res) => {
	const menu = require('./controllers/menus');
	await menu.getOneByRestaurantId(req, res);
});

app.get('/dish-type', async (req, res) => {
	const menu = require('./controllers/dishType');
	await menu.getDishTypesByMenu(req, res);
});
app.post('/qr-code', async (req, res) => {
	const qr = require('./controllers/qr');
	qr.scanData(req,res);
});
app.get('/restaurant-photos/:id', async (req, res) => {
	const restaurantPhotos = require('./controllers/restaurantPhotos');
	await restaurantPhotos.getRestaurantPhotos(req, res);
});

app.listen(5000);
console.log('Running API server at localhost:5000');
