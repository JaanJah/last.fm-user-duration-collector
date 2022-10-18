import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

export default async (track_id: number) => {
  const query = queryBuilder("user_track").where({
    track_id,
  });

  const [user_track] = await executeQuery(query);

  return user_track;
};
