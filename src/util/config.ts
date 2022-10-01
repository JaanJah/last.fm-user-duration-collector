import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const env = config();

export const LASTFM_API_KEY = env.LASTFM_API_KEY;
export const LASTFM_BASE_URL = env.LASTFM_BASE_URL;

export const DATABASE_HOST = env.DATABASE_HOST;
export const DATABASE_PORT = Number(env.DATABASE_PORT);
export const DATABASE_USERNAME = env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = env.DATABASE_PASSWORD;
export const DATABASE_NAME = env.DATABASE_NAME;
