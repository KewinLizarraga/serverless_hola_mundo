# Serverless with NodeJS

1. Tener una cuenta en AWS
2. Tener una key y secret del usuario de AWS
3. Configurar las credenciales

  ```sh
  serverless config credentials --provider aws --key xxxxxxxxxx --secret xxxxxxxxxxxxxxx
  ```

1. Crearel proyecto usando un template 'aws-nodejs'
  
  ```sh
  serverless create --template aws-nodejs --name curso-sls-hola-mundo
  ```

5. Despliegue del proyecto
   
  ```sh
  serverless deploy  ## sls deploy (sls es la forma corta de serverless)
  ```

6. Invocar una función
    -f (function) -s (stage)
  ```sh
  serverless invoke -f hello -s dev # Realiza una invocacion remota desde AWS
  serverless invoke local -f hello -s dev # Realiza una invocacion local
  ```

7. API Gateway

  * Agregamos una función en serverless.yml
  * En AWS se crea la función lambda y un api gateway para la comunicación por http
  ```yml
  functions:
    helloUser:
      handler: handler.helloUser
      events:
        - http:
            method: GET
            path: /user
  ```
  * Pasar parametros por el API Gateway, parametro **'name'**
  ```yml
  functions:
    helloUser:
      handler: handler.helloUser
      events:
        - http:
            method: GET
            path: /user/{name}
  ``` 
  ```js
  module.exports.helloUser = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Hola ${event.pathParameters.name}`,
          input: event,
        },
        null,
        2
      ),
    };
  };
  ```

8. Offline plugin para Serverless
  * Iniciamos el package.json
  * Instalamos el plugin: serverless-offline 
  ```sh
  npm init -y
  npm install serverless-offline --save-dev
  ```
  * En el archivo serverless.yml, agregamos el plugin
  ```yml
  plugins:
    - serverless-offline
  ```
  * Con el siguiente comando, iniciamos de manera offline
  ```sh
  serverless offline

  # Retorna una url para trabajar en local
  GET | http://localhost:3000/dev/user/{name} 
  ```
   
9.  Subir solo una funcion (cuando hay algun cambio en el codigo de la función)

```sh
serverless deploy function -f helloUser
```

10. Agregar una función con método POST
  - Instalamos **'querystring'** que captura los datos via POST
  ```sh
  npm install --save querystring
  ```
  - serverless.yml
  ```yml
  functions:
    createUser:
      handler: handler.createUser
      events:
        - http:
            method: POST
            path: /user
  ```
  - handler.js
  ```js
  "use strict";
  const querystring = require("querystring");

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
  ```
  - En postman para enviar los datos para el body, usamos **x-www-form-urlencoded**

11. Configurar nuestro propio profile en Serverless
  - Ejecutamos el siguiente comando para ver las credenciales
  ```sh
  nano ~/.aws/credentials
  ```
  - Aquí vemos el profile por default
  ```nano
  [default]
  aws_access_key=xxxxxxxxxxxxxxxxxxxx
  aws_secret_access_key=xxxxxxxxxxxxxxxxxxxx
  ```
  - Agregamos nuestro propio profile
  ```
  [serverless]
  aws_access_key=xxxxxxxxxxxxxxxxxxxx
  aws_secret_access_key=xxxxxxxxxxxxxxxxxxxx
  ```
  - Configurar en el file serverless.yml
  ```yml
  provider:
    profile: serverless
  ```

---

- Adicional
  - El siguiente comando elimina el proyecto desde Cloud Formation
  - El codigo y credenciales en local se mantendran
  ```sh
  serverless remove
  ```