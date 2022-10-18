import getLastFMRequest from "../getLastFMRequest.ts";

export default async (
  artist: string,
  track: string,
): Promise<Record<string, unknown>> => {
  const response = await getLastFMRequest(
    "track.getinfo",
    {
      artist,
      track,
    },
  );

  return response;
};
