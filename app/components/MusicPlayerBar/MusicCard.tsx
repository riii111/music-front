import React from "react";

import { Box, Image, Text } from "@chakra-ui/react";
import { Song } from "../../utils/interface/music-info";

interface MusicCardComponentProps {
  selectedMusic: Song;
}

export function MusicCardComponent(props: MusicCardComponentProps) {
  return (
    <>
      <Image
        width="44px"
        height="48px"
        left="18px"
        src={props.selectedMusic.image.url}
        alt="song image"
        position="absolute"
      />
      <Box>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#EBD564"
          width="170px"
          height="16px"
          top="16px"
          left="71px"
          position="absolute"
        >
          {props.selectedMusic.song_title}
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(255, 255, 255, 0.53)"
          width="170px"
          top="37px"
          height="16px"
          left="71px"
          position="absolute"
        >
          {props.selectedMusic.artist_name}
        </Text>
      </Box>
    </>
  );
}
