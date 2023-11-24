var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AKIA6PKRDRAPAZ6VBSGK",
    secretAccessKey: "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",
});

const express = require("express");
const app = express();

app.get("/sensor_data", (req, res) => {
    var ddb = new AWS.DynamoDB();

    var params = {
        TableName: "newSensorData2",
    };

    ddb.scan(params, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            let contextData = [];

            data.Items.forEach((element) => {
                contextData.push(element)
            });

            res.json(contextData)
        }
    });
})

app.listen(3001, () => {
    console.log("Listening on port http://localhost:3001");
});

