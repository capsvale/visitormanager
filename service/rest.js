'use strict';
const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const upload = require('./upload.js');

router.get('/', function(req, res) {
    res.send(path.join(__dirname + '/../view/index.html'));
});

router.get('/owner',function(req,res){
  res.sendFile(path.join(__dirname + '/../view/home.html'));
});

/* post the visitor data */
router.post('/api/visitorManagement', upload.any(), function(req, res){
	if(req.body.firstname !=='' && req.body.lastname !=='' && req.body.Phone !=='' && req.body.Identity !=='' && req.body.IdentityNumber !=='' && req.body.Source !=='' && req.body.Destination !=='' && req.body.VisitingTo !=='' && req.body.In_Date !=='' && req.body.In_Time !=='' && typeof req.files[0] !== 'undefined'){
		let formData = req.body;
		formData['image'] = req.files[0].path;
		fs.readFile(path.join(__dirname, '/../data/visitorManagement.json'), (err, data) => {  
			if (err) throw err;
			let visitorData = JSON.parse(data);
			visitorData.data.push(formData); 
			visitorData = JSON.stringify(visitorData);
			fs.writeFile(path.join(__dirname, '/../data/visitorManagement.json'), visitorData, (err, data) => { 
				if (err) throw err;
			});
		});
		return res.json({"success": "data saved to database"});	
	}else{
		return res.json({"error": "incorrect request"});
	}
});

/* post Owner / Tenant data */
router.post('/api/saveOwner', upload.any(), function(req, res){
	if(req.body.firstname !=='' && req.body.lastname !=='' && req.body.flatnumber !=='' && req.body.Phone !=='' && req.body.Identity !=='' && req.body.IdentityNumber !=='' && typeof req.files[0] !== 'undefined'){
		let ownerformData = req.body;
		ownerformData['image'] = req.files[0].path;
		fs.readFile(path.join(__dirname, '/../data/ownerDetials.json'), (err, data) => {  
			if (err) throw err;
			let residentData = JSON.parse(data);
			residentData.data.push(ownerformData); 
			residentData = JSON.stringify(residentData);
			fs.writeFile(path.join(__dirname, '/../data/ownerDetials.json'), residentData, (err, data) => { 
				if (err) throw err;
			});
		});
		return res.json({"success": "data saved to database"});	
	}else{
		return res.json({"error": "incorrect request"});
	}
});

/* get types of visitor, used for lookup */
router.get('/api/visitorLookup', function(req, res){
	let visitorLookup = fs.readFileSync( path.join(__dirname, '/../data/visitorLookup.json'));
	visitorLookup = JSON.parse(visitorLookup);
	if(visitorLookup.data.length > 0){
		return res.json(visitorLookup);
	}else{
		return res.json({"message": "No Record Found"});
	}
});

/* get owner details */
router.get('/api/ownerDetails', function(req, res) {
    let ownerDetails = fs.readFileSync( path.join(__dirname, '/../data/ownerDetials.json'));
	ownerDetails = JSON.parse(ownerDetails);
	if(ownerDetails.data.length > 0){
		return res.json(ownerDetails);
	}else{
		return res.json({"message": "No Record Found"});
	}
});

/* get visitor details */
router.get('/api/visitorDetails', function(req, res) {
	if((typeof req.query.dateFrom !== 'undefined' && req.query.dateFrom !=='') && (typeof req.query.dateTo !== 'undefined' && req.query.dateTo !=='')){
		let visitorDetails = fs.readFileSync( path.join(__dirname, '/../data/visitorManagement.json'));
		visitorDetails = JSON.parse(visitorDetails);
		const visitor = {"data":[]};
		
		if(visitorDetails.data.length > 0){
			const dateFrom = req.query.dateFrom;
			const dateTo = req.query.dateTo;
			const d1 = dateFrom.split("/");
			const d2 = dateTo.split("/");
			const from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);
			const to  = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
		
			for(let i=0; i < visitorDetails.data.length; i++){			
				let dateCheck = visitorDetails.data[i].In_Date;
				let c = dateCheck.split("/");			
				let check = new Date(c[2], parseInt(c[1])-1, c[0]);
				if(check >= from && check <= to){
					visitor.data.push(visitorDetails.data[i]);
				}
			}
		}
		
		if(visitor.data.length > 0){
			return res.json(visitor);
		}else{
			return res.json({"message": "No Record Found"});
		}		
	}else{
		return res.json({"error": "incorrect request"});
	}
});

module.exports = router;