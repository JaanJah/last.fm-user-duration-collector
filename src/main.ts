import addUser from "./command/addUser.ts";
import { LASTFM_API_KEY } from "./util/config.ts";
import InputLoop from "https://deno.land/x/input@2.0.3/index.ts";

if (!LASTFM_API_KEY) {
  throw new Error("LASTFM_API_KEY variable missing");
}

console.log("Welcome to Last.fm user duration collector!\n");

// Add user to database
const input = new InputLoop();
const name = await input.question("Enter last.fm username:");

await addUser(name);

// Close app
Deno.exit(0);
