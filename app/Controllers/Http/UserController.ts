import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UserController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body();
    try {
      const token = await auth.use("api").attempt(email, password);
      response.ok({ message: token.token });
    } catch {
      response.unauthorized({ message: "Failed" });
    }
  }

  public async register({ auth, response, request }: HttpContextContract) {
    const data = request.body();
    try {
      const user = await User.create(data);
      await auth.use("api").login(user);
      response.ok({ message: "Success" });
    } catch {
      response.badRequest({ message: "Failed" });
    }
  }

  public async logout(ctx: HttpContextContract) {
    try {
      ctx.auth.use("api").logout();
      return { message: "Success" };
    } catch {
      return { message: "Failed" };
    }
  }
}
