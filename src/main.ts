import addUser from "./command/addUser.ts";
import { LASTFM_API_KEY } from "./util/config.ts";
import InputLoop from "https://deno.land/x/input@2.0.3/index.ts";

if (!LASTFM_API_KEY) {
  throw new Error("LASTFM_API_KEY variable missing");
}

console.log("Welcome to Last.fm user duration collector!");

const input = new InputLoop();

const questions = [
  "Add user to database",
  "Exit",
];

while (!input.done) {
  const response = await input.choose(questions);

  if (response[0]) await addUser();
  if (response[1]) Deno.exit(0);
}
