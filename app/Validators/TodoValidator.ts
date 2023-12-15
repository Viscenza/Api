import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class TodoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public todoData = schema.create({
    project_id: schema.number(),
    content: schema.string(),
    stat: schema.boolean(),
  });
}
