import { DOMParser } from "https://esm.sh/linkedom";
const BASE_URL = "https://www.last.fm/user/";

export interface ArtistTrack {
  track: string;
  artist: string;
}

export default async (
  from: string,
  to: string,
  user: string,
): Promise<ArtistTrack[]> => {
  const tracks: ArtistTrack[] = [];
  let isDone = false;
  let page = 1;
  while (!isDone) {
    const url =
      `${BASE_URL}${user}/library/tracks?from=${from}&to=${to}&page=${page}`;
    const response = await fetch(url);
    const responseText = await response.text();

    const document = new DOMParser().parseFromString(responseText, "text/html");
    const links = document.querySelectorAll(".chartlist-name");
    const isLast = document.querySelector(".pagination-next");
    for (const doc of links) {
      const path = doc.innerHTML.trim().split('"')[1].split("/");
      const artist = path[2];
      const track = path[4];
      tracks.push({
        artist,
        track,
      });
    }

    if (!isLast) {
      isDone = true;
    }
    page++;
  }

  return tracks;
};
