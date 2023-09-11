import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { INIT_VOLUME, MAX_VOLUME } from "../../utils/constants";

import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

interface VolumeSliderComponentProps {
  handleClick: (volume: number) => void;
  audio: typeof Audio;
}

export function VolumeSliderComponent(props: VolumeSliderComponentProps) {
  const [sliderValue, setSliderValue] = useState(props.audio.volume * 100);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    props.audio.volume = INIT_VOLUME / 100; // audio.volumeは0~1の間の値を取る.
    setSliderValue(INIT_VOLUME);
  }, [props.audio]);

  const handleSliderVolumeChange = (value: number) => {
    setSliderValue(value);
    if (timerId) {
      clearTimeout(timerId); // タイマーが既に起動していた場合はキャンセル
    }
    const newTimerId = setTimeout(() => {
      props.handleClick(value);
    }, 10); // スライダーの滑らかさを保つため、10ミリ秒後に音量を更新
    setTimerId(newTimerId);
  };

  return (
    <>
      <Box
        width="170px"
        left="883px"
        position="absolute"
        background="#807878"
        overflow="visible"
      >
        <Slider
          aria-label="slider-music-volume-control"
          variant="default"
          min={0}
          max={MAX_VOLUME}
          step={1}
          value={sliderValue}
          onChange={handleSliderVolumeChange}
        >
          <SliderTrack bgColor="#808080">
            <SliderFilledTrack bgColor="#EBD564" />
          </SliderTrack>
          <SliderThumb
            as={motion.div}
            boxSize={7}
            borderRadius="full"
            bgColor="#EBD564"
            top="-1px" // バーの上端に合わせるために微調整
            position="absolute"
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            left={`${(sliderValue / MAX_VOLUME) * 170}px`}
          />
        </Slider>
      </Box>
    </>
  );
}
