
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({});
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb"); // CommonJS import

// const marshallOptions = {
//   // Whether to automatically convert empty strings, blobs, and sets to `null`.
//   convertEmptyValues: false, // false, by default.
//   // Whether to remove undefined values while marshalling.
//   removeUndefinedValues: true, // false, by default.
//   // Whether to convert typeof object to map attribute.
//   convertClassInstanceToMap: true, // false, by default.
// };

// const unmarshallOptions = {
//   // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
//   wrapNumbers: false, // false, by default.
// };

// const translateConfig = { marshallOptions, unmarshallOptions };

exports.hello =  async ( event ) => {
  try {
    console.log(event);
    // console.log(context);
    const { name } = JSON.parse(event.body);
    
    const ddbDocClient = DynamoDBDocument.from(client);
    const result = await ddbDocClient.put({
      TableName: process.env.GREETINGS_TABLE,
      // ReturnConsumedCapacity: 'INDEXES',
      Item: {
        id: "1",
        name
      },
    });
    
    console.log('result-----> ', result);
    return {
      statusCode: 201,
      body: `hola ${name}`
    }
    
  } catch (error) {
    console.log(error);
  }
};


