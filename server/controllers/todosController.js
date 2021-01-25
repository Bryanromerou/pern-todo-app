const express = require('express');
const router = express.Router();
const pool = require("../db");

//Index Route
const index = async(req,res)=>{
  try {
    const allTodos = await pool.query("SELECT * FROM todo");//The reason why we didn't need "RETURNING *" is because naturaly SELECT return stuff
    res.json(allTodos.rows); 
  } catch (error) {
    console.error(error.message);
  }
}

//Show Route (NOT FINISHED)
const show = async(req,res)=>{
  try {
    console.log(req.params)    
  } catch (error) {
    console.error(error.message);
  }
}

//Create Route
const create = async(req,res)=>{
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description])//"RETURNING *" is necessary because otherwise the return will not contain the actual request
    res.json(newTodo.rows[0]);// We added .rows so that we only return the rows 
  } catch (error) {
    console.error(error.message);
  }
}


module.exports = {index, show, create};