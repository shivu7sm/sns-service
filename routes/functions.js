

module.exports={
	
	fees:function fees(totamt) {
	    return (totamt - (totamt * 0.0025)).toFixed(2);

	},

	geminifees:function geminifees(totamt) {
	    return (totamt - (totamt * 0.01)).toFixed(2);

	},

	calculateProfitUsdInr:function calculateProfitUsdInr(amt, geminiPrice, bitBnsPrice, xchangeRate) {
	    var sellAmt = (module.exports.fees((module.exports.geminifees(amt) / geminiPrice) * bitBnsPrice)) / xchangeRate;

	    var profit = ((sellAmt - amt) / amt) * 100;
	    // console.log("Profit: " + profit.toFixed(2) + "%");
	    return profit.toFixed(2);
	},

	/* INR TO USD PROFIT */
	calculateProfitInrUsd:function calculateProfitInrUsd(amt, geminiPrice, bitBnsPrice, xchangeRate) {
	    var sellAmt = (module.exports.geminifees(((module.exports.fees(amt) / bitBnsPrice) - 0.001) * geminiPrice)) * xchangeRate;

	    var profit = ((sellAmt - amt) / amt) * 100;
	    //console.log("Profit: " + profit.toFixed(2) + "%");
	    return profit.toFixed(2);
	}
}