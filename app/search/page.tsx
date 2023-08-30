"use client";
import React from "react";
import {
  IconButton,
  Stack,
  Box,
  Text,
  Image,
  Input,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { Music } from "../utils/interface/music-info";

import { searchMusic } from "../api/search-music";
import { FavoriteTrackListFrame } from "../components/favorite-track";
import { RadioComponent } from "../components/radio";
import { MusicPlayerBarFrame } from "../components/music-player-bar";
import { FiPlayCircle } from "react-icons/fi";
import { TrackProps } from "../utils/interface/track-info";
import { motion } from "framer-motion";

const textStyle: React.CSSProperties = {
  fontFamily: "Raleway",
  fontWeight: "medium",
  wordBreak: "break-all",
};

const mainFrameProps = {
  justify: "flex-start",
  align: "flex-start",
  spacing: "10px",
  width: "813px",
  height: "641px",
  maxWidth: "100%",
};

interface SearchMusicComponentProps {
  onSelectedMusic: React.Dispatch<React.SetStateAction<boolean>>;
  onSetMusicInfo: React.Dispatch<React.SetStateAction<Music | undefined>>; // TODO: nullだと親コンポでエラーなので、undefinedとして記載したが良いのか...
}

function SearchMusicComponent(props: SearchMusicComponentProps) {
  const [query, setQuery] = useState<string>(""); // 検索ワードを受け取るuseState.
  const [musicData, setMusicData] = useState<Music[]>([]); // 楽曲データの検索結果を受け取るuseState.

  const handleMusicSelect = (music: Music) => {
    props.onSetMusicInfo(music);
    props.onSelectedMusic(true); // 画面下部の再生バーを表示する.
  };

  const handleSearch = async () => {
    try {
      setMusicData([]); // 毎回検索結果をリセット
      const results = await searchMusic(query);
      setMusicData(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack>
        <IconComponent />
        <SearchBarComponent
          onSearch={handleSearch}
          query={query}
          setQuery={setQuery}
        />
        <SearchResultComponent
          musicData={musicData}
          onSelect={handleMusicSelect}
        />
      </Stack>
    </>
  );
}

interface SearchBarProps {
  onSearch: () => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({
  onSearch,
  query,
  setQuery,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Input
        width="572px"
        height="47px"
        maxWidth="100%"
        top="22px"
        left="92px"
        background="#FFFFFF"
        position="absolute"
        type="text"
        placeholder=" Search..."
        value={query}
        onChange={handleInputChange}
      />
      <IconButton
        aria-label="Search"
        width="27px"
        height="27px"
        left="614px"
        top="32px"
        icon={<SearchIcon />}
        position="absolute"
        onClick={onSearch}
      />
    </>
  );
};

interface SearchResultProps {
  musicData: Music[];
  onSelect: (music: Music) => void;
}

const SearchResultComponent = ({ musicData, onSelect }: SearchResultProps) => {
  const [selectedMusicId, setSelectedMusicId] = useState(null);

  const handlePlay = (music: Music) => {
    onSelect(music);
  };

  return (
    <Stack>
      <Text
        fontFamily="Raleway"
        fontWeight="bold"
        fontSize="17px"
        color="#000000"
        width="197px"
        height="24px"
        left="20px"
        top="330px"
        position="absolute"
      >
        Search Result
      </Text>
      <HStack
        left="18px"
        top="364px"
        position="absolute"
        style={{ flexWrap: "wrap" }}
        spacing="30px"
      >
        {musicData.map((music) => (
          <Box key={music.id} width="125px" height="165px">
            <Box
              as={motion.div}
              position="relative"
              width="100px"
              height="100px"
              mb="2"
              opacity={selectedMusicId === music.id ? 0.8 : 1} // カーソルがあたっている場合にアルファ値を変更
              cursor="pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePlay(music)}
            >
              <Image
                width="100px"
                height="100px"
                src={music.images.url}
                alt="song image"
              />
              <Box
                rounded="base"
                p={1}
                position="absolute"
                right={0}
                bottom={0}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <FiPlayCircle color="rgba(235, 213, 100, 0.94)" size="40px" />
              </Box>
            </Box>
            <Text fontSize="10px" color="#000000">
              {music.song_title}
            </Text>
            <Text fontSize="8px" color="rgba(0, 0, 0, 0.32)">
              {music.artist_name}
            </Text>
          </Box>
        ))}
      </HStack>
    </Stack>
  );
};

function IconComponent() {
  return (
    <>
      <Text
        fontFamily="PT Mono"
        lineHeight="0.94"
        fontWeight="regular"
        fontSize="25px"
        letterSpacing="0.04em"
        color="#000000"
        width="42px"
        height="20px"
        top="12px"
        left="20px"
        textAlign="center"
        position="absolute"
      >
        Mu si ca
      </Text>
    </>
  );
}
// 画面左側の最も大きい枠. メインフレーム.
export function SearchPage() {
  const [selectedMusic, setSelectedMusic] = useState<Music>(); // 検索結果で、選択された楽曲の情報を受け取るuseState.
  const [isVisiblePlaybackBar, setVisiblePlaybackBar] = useState(false); // 楽曲を再生中か. 再生ボタンを一度押すと、再生バーが表示される.
  const [trackList, setTrackList] = useState<TrackProps[]>([]);
  const topValue = 73;

  const handleFavoriteClick = () => {
    setTrackList((prevTrackList) => [
      ...prevTrackList,
      {
        imageSrc: selectedMusic?.images.url,
        altText: selectedMusic?.song_title,
        trackTitle: selectedMusic?.song_title,
        artistName: selectedMusic?.artist_name,
        positionTop: topValue + prevTrackList.length * 80,
      },
    ]);
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
          <Stack
            {...mainFrameProps}
            background="rgba(222, 207, 131, 0.27)"
            position="relative"
            overflowY="auto"
          >
            <RadioComponent />
            <SearchMusicComponent
              onSelectedMusic={setVisiblePlaybackBar}
              onSetMusicInfo={setSelectedMusic}
            />
          </Stack>
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
