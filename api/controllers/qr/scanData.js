'use strict';
const fetch = require("node-fetch");
const fs = require('fs');

module.exports.scanData = async (req, res)=> {
	// var data = req.body.file.replace(/^data:image\/\w+;base64,/, "");
	// var buf = new Buffer(data, 'base64');
	// fs.writeFile('./files/tmp/'+1+'.png', buf);
	// fetch(`http://api.qrserver.com/v1/read-qr-code/?fileurl=http://`).then(res => res.json());
	res.send('ok');
}