import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Project from "./Project";

export default class User extends BaseModel {
  public static table = "user";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @hasMany(() => Project, {
    foreignKey: "user_id",
  })
  public project: HasMany<typeof Project>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
