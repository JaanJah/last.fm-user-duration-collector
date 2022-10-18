import InputLoop from "https://deno.land/x/input@2.0.3/index.ts";
import { dateToString } from "https://deno.land/x/date_format_deno/mod.ts";
import getUserByName from "../command/user/getUserByName.ts";
import getUserScrapedByUserId from "../command/user_scraped/getUserScrapedByUserId.ts";
import getinfo from "../request/user/getinfo.ts";
import upsertUser from "../command/user/upsertUser.ts";
import scrapeTracks from "../request/scraper/scrapeTracks.ts";
import insertScrapeData from "../command/insertScrapeData.ts";
import updateLastScrobbledAt from "../command/user_scraped/updateLastScrobbledAt.ts";

const day = 86400 * 1000;

export default async () => {
  const inputLoop = new InputLoop();
  const name = await inputLoop.question("Enter last.fm username:");

  // deno-lint-ignore no-explicit-any
  const user: any = await getinfo(name);

  if (!user.user) {
    throw new Error(`Error getting user: ${user}`);
  }

  const dbUser = await getUserByName(name);

  if (!dbUser) {
    await upsertUser(name, user.user);
  }

  const lastScrapedAt = await getUserScrapedByUserId(dbUser.id);
  let scrapeSinceTimestamp = lastScrapedAt?.latest_scrape_at;

  if (!lastScrapedAt) {
    console.log(`User ${name} has never been scraped!`);
    scrapeSinceTimestamp = dateToString(
      "yyyy-MM-dd hh:mm:ss",
      new Date(Number(user.user.registered.unixtime * 1000)),
    );
  }

  const now = new Date();
  let from = dateToString("yyyy-MM-dd", new Date(scrapeSinceTimestamp));
  let to = dateToString("yyyy-MM-dd", new Date(new Date(from).getTime() + day));

  console.log(`Starting scraping, since: ${from}`);
  while (now.getTime() > new Date(from).getTime()) {
    console.log(`[${from}/${to}] Start scrape`);
    const tracks = await scrapeTracks(from, to, name);
    console.log(`[${from}/${to}] Scraped: ${tracks.length} tracks`);
    await insertScrapeData(tracks, dbUser.id);
    await updateLastScrobbledAt(dbUser.id, new Date(from));
    from = dateToString("yyyy-MM-dd", new Date(new Date(to).getTime() + day));
    to = dateToString("yyyy-MM-dd", new Date(new Date(from).getTime() + day));
  }
};
