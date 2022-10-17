import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (name: string) => {
  const query = queryBuilder("user").where({
    name,
  });

  const [user] = await executeQuery(query);

  return user;
};
