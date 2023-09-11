import React from "react";
import { motion } from "framer-motion";

import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { MAX_TIME } from "../../utils/constants";

interface SelectedSongSliderComponentProps {
  handleClick: (time: number) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  sliderRef: React.MutableRefObject<null>;
}

export function SongProgressBarComponent(
  props: SelectedSongSliderComponentProps
) {
  const handleSliderProgressChange = (value: number) => {
    props.setCurrentTime(value);
    props.handleClick(value);
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const paddedSeconds = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${paddedSeconds}`;
  };

  return (
    <>
      <Text
        fontFamily="Raleway"
        fontWeight="medium"
        fontSize="9px"
        color="#FFFFFF"
        width="32px"
        height="6px"
        left="351px"
        position="absolute"
      >
        {formatTime(props.currentTime)}
      </Text>
      <Box
        width="376px"
        height="8px"
        left="386px"
        top="30px"
        position="absolute"
        background="#E2E8F0"
        overflow="visible"
      >
        <Slider
          aria-label="slider-music-progress-progress"
          variant="default"
          min={0}
          max={MAX_TIME}
          value={props.currentTime}
          onChange={handleSliderProgressChange}
          ref={props.sliderRef}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            as={motion.div}
            boxSize={10}
            borderRadius="full"
            bg="#3182CE"
            top="-1px" // バーの上端に合わせるために微調整
            position="absolute"
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            left={`${(props.currentTime / MAX_TIME) * 376}px`}
          />
        </Slider>
      </Box>
      <Text
        fontFamily="Raleway"
        fontWeight="medium"
        fontSize="9px"
        color="#FFFFFF"
        width="32px"
        height="6px"
        left="771px"
        position="absolute"
      >
        {formatTime(MAX_TIME)}
      </Text>
    </>
  );
}
