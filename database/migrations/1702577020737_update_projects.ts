import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable("project", (table) => {
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onDelete("CASCADE");
    });
  }

  public async down() {
    this.schema.dropTable("project");
  }
}
