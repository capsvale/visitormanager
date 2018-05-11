'use strict';
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const upload = require('./upload.js');

router.get('/', function(req, res) {
    res.send(path.join(__dirname + '/../view/index.html'));
});

/* post the visitor data */
router.post('/api/visitorManagement', upload.any(), function(req, res){
	let formData = req.body;
	formData['image'] = req.files[0].path;
	fs.readFile(path.join(__dirname, '/../data/visitorManagement.json'), (err, data) => {  
		if (err) throw err;
		let visitorData = JSON.parse(data);
		visitorData.data.push(formData); 
		visitorData = JSON.stringify(visitorData);
		fs.writeFile(path.join(__dirname, '/../data/visitorManagement.json'), visitorData, (err, data) => { 
			if (err) throw err;
			console.log(visitorData);
		});
	});
	return res.send("item saved to database");	
});

/* get owner details */
router.get('/api/ownerDetails', function(req, res) {
    let ownerDetails = fs.readFileSync( path.join(__dirname, '/../data/ownerDetials.json'));
	return res.json(JSON.parse(ownerDetails));
});

/* get visitor details */
router.get('/api/visitorDetails', function(req, res) {
    let ownerDetails = fs.readFileSync( path.join(__dirname, '/../data/visitorManagement.json'));
	return res.json(JSON.parse(ownerDetails));
});

module.exports = router;