import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (title: string) => {
  const query = queryBuilder("album").where({
    title,
  });

  const [album] = await executeQuery(query);

  return album;
};
