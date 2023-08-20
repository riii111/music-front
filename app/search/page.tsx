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
import { useState, useRef } from "react";

import Music from "../utils/interface/music-info";

import searchMusic from "../api/search-music";
import FavoriteTrackListFrame from "../components/favorite-track";
import RadioComponent from "../components/radio";
import MusicPlayerBarFrame from "../components/music-player-bar";
import { FiPlayCircle } from "react-icons/fi";

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
  // const inputRef = useRef<HTMLInputElement>(null);
  // const handleInputFocus = () => {
  //   console.log("called handleInputFocus");
  //   console.log(inputRef.current);
  //   (document.activeElement as HTMLElement)?.blur();
  //   inputRef.current && inputRef.current.focus();
  // };

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
        // ref={inputRef}
        // onFocus={handleInputFocus}
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
  const handleImageHover = (id) => {
    // アニメーション処理を追加する
    setSelectedMusicId(id);
  };

  const handleImageLeave = () => {
    // アニメーション解除処理を追加する
    setSelectedMusicId(null);
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
              position="relative"
              width="100px"
              height="100px"
              mb="2"
              transition="transform 0.3s, opacity 0.3s" // カーソルホバー時のアニメーション追加
              transform={
                selectedMusicId === music.id ? "scale(1.05)" : "scale(1)"
              } // カーソルがあたっている場合に拡大するアニメーション
              opacity={selectedMusicId === music.id ? 0.8 : 1} // カーソルがあたっている場合にアルファ値を変更
              cursor="pointer"
              onMouseEnter={() => handleImageHover(music.id)} // マウスカーソルが要素に入った際の処理
              onMouseLeave={handleImageLeave} // マウスカーソルが要素から出た際の処理
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
function SearchAndResultFrame() {
  const [selectedMusic, setSelectedMusic] = useState<Music>(); // 検索結果で、選択された楽曲の情報を受け取るuseState.
  const [isVisiblePlaybackBar, setVisiblePlaybackBar] = useState(false); // 楽曲を再生中か. 再生ボタンを一度押すと、再生バーが表示される.

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
          <SearchMusicComponent
            onSelectedMusic={setVisiblePlaybackBar}
            onSetMusicInfo={setSelectedMusic}
          />
        </Stack>
      </Stack>
      {isVisiblePlaybackBar && (
        <MusicPlayerBarFrame selectedMusic={selectedMusic} isPlaying={false} />
      )}
    </Box>
  );
}

export const SearchPage = () => (
  <>
    <Box>
      <SearchAndResultFrame />
      <FavoriteTrackListFrame />
    </Box>
  </>
);
