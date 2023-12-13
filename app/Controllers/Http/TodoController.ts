import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Todo from "App/Models/Todo";

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
    try {
      await Todo.create({
        content: data.content,
        stat: false,
      });
      return { message: "Success" };
    } catch {
      return { message: "Failed" };
    }
  }

  public async update({ request }: HttpContextContract) {
    let todo = request.param("id");
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
    let todo = request.param("id");
    try {
      const data = await Todo.findOrFail(todo);
      await data.delete();
      return { message: "Success" };
    } catch {
      return { message: "Failed" };
    }
  }
}
