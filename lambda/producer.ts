import * as aws from "aws-sdk";

exports.handler = async function(event:any) {
    const eventBridge = new aws.EventBridge();
    const result = await eventBridge.putEvents({
        Entries: [
            {
                EventBusName: "default",
                Source: "orderService",
                DetailType: "Addorder",
                Detail: JSON.stringify({
                    productName: "T-shirt",
                    price: "56"
                })
            },
        ],
        
    }).promise();
    console.log("request:", JSON.stringify(result));
    return {
        statusCode: 200,
        headers: {"Content-Type":"text/plain"},
        body: `From lambda_producer ${JSON.stringify(result)}\n`
    };
    
}