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
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";

interface Images {
  url: string;
  height: number;
  width: number;
}

interface Music {
  id: number | string;
  song_title: string;
  artist_name: string;
  song_url: string;
  album_name: string;
  images: Images;
}

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

// APIを呼び出して検索結果を返す関数
async function searchMusic(query: string): Promise<Music[]> {
  try {
    const searchQueryUri = `http://localhost:8000/songs?search_words=${query}`;
    const response = await axios.get<Music[]>(searchQueryUri);

    console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
      console.log(response.data[i].id);
      console.log(response.data[i].song_title);
      console.log(response.data[i].song_url);
    }
    return response.data;
  } catch (error) {
    // Axios error handling
    if (axios.isAxiosError(error)) {
      throw new Error(`APIの呼び出しでエラーが発生しました。 ${error.message}`);
    }

    // Network error or other unexpected errors
    throw new Error("予期しないエラーが発生しました。");
  }
}

function SearchMusicComponent() {
  const [query, setQuery] = useState<string>("");
  // 楽曲データの検索結果を受け取るuseState.
  const [musicData, setMusicData] = useState<Music[]>([]);

  const handleSearch = async () => {
    try {
      setMusicData([]); // 検索結果をリセット
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

// 子コンポーネント1: SearchBarComponent
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

// 子コンポーネント2: SearchResultComponent
interface SearchResultProps {
  musicData: Music[];
}

// async function playMusic(currentSongId: string): Promise<any> {
//   try {
//     const playMusicUri = `http://localhost:8000/songs/${currentSongId}`;
//     await axios.post<any>(playMusicUri);
//     // return success
//   } catch (error) {
//     // Axios error handling
//     if (axios.isAxiosError(error)) {
//       throw new Error(`APIの呼び出しでエラーが発生しました。 ${error.message}`);
//     }

//     // Network error or other unexpected errors
//     throw new Error("予期しないエラーが発生しました。");
//   }
// }

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

function RadioComponent() {
  return (
    <>
      <Box
        width="707px"
        height="224px"
        maxWidth="100%"
        background="rgba(235, 213, 100, 0.94)"
        top="83px"
        left="20px"
        position="absolute"
      />
      <Stack>
        <Box
          width="71px"
          height="26px"
          left="59px"
          top="134px"
          position="absolute"
          background="rgba(244, 234, 179, 0.6)"
        >
          <Text
            fontFamily="Raleway"
            fontWeight="bold"
            fontSize="12px"
            color="#000000"
            width="61px"
            height="12px"
            textAlign="left"
          >
            &nbsp;#radio
          </Text>
        </Box>
        <Box
          width="71px"
          height="26px"
          left="150px"
          top="134px"
          position="absolute"
          background="rgba(244, 234, 179, 0.6)"
        >
          <Text
            fontFamily="Raleway"
            fontWeight="bold"
            fontSize="12px"
            color="#000000"
            width="61px"
            height="12px"
            textAlign="left"
          >
            &nbsp;#Stream
          </Text>
        </Box>
        <Box>
          <Text
            fontFamily="Puritan"
            fontWeight="bold"
            fontSize="16px"
            color="#000000"
            width="294px"
            height="13px"
            maxWidth="100%"
            left="59px"
            top="172px"
            position="absolute"
          >
            The Zane Lowe Show
          </Text>
          <Text
            fontFamily="Raleway"
            fontWeight="medium"
            fontSize="12px"
            color="rgba(0, 0, 0, 0.19)"
            width="294px"
            height="13px"
            maxWidth="100%"
            left="59px"
            top="195px"
            position="absolute"
          >
            with Hiatus Kaiyote
          </Text>
        </Box>
        <Stack
          width="186px"
          height="33px"
          paddingX="14px"
          paddingY="3px"
          direction="row"
          justify="center"
          align="center"
          spacing="48px"
          overflow="hidden"
          background="#000000"
          left="59px"
          top="233px"
          position="absolute"
        >
          <Text
            fontFamily="Raleway"
            fontWeight="bold"
            fontSize="20px"
            color="#EBD564"
            width="60px"
            height="26px"
            textAlign="center"
          >
            PLAY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶
          </Text>
        </Stack>
        <Image
          width="410px"
          height="203px"
          top="104px"
          left="205px"
          src="/images/zane_radio.png"
          alt="Zane Radio Show"
          position="absolute"
        />
      </Stack>
      <Box
        width="125px"
        height="224px"
        left="602px"
        top="83px"
        position="absolute"
        background="rgba(244, 234, 179, 0.62)"
      />
      <Image
        width="360px"
        height="189px"
        top="148px"
        left="483px"
        src="/images/zane_lowe.png"
        alt="Zane Lowe"
        position="absolute"
      />
    </>
  );
}

function FavoriteTrackRobertGlasper() {
  return (
    <Stack direction="row" justify="flex-start" align="center" spacing="0px">
      <Stack
        padding="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
      >
        <Image
          width="53px"
          height="px"
          top="73px"
          left="34px"
          src="/images/black_radio_3.jpeg"
          alt="Robert Glasper"
          position="absolute"
        />
        <Box width="53px" height="52px" />
      </Stack>
      <Stack justify="flex-start" align="flex-start" spacing="0px" top="30px">
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          top="83px"
          left="93px"
          position="absolute"
        >
          Black Radio Ⅲ
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          top="99px"
          left="93px"
          position="absolute"
        >
          Robert Glasper
        </Text>
      </Stack>
      {/* [TODO]薄い枠を表示させる。 */}
    </Stack>
  );
}

function FavoriteTrackKidFresino() {
  return (
    <Stack direction="row" justify="flex-start" align="center" spacing="0px">
      <Stack
        padding="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
      >
        <Image
          width="53px"
          height="px"
          top="153px"
          left="34px"
          src="/images/20_stop_it.jpeg"
          alt="Kid Fresino"
          position="absolute"
        />
        <Box width="53px" height="52px" />
      </Stack>
      <Stack justify="flex-start" align="flex-start" spacing="0px" top="30px">
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          top="163px"
          left="93px"
          position="absolute"
        >
          20, Stop it.
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          top="179px"
          left="93px"
          position="absolute"
        >
          KID FRESINO
        </Text>
      </Stack>
    </Stack>
  );
}

function FavoriteTrackMichaelJackson() {
  return (
    <Stack direction="row" justify="flex-start" align="center" spacing="0px">
      <Stack
        padding="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
      >
        <Image
          width="53px"
          height="px"
          top="233px"
          left="34px"
          src="/images/thriller.jpg"
          alt="Michael Jackson"
          position="absolute"
        />
        <Box width="53px" height="52px" />
      </Stack>
      <Stack justify="flex-start" align="flex-start" spacing="0px" top="30px">
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          top="243px"
          left="93px"
          position="absolute"
        >
          Thriller 25th Anniv.
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          top="259px"
          left="93px"
          position="absolute"
        >
          Michael Jackson
        </Text>
      </Stack>
    </Stack>
  );
}

function FavoriteTrackBrittanyHoward() {
  return (
    <Stack direction="row" justify="flex-start" align="center" spacing="0px">
      <Stack
        padding="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
      >
        <Image
          width="53px"
          height="px"
          top="303px"
          left="34px"
          src="/images/jaime.jpg"
          alt="Kid Fresino"
          position="absolute"
        />
        <Box width="53px" height="52px" />
      </Stack>
      <Stack justify="flex-start" align="flex-start" spacing="0px" top="30px">
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          top="318px"
          left="93px"
          position="absolute"
        >
          Jaime
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          top="336px"
          left="93px"
          position="absolute"
        >
          Brittany Howard
        </Text>
      </Stack>
    </Stack>
  );
}

function FavoriteTrackNateSmith() {
  return (
    <Stack direction="row" justify="flex-start" align="center" spacing="0px">
      <Stack
        padding="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
      >
        <Image
          width="53px"
          height="px"
          top="393px"
          left="34px"
          src="/images/Kinfolk2.jpeg"
          alt="Nate Smith"
          position="absolute"
        />
        <Box width="53px" height="52px" />
      </Stack>
      <Stack justify="flex-start" align="flex-start" spacing="0px" top="30px">
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          top="403px"
          left="93px"
          position="absolute"
        >
          Kinfolk2
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          top="419px"
          left="93px"
          position="absolute"
        >
          Nate Smith
        </Text>
      </Stack>
    </Stack>
  );
}

function FavoriteTrackDowny() {
  return (
    <Stack direction="row" justify="flex-start" align="center" spacing="0px">
      <Stack
        padding="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
      >
        <Image
          width="53px"
          height="px"
          top="473px"
          left="34px"
          src="/images/downy無題.jpg"
          alt="Downy"
          position="absolute"
        />
        <Box width="53px" height="52px" />
      </Stack>
      <Stack justify="flex-start" align="flex-start" spacing="0px" top="30px">
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          top="483px"
          left="93px"
          position="absolute"
        >
          第五作 無題
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          top="499px"
          left="93px"
          position="absolute"
        >
          downy
        </Text>
      </Stack>
    </Stack>
  );
}

function FavoriteTrackWonk() {
  return (
    <Stack direction="row" justify="flex-start" align="center" spacing="0px">
      <Stack
        padding="10px"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
      >
        <Image
          width="53px"
          height="px"
          top="553px"
          left="34px"
          src="/images/sphere.jpeg"
          alt="Wonk"
          position="absolute"
        />
        <Box width="53px" height="52px" />
      </Stack>
      <Stack justify="flex-start" align="flex-start" spacing="0px" top="30px">
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          top="563px"
          left="93px"
          position="absolute"
        >
          Sphere
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          top="579px"
          left="93px"
          position="absolute"
        >
          WONK
        </Text>
      </Stack>
    </Stack>
  );
}

function FavoriteTrack() {
  return (
    <>
      <FavoriteTrackRobertGlasper />
      <FavoriteTrackKidFresino />
      <FavoriteTrackMichaelJackson />
      <FavoriteTrackBrittanyHoward />
      <FavoriteTrackNateSmith />
      <FavoriteTrackDowny />
      <FavoriteTrackWonk />
    </>
  );
}

function FavoriteTrackList() {
  return (
    <Stack
      direction="row"
      justify="flex-start"
      align="flex-start"
      spacing="10px"
      top="0px"
      left="805px"
      position="absolute"
    >
      <FavoriteTrack />
    </Stack>
  );
}

// 画面右側に表示する枠.
function MyFavoriteTrackFrame() {
  return (
    <Box>
      <Stack
        direction="row"
        justify="flex-start"
        align="flex-start"
        spacing="10px"
        top="0px"
        left="805px"
        position="absolute"
      >
        <Text
          fontFamily="Puritan"
          fontWeight="bold"
          fontSize="25px"
          color="#363636"
          position="absolute"
          top="15px"
          left="37px"
        >
          My favorite tracks
        </Text>

        <Box
          width="347px"
          height="639px"
          maxWidth="100%"
          background="#EBD564"
          borderColor="#E7E7E7"
          borderStartWidth="1px"
          borderEndWidth="1px"
          borderTopWidth="1px"
          borderBottomWidth="1px"
          overflowY="scroll"
          css={{
            scrollBehavior: "smooth",
          }}
        />
      </Stack>
      <FavoriteTrackList />
      {/* [TODO]FavoriteTrackListの領域だけをスクロールできるようにしたい. */}
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
      <MyFavoriteTrackFrame />
      <ReplayFrame />
    </Box>
  </>
);
