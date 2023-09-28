import { Song } from "../interface/music-info";
import { Track } from "../interface/track-info";
import { topValue } from "../constants";

export function castSongToTrack(song: Song, length: number): Track {
  return {
    id: song.id.toString(),
    imageSrc: song.image.url,
    altText: song.song_title,
    trackTitle: song.song_title,
    artistName: song.artist_name,
    positionTop: topValue + length * 80,
  };
}
