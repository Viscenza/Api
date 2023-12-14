import { BaseModel, column, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import Project from "./Project";

export default class Todo extends BaseModel {
  public static table = "todo";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public project_id: number;

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>;

  @column()
  public content: string;

  @column()
  public stat: boolean;
}
