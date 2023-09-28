import React, { useState, useEffect } from "react";
import { Stack, Box } from "@chakra-ui/react";

import { Song } from "../utils/interface/music-info";
import { FavoriteTrackListFrame } from "./FavoriteMusicList/FavoriteTrackList";
import { MusicPlayerBarFrame } from "./MusicPlayerBar/MusicPlayerBar";
import { Track } from "../utils/interface/track-info";
import { addFavoriteMusic } from "../api/favorite-music";
import { SearchMusicFrame } from "./SearchMusic/SearchMusic";
import { castSongToTrack } from "../utils/casting/track-info";

export function Layout({ favoriteMusicList }) {
  const [selectedMusic, setSelectedMusic] = useState<Song>();
  const [isVisiblePlaybackBar, setVisiblePlaybackBar] = useState(false);
  const [trackList, setTrackList] = useState<Track[]>([]);

  useEffect(() => {
    const convertedTrackList = favoriteMusicList.map(
      (music: Song, index: number) => {
        return castSongToTrack(music, index);
      }
    );
    setTrackList(convertedTrackList);
  }, []);

  const handleFavoriteClick = () => {
    if (!selectedMusic) return;
    const newTrack = castSongToTrack(selectedMusic, trackList.length);
    setTrackList((prevTrackList) => [...prevTrackList, newTrack]);
    try {
      addFavoriteMusic(selectedMusic);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box h="100vh">
      <Box>
        <Stack
          direction="row"
          justify="flex-start"
          align="flex-start"
          spacing="-8px"
          width="1152px"
          maxWidth="100%"
        >
          <SearchMusicFrame
            onSelectedMusic={setVisiblePlaybackBar}
            onSetMusicInfo={setSelectedMusic}
          />
        </Stack>
        {isVisiblePlaybackBar && (
          <MusicPlayerBarFrame
            selectedMusic={selectedMusic}
            isPlaying={false}
            handleFavoriteClick={handleFavoriteClick}
          />
        )}
      </Box>
      <FavoriteTrackListFrame
        trackList={trackList}
        setTrackList={setTrackList}
      />
    </Box>
  );
}
