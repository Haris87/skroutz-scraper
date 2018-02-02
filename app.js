var request = require('request');
var cheerio = require('cheerio');

url = 'https://www.skroutz.gr/s/254733/Emporio-Armani-Chronograph-AR2434.html';

request(url, function(error, response, html){

	if(!error){
		var $ = cheerio.load(html);
		$('#prices').filter(function(){
			var list = $(this);
			var firstChild = list.children().first();
			var price = firstChild.find('a.product-link').text();
			console.log('%s\x1b[32m%s\x1b[0m', 'lowest price: ', price); 
		});
		
	} else {
		throw "ERROR: "+err;
	}
});