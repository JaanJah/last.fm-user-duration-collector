import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (userId: number) => {
  const query = queryBuilder("user").where({
    user_id: userId,
  });

  const [user] = await executeQuery(query);

  return user;
};
