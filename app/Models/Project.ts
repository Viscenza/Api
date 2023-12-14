import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Todo from "./Todo";
import User from "./User";

export default class Project extends BaseModel {
  public static table = "project";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @belongsTo(() => User, {
    foreignKey: "user_id",
  })
  public user: BelongsTo<typeof User>;

  @column()
  public nom: string;

  @hasMany(() => Todo, {
    foreignKey: "project_id",
  })
  public todo: HasMany<typeof Todo>;
}
