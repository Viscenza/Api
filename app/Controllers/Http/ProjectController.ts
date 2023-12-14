import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Project from "App/Models/Project";

export default class ProjectsController {
  public async index(ctx: HttpContextContract) {
    try {
      let projects = await Project.all();
      const projectJson = projects.map((project) => project.serialize());
      return { projectJson };
    } catch {
      return { message: "Data don't found" };
    }
  }

  public async create({ request }: HttpContextContract) {
    let { nom } = request.body();
    const project = await Project.create({ nom: nom });
    if (project.$isPersisted) {
      return { message: "Success" };
    } else {
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
