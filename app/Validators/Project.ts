import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProjectValidators {
  //constructor(protected ctx: HttpContextContract) {}

  public projectRequest = schema.create({
    nom: schema.string([rules.minLength(3)]),
  });
}
