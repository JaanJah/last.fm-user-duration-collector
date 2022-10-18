import executeQuery from "../../database/executeQuery.ts";
import queryBuilder from "../../database/queryBuilder.ts";

// deno-lint-ignore no-explicit-any
export default async (input: any) => {
  const query = queryBuilder("artist").insert(input);

  return await executeQuery(query);
};
