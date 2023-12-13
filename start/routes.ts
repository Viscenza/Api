/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

// Routes for Project
Route.group(() => {
  Route.get("/", "ProjectController.index"),
    Route.post("/", "ProjectController.create"),
    Route.delete("/:id", "ProjectController.delete");
}).namespace("App/Controllers/Http");

// Routes for Todo
Route.group(() => {
  Route.get("/:id/todo", "TodoController.index"),
    Route.post("/:id/todo", "TodoController.create"),
    Route.put("/:id/todo/:id_todo", "TodoController.update"),
    Route.delete("/:id/todo/:id_todo", "TodoController.delete");
}).namespace("App/Controllers/Http");
