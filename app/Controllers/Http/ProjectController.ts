import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Project from "App/Models/Project";
import ProjectValidators from "App/Validators/Project";

export default class ProjectsController {
  public async index() {
    try {
      let projects = await Project.all();
      const projectJson = projects.map((project) => project.serialize());
      return projectJson;
    } catch {
      return { message: "Data don't found" };
    }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const validator = new ProjectValidators();
    try {
      await request.validate({
        schema: validator.projectRequest,
      });
    } catch {
      response.badRequest("Error request is bad");
    }
    let { nom } = request.body();
    const user = auth.user?.id;
    const project = await Project.create({ nom: nom, user_id: user });
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
