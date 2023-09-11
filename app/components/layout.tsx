"use client";
import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Song } from "../utils/interface/music-info";
import { FavoriteTrackListFrame } from "./FavoriteMusicList/FavoriteTrackList";
import { MusicPlayerBarFrame } from "./MusicPlayerBar/MusicPlayerBar";
import { TrackProps } from "../utils/interface/track-info";
import { addFavoriteMusic, getFavoriteMusic } from "../api/favorite-music";
import { SearchMusicFrame } from "./SearchMusic/SearchMusic";
import { topValue } from "../utils/constants";

// 画面全体.
export function Layout() {
  const [selectedMusic, setSelectedMusic] = useState<Song>(); // 検索結果で、選択された楽曲の情報を受け取るuseState.
  const [isVisiblePlaybackBar, setVisiblePlaybackBar] = useState(false);
  const [trackList, setTrackList] = useState<TrackProps[]>([]);

  useEffect(() => {
    const fetchFavoriteMusic = async () => {
      try {
        const favoriteMusic = await getFavoriteMusic();
        const updatedTrackList = favoriteMusic.map((music, index) => ({
          id: music.id,
          imageSrc: music.image.url,
          altText: music.song_title,
          trackTitle: music.song_title,
          artistName: music.artist_name,
          positionTop: topValue + index * 80,
        }));
        setTrackList(updatedTrackList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavoriteMusic();
  }, []);

  const handleFavoriteClick = () => {
    if (!selectedMusic) return;

    const newTrack = {
      imageSrc: selectedMusic?.image.url,
      altText: selectedMusic?.song_title,
      trackTitle: selectedMusic?.song_title,
      artistName: selectedMusic?.artist_name,
      positionTop: topValue + trackList.length * 80,
    };

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
