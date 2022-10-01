import { LASTFM_API_KEY } from "./util/config.ts";
import getLastFMUser from "./command/getLastFMUser.ts";

if (!LASTFM_API_KEY) {
  throw new Error("LASTFM_API_KEY variable missing");
}

console.log("Welcome to Last.fm user duration collector!\n");

const user = await getLastFMUser();
console.log(user);
