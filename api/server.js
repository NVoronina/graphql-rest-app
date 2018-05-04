const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const QrCode = require('qrcode-reader');
const qr = new QrCode();
const io = require('socket.io')(server);
/**
 * Блок подключения контроллеров
 */
const users = require('./controllers/users');
const restaurant = require('./controllers/restaurants');
const dish = require('./controllers/dishes');
const menu = require('./controllers/menus');
const cart = require('./controllers/cart');
const cartDishes = require('./controllers/cartDishes');
const order = require('./controllers/order');
const orderDishes = require('./controllers/orderDishes');
const dishType = require('./controllers/dishType');
const restaurantPhotos = require('./controllers/restaurantPhotos');

app.set('trust proxy', 1);

app.use(cors());

app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

// parse application/json
app.use(express.static('./files/tmp'));

app.get('/users', async (req, res) => {
	await users.getList(req, res);
});

app.post('/users/auth', async (req, res) => {
	await users.auth(req, res);
});

app.post('/users/reg', async (req, res) => {
	await users.registrate(req, res);
});

app.post('/users/logout', async (req, res) => {
	await users.logout(req, res);
});
app.get('/users/:id', async (req, res) => {
	await users.getOne(req, res);
});

app.get('/restaurants', async (req, res) => {
	await restaurant.getList(req, res);
});

app.get('/restaurant/:id', async (req, res) => {
	await restaurant.getOne(req, res);
});
app.get('/dishes', async (req, res) => {
	await dish.getList(req, res);
});

app.get('/dish/:id', async (req, res) => {
	await dish.getOne(req, res);
});

app.get('/dishes/:id', async (req, res) => {
	await dish.getListByDishType(req, res);
});

app.get('/menu', async (req, res) => {
	await menu.getRestaurantMenu(req, res);
});

app.get('/menus', async (req, res) => {
	await menu.getList(req, res);
});

app.get('/menu/:id', async (req, res) => {
	await menu.getOne(req, res);
});

app.get('/menu/restaurant/:id', async (req, res) => {
	await menu.getOneByRestaurantId(req, res);
});

app.get('/dish-type', async (req, res) => {
	await dishType.getDishTypesByMenu(req, res);
});

app.get('/cart/:id', async (req, res) => {
	await cart.getOne(req, res);
});
app.get('/cart-dishes/:token', async (req, res) => {
	await cartDishes.getByToken(req, res);
});
app.post('/order', async (req, res) => {
	await order.saveOrder(req, res);
});
app.get('/order-dishes/:token', async (req, res) => {
	await orderDishes.getByToken(req, res);
});
app.post('/add-to-cart', async (req, res) => {
	cart.addToCart(req,res);
});

app.get('/restaurant-photos/:id', async (req, res) => {
	await restaurantPhotos.getRestaurantPhotos(req, res);
});

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

app.listen(5000);
console.log('Running API server at localhost:5000');
