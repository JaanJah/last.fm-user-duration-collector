import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";
import getUserByName from "./getUserByName.ts";

// deno-lint-ignore no-explicit-any
export default async (name: string, user: any) => {
  const userExists = await getUserByName(name);

  const input = {
    name,
    url: user.url,
    country: user.country,
    gender: user.gender,
    registered_at: Number(user.registered.unixtime),
  };

  // If doesn't exist, insert to database
  if (!userExists) {
    const insertQuery = queryBuilder("user").insert(input);

    await executeQuery(insertQuery);
    console.log(`Added last.fm user: ${name} to database`);
  } else {
    // Otherwise update user
    const updateQuery = queryBuilder("user").update(input).where({
      id: userExists.id,
    });

    await executeQuery(updateQuery);

    console.log(`Updated last.fm user: ${name} in database`);
  }
};
