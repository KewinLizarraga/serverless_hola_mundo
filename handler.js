"use strict";

const querystring = require("querystring");

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello Serverless v1.0!!!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.helloUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hola ${event.pathParameters.name} xD`,
        parameters: event.pathParameters,
        query: event.queryStringParameters,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.createUser = async (event) => {
  const body = querystring.parse(event["body"]);
  console.log({ body });
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Petición para crear usuarios",
        input: `Hola ${body.user}`,
      },
      null,
      2
    ),
  };
};
