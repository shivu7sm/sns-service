'use strict';
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
var dotenv = require('dotenv').config();

AWS.config.update({ region: process.env.AWS_REGION });

var api = require('./api/api');
var fun = require('./routes/functions');
var sns = new AWS.SNS();
module.exports.hello = async () => {


    try {
        const out = await api.fetchAll().catch(error => {
            console.log(error)
            errorMsg = error
        })
        var profit = {
            "BTC": out.gemData.gemBtcData,
            "ETH": out.gemData.gemEthData,
            "BTCProfit": fun.calculateProfitUsdInr(500, out.gemData.gemBtcData, out.bitBnsData.bitBnsBtcPrice, out.gemData.usdInr),
            "ETHProfit": fun.calculateProfitUsdInr(500, out.gemData.gemEthData, out.bitBnsData.bitBnsEthPrice, out.gemData.usdInr),
            "BTCRemitProfit": fun.calculateProfitInrUsd(50000, out.bitBnsData.bitBnsBtcPrice, out.gemData.gemBtcData, out.gemData.usdInr),
            "ETHRemitProfit": fun.calculateProfitInrUsd(50000, out.bitBnsData.bitBnsEthPrice, out.gemData.gemEthData, out.gemData.usdInr)
        }
        // Create publish parameters
        var notificationMessage = "\nBTC Gemini to India Profit:" + profit.BTCProfit + "%, ETH Gemini to India Profit:" + profit.ETHProfit + "\nBTC India to Gemini Profit:" + profit.BTCRemitProfit + "%, ETH India to Gemini Profit:" + profit.ETHRemitProfit + "%.\n" + "Current BTC:" + profit.BTC + "\nCurrent ETH:" + profit.ETH;
        //var notificationMessage ="test"
        var params = {
            Message: notificationMessage,
            /* required */
            TopicArn: process.env.TOPIC_ARN
        };

        // Create promise and SNS service object
        /*var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

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
                message: 'Go Serverless v1.0! Your function executed successfully!'
            })
        }*/
        if (profit.BTCProfit < 0 || profit.ETHProfit < 0) {
            console.log("Triggering SNS");
            sns.publish(params, function(err_publish, data) {
                if (err_publish) {
                    console.log('Error sending a message', err_publish);
                } else {
                    console.log('Sent message:', data.MessageId);

                }
            });
        } else {

            console.log("No SNS trigger as profit is not less than 0");
        }
        if (profit.BTCRemitProfit > -5 || profit.ETHRemitProfit > -5) {
            console.log("Triggering SNS");
            sns.publish(params, function(err_publish, data) {
                if (err_publish) {
                    console.log('Error sending a message', err_publish);
                } else {
                    console.log('Sent message:', data.MessageId);

                }
            });
        } else {

            console.log("No SNS trigger as profit is not greater than -5");
        }


        return "Hello";
    } catch (error) {
        console.log(error)
    }


};

module.exports.hello()
/*statusCode: 200,
       body: JSON.stringify({
         message: 'Go Serverless v1.0! Your function executed successfully!',
         input: event,
       }, null, 2),*/


// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };