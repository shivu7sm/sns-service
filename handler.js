'use strict';
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
var dotenv = require('dotenv').config();

AWS.config.update({ region: process.env.AWS_REGION });

var api = require('./api/api');
var fun = require('./routes/functions');

module.exports.hello = async (event) => {

    try {
        const out = await api.fetchAll().catch(error => {
            console.log(error)
            errorMsg = error
        })
        var profit = {
            "BTC": fun.calculateProfitUsdInr(500, out.gemData.gemBtcData, out.bitBnsData.bitBnsBtcPrice, 69),
            "ETH": fun.calculateProfitUsdInr(500, out.gemData.gemEthData, out.bitBnsData.bitBnsEthPrice, 69)
        }
        // Create publish parameters
        var notificationMessage = "BTC:" + profit.BTC + " ETH:" + profit.ETH;
        var params = {
            Message: notificationMessage,
            /* required */
            TopicArn: process.env.TOPIC_ARN
        };

        // Create promise and SNS service object
        var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(
            function(data) {
                console.log("Message " + params.Message + " sent to the topic " + params.TopicArn);
                console.log("MessageID is " + data.MessageId);
            }).catch(
            function(err) {
                console.error(err, err.stack);
            });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event,
            }, null, 2)
        }
    } catch (error) {
        console.log(error)
    }


};

//module.exports.hello()
/*statusCode: 200,
       body: JSON.stringify({
         message: 'Go Serverless v1.0! Your function executed successfully!',
         input: event,
       }, null, 2),*/


// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };