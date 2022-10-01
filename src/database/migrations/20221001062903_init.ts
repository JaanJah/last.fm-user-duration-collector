// deno-lint-ignore-file no-explicit-any
import {
  AbstractMigration,
  ClientMySQL,
} from "https://deno.land/x/nessie@2.0.7/mod.ts";
import queryBuilder from "../queryBuilder.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    const userTable = queryBuilder.schema.createTable("user", (table: any) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("url");
      table.string("gender");
      table.string("country");
    });

    await this.client.query(userTable.toString());

    const userIdIndex = queryBuilder.schema.alterTable("user", (table: any) => {
        table.index(["user_id"]);
      });

    await this.client.query(userIdIndex.toString());
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    const userTable = queryBuilder.schema.dropTable("user");

    await this.client.query(userTable.toString());
  }
}
