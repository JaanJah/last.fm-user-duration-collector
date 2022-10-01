import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

if (!env.LASTFM_API_KEY) {
    throw new Error('LASTFM_API_KEY variable is undefined');
}

const res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=draakon3&api_key=${env.LASTFM_API_KEY}&format=json`);
const jsonData = await res.json();
console.log(jsonData);
