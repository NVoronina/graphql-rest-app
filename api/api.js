const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
// parse application/x-www-form-urlencoded
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

app.get('/users/:id', async (req, res) => {
	const users = require('./controllers/users');
	await users.getOne(req, res);
});

app.get('/restorans', async (req, res) => {
	const restorans = require('./controllers/restorans');
	await restorans.getList(req, res);
});

app.listen(5000);
console.log('Running API server at localhost:5000');
