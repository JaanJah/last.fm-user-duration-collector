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
      table.string("name");
      table.string("url");
      table.string("gender");
      table.string("country");
      table.integer("registered_at");
    });

    // Create user table
    await this.client.query(userTable.toString());

    const userUnique = queryBuilder.schema.alterTable("user", (table) => {
      table.unique(["name"]);
    });

    // Apply unique index on user.name
    await this.client.query(userUnique.toString());
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    const userTable = queryBuilder.schema.dropTable("user");

    await this.client.query(userTable.toString());
  }
}
