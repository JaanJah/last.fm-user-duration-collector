import {
  ClientMySQL,
  NessieConfig,
} from "https://deno.land/x/nessie@2.0.7/mod.ts";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "./src/util/config.ts";

const client = new ClientMySQL({
  hostname: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  db: DATABASE_NAME,
});

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: ["./src/database/migrations"],
  seedFolders: ["./src/database/seeds"],
};

export default config;
