// deno-lint-ignore-file no-explicit-any
import {
  AbstractMigration,
  ClientMySQL,
} from "https://deno.land/x/nessie@2.0.7/mod.ts";
import queryBuilder from "../queryBuilder.ts";

export default class extends AbstractMigration<ClientMySQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    // Keep track of when user was last scraped
    const userScrapedTable = queryBuilder.schema.createTable(
      "user_scraped",
      (table: any) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned();
        table.timestamp("latest_scrape_at");
      },
    );

    await this.client.query(userScrapedTable.toString());

    const userScrapedTableForeignKey = queryBuilder.schema.alterTable(
      "user_scraped",
      (table: any) => {
        table.foreign("user_id").references("id").inTable("user");
      },
    );

    await this.client.query(userScrapedTableForeignKey.toString());

    const artistTable = queryBuilder.schema.createTable(
      "artist",
      (table: any) => {
        table.increments("id").primary();
        table.uuid("mbid");
        table.integer("duration").notNullable();
        table.string("title").notNullable();
        table.string("url").notNullable();
      },
    );

    await this.client.query(artistTable.toString());

    const albumTable = queryBuilder.schema.createTable(
      "album",
      (table: any) => {
        table.increments("id").primary();
        table.uuid("mbid");
        table.string("title").notNullable();
        table.integer("artist_id").unsigned().notNullable();
        table.string("url").notNullable();
      },
    );

    await this.client.query(albumTable.toString());

    const albumTableForeignKey = queryBuilder.schema.alterTable(
      "album",
      (table: any) => {
        table.foreign("artist_id").references("id").inTable("artist");
      },
    );

    await this.client.query(albumTableForeignKey.toString());

    const trackTable = queryBuilder.schema.createTable(
      "track",
      (table: any) => {
        table.increments("id").primary();
        table.uuid("mbid");
        table.integer("duration").notNullable();
        table.string("title").notNullable();
        table.string("url").notNullable();
        table.integer("album_id").unsigned();
        table.integer("artist_id").unsigned().notNullable();
      },
    );

    await this.client.query(trackTable.toString());

    const trackTableForeignKey = queryBuilder.schema.alterTable(
      "track",
      (table: any) => {
        table.foreign("artist_id").references("id").inTable("artist");
      },
    );

    const trackTableForeignKey2 = queryBuilder.schema.alterTable(
      "track",
      (table: any) => {
        table.foreign("album_id").references("id").inTable("album");
      },
    );

    await this.client.query(trackTableForeignKey.toString());
    await this.client.query(trackTableForeignKey2.toString());

    const userTrackTable = queryBuilder.schema.createTable(
      "user_track",
      (table: any) => {
        table.increments("id").primary();
        table.integer("track_id").unsigned().notNullable();
        table.integer("user_id").unsigned().notNullable();
        table.timestamp("scrobbled_at").notNullable();
      },
    );

    await this.client.query(userTrackTable.toString());

    const userTrackTableForeignKey = queryBuilder.schema.alterTable(
      "user_track",
      (table: any) => {
        table.foreign("track_id").references("id").inTable("track");
      },
    );

    const userTrackTableForeignKey2 = queryBuilder.schema.alterTable(
      "user_track",
      (table: any) => {
        table.foreign("user_id").references("id").inTable("user");
      },
    );

    await this.client.query(userTrackTableForeignKey.toString());
    await this.client.query(userTrackTableForeignKey2.toString());
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    const userScrapedTableForeignKey = queryBuilder.schema.alterTable(
      "user_scraped",
      (table: any) => {
        table.dropForeign("user_id");
      },
    );

    const userTrackTableForeignKey = queryBuilder.schema.alterTable(
      "user_track",
      (table: any) => {
        table.dropForeign("track_id");
      },
    );

    const userTrackTableForeignKey2 = queryBuilder.schema.alterTable(
      "user_track",
      (table: any) => {
        table.dropForeign("user_id");
      },
    );

    const trackTableForeignKey = queryBuilder.schema.alterTable(
      "track",
      (table: any) => {
        table.dropForeign("artist_id");
      },
    );

    const trackTableForeignKey2 = queryBuilder.schema.alterTable(
      "track",
      (table: any) => {
        table.dropForeign("album_id");
      },
    );

    const albumTableForeignKey = queryBuilder.schema.alterTable(
      "album",
      (table: any) => {
        table.dropForeign("artist_id");
      },
    );

    await this.client.query(userScrapedTableForeignKey.toString());
    await this.client.query(userTrackTableForeignKey.toString());
    await this.client.query(userTrackTableForeignKey2.toString());
    await this.client.query(trackTableForeignKey.toString());
    await this.client.query(trackTableForeignKey2.toString());
    await this.client.query(albumTableForeignKey.toString());

    const userScrapedTable = queryBuilder.schema.dropTable("user_scraped");
    const userTrackTable = queryBuilder.schema.dropTable("user_track");
    const trackTable = queryBuilder.schema.dropTable("track");
    const albumTable = queryBuilder.schema.dropTable("album");
    const artistTable = queryBuilder.schema.dropTable("artist");

    await this.client.query(userScrapedTable.toString());
    await this.client.query(userTrackTable.toString());
    await this.client.query(trackTable.toString());
    await this.client.query(albumTable.toString());
    await this.client.query(artistTable.toString());
  }
}
