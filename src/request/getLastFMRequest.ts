import { LASTFM_API_KEY, LASTFM_BASE_URL } from "../util/config.ts";
import urlBuilder from "../util/urlBuilder.ts";

export default async (
  method: string,
  params: Record<string, unknown>,
): Promise<Record<string, unknown>> => {
  const url = urlBuilder(
    LASTFM_BASE_URL,
    {
      method,
      api_key: LASTFM_API_KEY,
      format: "json",
      ...params,
    },
  );

  let responseJson = {};

  try {
    const response = await fetch(url);
    responseJson = await response.json();
  } catch (e: unknown) {
    console.error("Error making request to", url, e);
  }

  return responseJson;
};
