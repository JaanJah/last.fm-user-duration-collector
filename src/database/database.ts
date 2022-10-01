import * as mysql2 from "https://deno.land/x/mysql2@v1.0.6/mod.ts";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "../util/config.ts";

export default mysql2.createPool({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  connectionLimit: 10,
});
