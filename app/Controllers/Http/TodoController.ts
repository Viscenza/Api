import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Todo from "App/Models/Todo";
import Project from "App/Models/Project";

export default class TodoController {
  public async index(ctx: HttpContextContract) {
    try {
      let todo = await Todo.all();
      return { todo };
    } catch {
      return { message: "Failed" };
    }
  }

  public async create({ request }: HttpContextContract) {
    let data = request.body();
    let project_id = request.param("id");
    let project = await Project.findOrFail(project_id);
    let todo = await project.related("todo").create({
      content: data.content,
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
