import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Todo from "./Todo";

export default class Project extends BaseModel {
  public static table = "project";
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nom: string;

  @hasMany(() => Todo, {
    foreignKey: "project_id",
  })
  public todo: HasMany<typeof Todo>;
}
