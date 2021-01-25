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
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
    res.json(todo.rows[0]);
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

// Update Route
const update = async(req,res)=>{
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",[description,id])
    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {index, show, create,update};