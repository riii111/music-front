import React from "react";
import { useState } from "react";

import {
  Box,
  Image,
  Text,
  Button,
  Circle,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { FiPlay, FiPause } from "react-icons/fi";
import Music from "../utils/interface/music-info";

interface StopAndPlayButtonProps {
  isPlaying: boolean;
}

function StopAndPlayButton(props: StopAndPlayButtonProps) {
  return (
    <Box left="262px" top="6px" position="absolute">
      {props.isPlaying ? (
        <Circle size="31px" background="#3F3F3F">
          <FiPause color="rgba(235, 213, 100, 0.94)" size="23.67px" />
        </Circle>
      ) : (
        <Circle size="31px" background="#3F3F3F">
          <FiPlay color="rgba(235, 213, 100, 0.94)" size="21.67px" />
        </Circle>
      )}
    </Box>
  );
}

interface MusicPlayerBarFrameProps {
  selectedMusic: Music;
}

function MusicPlayerBarFrame({ selectedMusic }: MusicPlayerBarFrameProps) {
  console.log("called MusicPlayerBarFrame()");
  console.log(selectedMusic.artist_name);
  const [isPlaying, setIsPlaying] = useState(false); // 楽曲を再生中か、停止か.
  //   const [currentTime, setCurrentTime] = useState(0); // 再生位置.
  //   const [totalDuration, setTotalDuration] = useState(0); // 楽曲の総再生時間.

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  //   const handleSliderChange = (value) => {
  //     setCurrentTime(value);
  //   };

  return (
    <>
      <Box
        width="1152px"
        height="59px"
        top="637px"
        left="0px"
        background="#242424"
        position="absolute"
      >
        <Button onClick={togglePlay}>
          <StopAndPlayButton isPlaying={isPlaying} />
        </Button>
        {/* <Slider
          min={0}
          max={totalDuration}
          value={currentTime}
          onChange={handleSliderChange}
        > */}
        {/* <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack> */}
        <Image
          width="44px"
          height="48px"
          top="10px"
          left="18px"
          src={selectedMusic.images.url}
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
            {selectedMusic.song_title}
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
            {selectedMusic.artist_name}
          </Text>
        </Box>
        {/* <SliderThumb />
        </Slider> */}
      </Box>
    </>
  );
}

export default MusicPlayerBarFrame;
