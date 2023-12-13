import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  public async up() {
    this.schema.createTable("project", (table) => {
      table.increments("id").primary();
      table.string("nom").unique();
    });

    this.schema.createTable("todo", (table) => {
      table.increments("id").primary().unsigned();
      table
        .integer("project_id")
        .references("project.id")
        .unsigned()
        .onDelete("CASCADE");
      table.string("content");
      table.boolean("stat");
    });
  }

  public async down() {
    this.schema.dropTable("project");
    this.schema.dropTable("todo");
  }
}
