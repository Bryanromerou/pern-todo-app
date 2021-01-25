const express = require("express");
const cors = require("cors");
const app = express();
//Routes
const routes = require("./routes");

//DOTENV
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const pool = require("./db");

//Middleware
app.use(cors());
app.use(express.json()); // => allows us to access req.body
app.use((req, res, next) => {
  const method = req.method;
  const path = req.url;
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${method} ${path} ${timestamp}`);
  next(); // Allow the request to move on to the next middleware in the chain
});

app.use("/todos",routes.todos)


app.listen(PORT, ()=>{
  console.log(`Server is starting port ${5000}`);
})