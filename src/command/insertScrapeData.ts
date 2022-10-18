// deno-lint-ignore-file no-explicit-any
import { ArtistTrack } from "../request/scraper/scrapeTracks.ts";
import getinfo from "../request/track/getinfo.ts";
import getAlbumByTitle from "./album/getAlbumByTitle.ts";
import insertAlbum from "./album/insertAlbum.ts";
import getArtistByTitle from "./artist/getArtistByTitle.ts";
import insertArtist from "./artist/insertArtist.ts";
import getTrackByTitle from "./track/getTrackByTitle.ts";
import insertTrack from "./track/insertTrack.ts";
import getUserTrackByTrackId from "./user_track/getUserTrackByTrackId.ts";
import insertUserTrack from "./user_track/insertUserTrack.ts";

export default async (artistTracks: ArtistTrack[], userId: number) => {
  let counter = 1;
  for (const { track, artist } of artistTracks) {
    console.log(`Inserting to database: [${counter}/${artistTracks.length}]`);
    counter++;
    const trackExists = await getTrackByTitle(track);

    if (trackExists) {
      const userTrackExists = await getUserTrackByTrackId(trackExists.id);
      if (!userTrackExists) {
        await insertUserTrack({
          track_id: trackExists.id,
          user_id: userId,
        });
      }
      continue;
    }

    const trackInfo: any = await getinfo(artist, track);

    if (!trackInfo.track?.duration) {
      continue;
    }

    if (track.length > 255) {
      console.log("Cannot import track, too long title", trackInfo.track.title);
      continue;
    }

    if (artist.length > 255) {
      console.log("Cannot import artist, too long artist", artist);
      continue;
    }

    const trackInput: any = {
      duration: trackInfo.track.duration,
      title: track,
      title_pretty: trackInfo.track.name,
      url: trackInfo.track.url,
    };

    const artistInput: any = {
      title: artist,
      title_pretty: trackInfo.track.artist.name,
      url: trackInfo.track.artist.url,
    };

    const artistExists = await getArtistByTitle(artist);

    if (!artistExists) {
      const { insertId: artistId } = await insertArtist(artistInput);
      trackInput.artist_id = artistId;
    } else {
      trackInput.artist_id = artistExists.id;
    }

    const album: any = {};

    if (trackInfo.track.album) {
      const urlSplit = trackInfo.track.album.url.split("/");
      const uglyTitle = urlSplit[urlSplit.length - 1];
      album.title = uglyTitle;
      album.title_pretty = trackInfo.track.album.title;
      album.url = trackInfo.track.album.url;
      album.artist_id = trackInput.artist_id;

      if (album.title.length > 255) {
        // Example: %E6%AE%AF%E2%80%95%E2%80%95%E6%AD%BB%E3%81%B8%E8%80%BD%E3%82%8B%E6%83%B3%E3%81%84%E3%81%AF%E6%88%AE%E8%BE%B1%E3%81%99%E3%82%89%E5%96%B0%E3%82%89%E3%81%84%E3%80%81%E5%BD%BC%E6%96%B9%E3%81%AE%E7%94%9F%E3%82%92%E6%84%9B%E3%81%99%E3%82%8B%E7%82%BA%E3%81%AB%E5%91%BD%E3%82%92%E8%AE%83%E3%81%88%E3%82%8B%E2%80%95%E2%80%95%E3%80%82
        console.log("Cannot import album, too long album", album.title);
        continue;
      }

      const albumExists = await getAlbumByTitle(album.title);
      if (!albumExists) {
        const { insertId: albumId } = await insertAlbum(album);
        trackInput.album_id = albumId;
      } else {
        trackInput.album_id = albumExists.id;
      }
    }

    const { insertId: trackId } = await insertTrack(trackInput);

    await insertUserTrack({
      track_id: trackId,
      user_id: userId,
    });
  }
};
