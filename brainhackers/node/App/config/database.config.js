const {Client} = require("pg");
//const client = new Client(process.env.DB_URL);
const connectionString = 'postgres://ofbicbrwzkyfla:25f73e571fe6698897115a1edffe8dda4b808771b8d8916c83e08272bd7c7059@ec2-44-206-197-71.compute-1.amazonaws.com:5432/d5vq8pfpoq0gap'
 const client = new Client({
     connectionString: connectionString,
     ssl:{
         rejectUnauthorized: false //allows external access to database when using nodejs
     }
 });

module.exports = client;