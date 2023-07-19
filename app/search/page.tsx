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
import ReactAudioPlayer from "react-audio-player";

import Music from "../utils/interface/music-info";

import searchMusic from "../api/search-music";
import FavoriteTrackListFrame from "../components/favorite-track";
import RadioComponent from "../components/radio";
// import playMusic from "../api/play-music";

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

function SearchMusicComponent() {
  // 検索ワードを受け取るuseState.
  const [query, setQuery] = useState<string>("");
  // 楽曲データの検索結果を受け取るuseState.
  const [musicData, setMusicData] = useState<Music[]>([]);

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
    <Stack>
      <IconComponent />
      <SearchBarComponent
        onSearch={handleSearch}
        query={query}
        setQuery={setQuery}
      />
      <SearchResultComponent musicData={musicData} />
    </Stack>
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
}

const SearchResultComponent: React.FC<SearchResultProps> = ({ musicData }) => {
  // const handlePlayMusic = (songId: any) => {
  //   playMusic(songId);
  // };

  return (
    <>
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
        >
          {musicData.map((music) => (
            <Box
              key={music.id}
              width="125px"
              height="88px"
              style={{ margin: "30px 0" }}
            >
              <Image width="100px" height="100px" src={music.images.url} />
              <ReactAudioPlayer
                style={{ maxWidth: "105px", height: "8px" }}
                src={music.song_url}
                // onPlay={() => handlePlayMusic(music.id)}
                controls
              />
              <Text fontSize="10px" color="#000000" style={textStyle}>
                {music.song_title}
              </Text>
              <Text
                fontSize="8px"
                color="rgba(0, 0, 0, 0.32)"
                style={textStyle}
              >
                {music.artist_name}
              </Text>
            </Box>
          ))}
        </HStack>
      </Stack>
    </>
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
function SearchAndResultFrame() {
  return (
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
          overflowY="scroll"
          css={{
            scrollBehavior: "smooth",
          }}
        >
          <RadioComponent />
          <SearchMusicComponent />
        </Stack>
      </Stack>
    </Box>
  );
}

// 画面下側の枠.
function ReplayFrame() {
  return (
    <>
      <Box
        width="1152px"
        height="59px"
        top="637px"
        left="0px"
        background="#242424"
        position="absolute"
      />
    </>
  );
}

export const SearchPage = () => (
  <>
    <Box>
      <SearchAndResultFrame />
      <FavoriteTrackListFrame />
      <ReplayFrame />
    </Box>
  </>
);
