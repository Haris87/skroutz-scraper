var express = require('express');
var router = express.Router();
var Skroutz = require('skroutz');
var Scraper = require('../scrape');
 
/*
var skroutz = new Skroutz({
    'client_id': process.env.CLIENT,
    'client_secret': process.env.SECRET
});
*/

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/search/:term', function(req, res, next) {
  res.send(req.params);
});

router.post('/', function(req, res, next) {
	
  var url = req.body.url;	
  var company = req.body.company || '';
	Scraper.scrape(url, company, function(response){
		res.json(response);
	});
	
});

module.exports = router;
