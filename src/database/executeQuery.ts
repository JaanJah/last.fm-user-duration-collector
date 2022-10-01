// deno-lint-ignore-file no-explicit-any
import database from "./database.ts";

export default async (
  query: any,
): Promise<any> => {
  const result = await database.query(query.toString());
  return result[0];
};
