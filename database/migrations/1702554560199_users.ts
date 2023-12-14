import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  public async up() {
    this.schema.createTable("user", (table) => {
      table.increments("id").unsigned().primary();
      table.string("email", 255).notNullable().unique();
      table.string("password", 180).notNullable();

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable("user");
  }
}
