import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import { Song } from "../../utils/interface/music-info";
import { useState } from "react";
import { RadioComponent } from "./Radio";
import { searchMusic } from "../../api/search-music";
import { IconComponent } from "./WebIcon";
import { SearchBarComponent } from "./SearchBar";
import { SearchResultComponent } from "./SearchMusicResult";

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
  onSetMusicInfo: React.Dispatch<React.SetStateAction<Song | undefined>>;
}

export function SearchMusicFrame(props: SearchMusicComponentProps) {
  const [query, setQuery] = useState<string>("");
  const [musicData, setMusicData] = useState<Song[]>([]);

  const handleMusicSelect = (music: Song) => {
    props.onSetMusicInfo(music);
    props.onSelectedMusic(true); // 画面下部の再生バーを表示する.
  };

  const handleSearch = async () => {
    try {
      setMusicData([]); // 毎回検索結果をリセット
      const results = await searchMusic(query);
      console.log(results[0].image.url);
      setMusicData(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      {...mainFrameProps}
      background="rgba(222, 207, 131, 0.27)"
      position="relative"
      overflowY="auto"
    >
      <IconComponent />
      <SearchBarComponent
        onSearch={handleSearch}
        query={query}
        setQuery={setQuery}
      />
      <RadioComponent />
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
        <SearchResultComponent
          musicData={musicData}
          onSelect={handleMusicSelect}
        />
      </Stack>
    </Stack>
  );
}
