
var request = require('request');

module.exports={

 fetchUsdInr:async ()=>{

    return new Promise((resolve,reject)=>{
        request('https://api.exchangeratesapi.io/latest?base=USD', function(error, response, body) {
                resolve(JSON.parse(body))
                reject(error)
            })
    })
    
}
/*,

fetchGemEth: async () => {

    return new Promise((resolve, reject) => {
        request('https://api.gemini.com/v1/pubticker/ethusd', function(error, response, body) {
            resolve(JSON.parse(body))
            reject(error)
        })
    })

}*/

}