const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({});
const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = DynamoDBDocument.from(client);

exports.get = async (event) => {

  const lastEvaluatedKey = event.queryStringParameters;
  console.log(lastEvaluatedKey);

  try {
    console.log(event);
    
    const params = {
      TableName: process.env.GREETINGS_TABLE,
      KeyConditionExpression:'#pk = :id and begins_with(#sk, :name)',
      ExpressionAttributeNames: {
        '#pk':'id',
        '#sk': 'name'
      },
      ExpressionAttributeValues: {
        ':id':'1',
        ':name':'i'
      },
      Limit:4
    }

    if ( !lastEvaluatedKey ) {
      const data = await ddbDocClient.query(params);
      console.log('la primera', data);
      const { LastEvaluatedKey }  = data;
      return {statusCode: 200, body: JSON.stringify(LastEvaluatedKey)}
    }
    
    params.ExclusiveStartKey = lastEvaluatedKey
    const data = await ddbDocClient.query(params);
    console.log('segunda',data);
    return {statusCode: 200, body: JSON.stringify(data.LastEvaluatedKey)}
      
    
  } catch (error) {
    console.log(error);
  }
};
