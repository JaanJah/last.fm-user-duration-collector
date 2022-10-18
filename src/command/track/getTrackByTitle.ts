import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (title: string) => {
  const query = queryBuilder("track").where({
    title,
  });

  const [track] = await executeQuery(query);

  return track;
};
