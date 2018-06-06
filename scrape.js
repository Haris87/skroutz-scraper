var request = require('request');
var cheerio = require('cheerio');

url = 'https://www.skroutz.gr/s/254733/Emporio-Armani-Chronograph-AR2434.html';

function scrape(url, myCompany, callback){
	request(url, function(error, response, html){

		if(!error){
			var $ = cheerio.load(html);
			$('#prices').filter(function(){
				var list = $(this);
				var firstChild = list.children().first();

				var company = getCompanyName($, firstChild);

				var companyRank = getCompanyRank($, list.children(), myCompany);

				var price = getPrice($, firstChild);
				console.log('%s\x1b[32m%s\x1b[0m', 'lowest price: ', price); 
				
				callback({price: price, company: company, my_company: {company: myCompany, rank: companyRank}});
			});
			
		} else {
			callback({error: err});
		}
	});
}

function getCompanyName($, productElement){
	return $(productElement).find('.js-shop-details > a.js-shop-info-link').first().text();
}

function getPrice($, productElement){
	return $(productElement).find('a.product-link').text();
}

function getCompanyRank($, productList, company){
	var rank = 0;
	var found = false;
	var companyRank = -1;
	$(productList).each(function(i, element) {
		var c = getCompanyName($, element);
	
		if(c !== '' && !found){
			rank++;
			
			console.log(rank, c, company, c.toLowerCase() === company.toLowerCase());
			
			if(company.toLowerCase() === c.toLowerCase()){
				found = true;
				companyRank = rank;
			}
		}
	
	});
	return companyRank;
}

module.exports = {
	scrape: scrape
};