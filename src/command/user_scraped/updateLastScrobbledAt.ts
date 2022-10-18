import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (userId: number, scrobbledAt: Date) => {
  const query = queryBuilder("user_scraped").insert({
    user_id: userId,
    latest_scrape_at: scrobbledAt,
  });

  return await executeQuery(query);
};
