var request = require('request');

var gem = require('./gemApi');
var bitbns = require('./bitBnsApi');


module.exports = {

    fetchAll: async () => {
        try {
            let resultGemBtc = await gem.fetchGemBtc()
            let resultGemEth = await gem.fetchGemEth()
            let resultBitBns = await bitbns.fetchBitBns()
            var gemData = {}
            gemData["gemBtcData"] = resultGemBtc.last
            gemData["gemEthData"] = resultGemEth.last

            var finaljson = {}
            finaljson["gemData"] = gemData;
            finaljson["bitBnsData"] = resultBitBns;

            return (finaljson)
        } catch (error) {
            console.log(error)
        }

    }

}