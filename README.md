# UsersManagement-MEAN
Users management - sample MEAN application (uses Mongo, Express, Angular 5 and Node.js)
<br />
<br />
<hr>
<strong>Starting the backend (Node.js Web API)</strong>
<hr>
The Node.js Web API has Mongo DB dependency, so you have to start MongoD.exe prior to run the application.
<br />
The default Mongo connection string is: mongodb://localhost:27017/corpdb
<br />
To change this, just setup config.js file, located in Backend.NodeJs\src folder.
<br />
<br />
-- Node.js port --
<br />
The Node.js default port is 3000.
<br />
This can be changed in Backend.NodeJs\bin\server.js, file, changing this line:
<br />
var port = normalizePort(process.env.PORT || '3000');
<br />
<br />
Use 'npm install' to install NPM modules.
<br />
Use 'npm start' to launch.
<br />
<br />
<br />
<br />
<hr>
<strong>Starting the frontend (Angular 5 application)</strong>
<hr>
The Angular application depends upon Node.js Web API, so first start the API.
<br />
There's a line in config file which sets up the Web API connection: 
<br />
export const API_URL = 'http://localhost:3000';
<br />
To change this, modify config.js file content in Frontend.Angular\src\app folder.
<br />
<br />
Use 'npm install' to install NPM modules.
<br />
Use 'ng serve --open' to launch.

