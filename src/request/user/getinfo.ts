import getLastFMRequest from "../getLastFMRequest.ts";

export default async (user: string): Promise<Record<string, unknown>> => {
  const response = await getLastFMRequest(
    "user.getinfo",
    {
      user,
    },
  );

  return response;
};
