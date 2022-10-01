import queryBuilder from "../database/queryBuilder.ts";
import executeQuery from "../database/executeQuery.ts";
import getLastFMUser from "./getLastFMUser.ts";

export default async (name: string) => {
  // deno-lint-ignore no-explicit-any
  const user: any = await getLastFMUser(name);

  if (!user.user) {
    throw new Error(`Error getting user: ${user}`);
  }

  const {
    registered,
    country,
    gender,
    url,
  } = user.user;

  const existsQuery = queryBuilder("user").select("id").where({
    name,
  });

  const [userExists] = await executeQuery(existsQuery);

  const input = {
    url,
    country,
    gender,
    registered_at: Number(registered.unixtime),
  };

  // If doesn't exist, insert to database
  if (!userExists) {
    const insertQuery = queryBuilder("user").insert({
      name,
      ...input,
    });

    await executeQuery(insertQuery);
    console.log(`Added last.fm user: ${name} to database`);
  } else {
    // Otherwise update user
    const updateQuery = queryBuilder("user").update({
      ...input,
    }).where({
      id: userExists.id,
    });

    await executeQuery(updateQuery);

    console.log(`Updated last.fm user: ${name} in database`);
  }
};
