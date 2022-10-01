import InputLoop from "https://deno.land/x/input@2.0.3/index.ts";
import getLastFMRequest from "../request/getLastFMRequest.ts";

export default async (): Promise<Record<string, unknown>> => {
  const input = new InputLoop();
  const lastfmUsername = await input.question("Enter last.fm username:");

  return getLastFMRequest(
    "user.getinfo",
    {
      user: lastfmUsername,
    },
  );
};
