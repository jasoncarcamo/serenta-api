const app = require("./app");
const knexInstance = require("knex");
const db = knexInstance({
    client: "pg",
    connection: process.env.DATABASE_URL    
});

app.set("db", db);

app.listen( process.env.PORT, ()=>{
    console.log("Listening on port 8000");
});

