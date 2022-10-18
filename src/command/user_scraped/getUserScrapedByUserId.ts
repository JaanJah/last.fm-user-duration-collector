import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (userId: number) => {
  const query = queryBuilder("user_scraped").where({
    user_id: userId,
  });

  const [userScraped] = await executeQuery(query);

  return userScraped;
};
