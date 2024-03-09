import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class TodoValidator {
  //constructor(protected ctx: HttpContextContract) {}

  public todoData = schema.create({
    content: schema.string([rules.minLength(5)]),
  });
}
