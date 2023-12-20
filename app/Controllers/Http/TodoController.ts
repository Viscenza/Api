import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Todo from "App/Models/Todo";
import Project from "App/Models/Project";
import TodoValidator from "App/Validators/TodoValidator";

export default class TodoController {
  public async index(ctx: HttpContextContract) {
    let project_id = ctx.request.param("id");
    //test
    try {
      let todo = await Todo.query().where("project_id", project_id);
      return todo;
    } catch {
      return { message: "Failed" };
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const validator = new TodoValidator();
    try {
      await request.validate({ schema: validator.todoData });
    } catch (error) {
      response.badRequest("Error: request is bad");
    }
    let data = request.body();
    let project_id = request.param("id");
    let project = await Project.findOrFail(project_id);
    let todo = await project.related("todo").create({
      content: data.content,
      stat: false,
    });
    if (todo.project_id == project.id) {
      return { message: "Success" };
    } else {
      return { message: "Failed" };
    }
  }

  public async update({ request }: HttpContextContract) {
    let todo = request.param("id_todo");
    let body = request.body();
    try {
      const data = await Todo.findOrFail(todo);
      data.stat = body.stat;
      await data.save();
      return { message: "Success" };
    } catch {
      return { message: "Failed" };
    }
  }

  public async delete({ request }: HttpContextContract) {
    let todo_id = request.param("id_todo");
    try {
      const data = await Todo.findOrFail(todo_id);
      await data.delete();
      return { message: "Success" };
    } catch {
      return { message: "Failed" };
    }
  }
}
