import getLastFMUser from "../request/user/getinfo.ts";
import InputLoop from "https://deno.land/x/input@2.0.3/index.ts";
import upsertUser from "../command/user/upsertUser.ts";

export default async () => {
  const inputLoop = new InputLoop();
  const name = await inputLoop.question("Enter last.fm username:");

  // deno-lint-ignore no-explicit-any
  const user: any = await getLastFMUser(name);

  if (!user.user) {
    throw new Error(`Error getting user: ${user}`);
  }

  await upsertUser(name, user.user);
};
