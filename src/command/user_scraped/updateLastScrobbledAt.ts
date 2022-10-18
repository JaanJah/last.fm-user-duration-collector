import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (userId: number, scrobbledAt: Date) => {
  const query = queryBuilder("user_scraped").update({
    latest_scrape_at: scrobbledAt,
  }).where("user_id", userId);

  return await executeQuery(query);
};
