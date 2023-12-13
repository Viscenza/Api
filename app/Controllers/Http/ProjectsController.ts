import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Project from "App/Models/Project";

export default class ProjectsController {
  public async index(ctx: HttpContextContract) {
    try {
      let project = await Project.all();
      return { project };
    } catch {
      return { message: "Data don't found" };
    }
  }

  public async create({ request }: HttpContextContract) {
    let data = request.body();
    try {
      await Project.create({
        nom: data.nom,
      });
      return { message: "Success" };
    } catch {
      return { message: "Failed" };
    }
  }

  public async delete({ request }: HttpContextContract) {
    let project = request.param("id");
    try {
      const data = await Project.findOrFail(project);
      await data.delete();
      return { message: "Success" };
    } catch {
      return { message: "Failed" };
    }
  }
}
