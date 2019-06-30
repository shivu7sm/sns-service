
var request = require('request');

module.exports={

    fetchBitBns:async()=>{
    return new Promise((resolve,reject)=>{
                request('https://bitbns.com/order/getTickerAll', function(error, response, body) {

                    var bitBnsData = JSON.parse(body);
                    var bitBnsBtcPrice = bitBnsData['0']["BTC"]["buyPrice"];
                    var bitBnsEthPrice = bitBnsData['4']["ETH"]["buyPrice"];
                    var bitBnsBtcPriceSell = bitBnsData['0']["BTC"]["sellPrice"];
                    var bitBnsEthPriceSell = bitBnsData['4']["ETH"]["sellPrice"];
                    var finaljson = {};
                    finaljson["bitBnsBtcPrice"] = bitBnsBtcPrice;
                    finaljson["bitBnsEthPrice"] = bitBnsEthPrice;
                    resolve(finaljson)
                    reject(error)
                })
     })
 }
}
