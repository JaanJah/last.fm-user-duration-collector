import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const env = config();

export const LASTFM_API_KEY = env.LASTFM_API_KEY;
export const LASTFM_BASE_URL = env.LASTFM_BASE_URL;
