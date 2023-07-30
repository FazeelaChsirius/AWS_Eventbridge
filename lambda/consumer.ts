exports.handler = async function(event:any) {
    console.log("request:", JSON.stringify(event,undefined,2));
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Consumer_Lambda ${JSON.stringify(event)}\n`
    };
    
}