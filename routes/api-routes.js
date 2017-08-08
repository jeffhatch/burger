// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    db.Todo.findAll({}).then(function (results) {
      res.json(results);
    });
  });


  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/todos", function(req, res) {
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function (results) {
      res.end();
    });
  });


 // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // Use the sequelize destroy method to delete a record from our table with the
    // id in req.params.id. res.json the result back to the user
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });
  });

  
  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/todos", function(req, res) {
    // Use the sequelize update method to update a todo to be equal to the value of req.body
    // req.body will contain the id of the todo we need to update
    db.Todo.update({
      text: req.body.text,
      complete: req.body.complete
    },{
      where: {
        id: req.body.id
      }
    }).then(function (dbTodo) {
      res.json(dbTodo);
    });    
  });
};

