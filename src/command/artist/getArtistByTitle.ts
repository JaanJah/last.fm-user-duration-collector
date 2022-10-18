import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (title: string) => {
  const query = queryBuilder("artist").where({
    title,
  });

  const [artist] = await executeQuery(query);

  return artist;
};
