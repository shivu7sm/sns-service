
var request = require('request');

module.exports={

 fetchGemBtc:async ()=>{

    return new Promise((resolve,reject)=>{
        request('https://api.gemini.com/v1/pubticker/btcusd', function(error, response, body) {
                resolve(JSON.parse(body))
                reject(error)
            })
    })
    
},

 fetchGemEth: async ()=>{

    return new Promise((resolve,reject)=>{
        request('https://api.gemini.com/v1/pubticker/ethusd', function(error, response, body) {
                resolve(JSON.parse(body))
                reject(error)
            })
    })
    
}

}