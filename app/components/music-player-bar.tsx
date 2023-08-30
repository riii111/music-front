import React from "react";
import { useState, useEffect, useRef } from "react";
import { MdFavorite } from "react-icons/md";
import { motion } from "framer-motion";

import {
  Box,
  Image,
  Text,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Circle,
} from "@chakra-ui/react";
import { Music } from "../utils/interface/music-info";
import { StopAndPlayButton } from "./stop-and-play-button";

interface VolumeSliderComponentProps {
  handleClick: (volume: number) => void;
  audio: typeof Audio;
}

const MAX_VOLUME = 100; // 楽曲のボリュームの最大値.
const INIT_VOLUME = 50; // 楽曲のボリュームの初期値.
const MAX_TIME = 29.0; // 楽曲の再生時間の最大値.

function VolumeSliderComponent(props: VolumeSliderComponentProps) {
  const [sliderValue, setSliderValue] = useState(props.audio.volume * 100); // スライダーの現在の値.
  const [timerId, setTimerId] = useState(null); // タイマーID

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
            left={`${(sliderValue / MAX_VOLUME) * 170}px`} // ボリュームに応じて位置を動的に設定
          />
        </Slider>
      </Box>
    </>
  );
}

interface SelectedSongSliderComponentProps {
  handleClick: (time: number) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  sliderRef: React.MutableRefObject<null>;
}

function SelectedSongSliderComponent(props: SelectedSongSliderComponentProps) {
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
            left={`${(props.currentTime / MAX_TIME) * 376}px`} // 再生時間に応じて位置を動的に設定
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

interface MusicPlayerBarFrameProps {
  selectedMusic: Music;
  isPlaying: boolean;
  handleFavoriteClick: () => void;
}

export function MusicPlayerBarFrame(props: MusicPlayerBarFrameProps) {
  const [audio, setAudio] = useState<typeof Audio | null>(null);

  const [selectedMusic, setSelectedMusic] = useState(props.selectedMusic);
  const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const sliderRef = useRef(); // スライダーの参照を作成

  // 楽曲の再生時間の更新.
  useEffect(() => {
    if (isPlaying && audio) {
      const intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= MAX_TIME) {
            clearInterval(intervalId);
            setIsPlaying(false); // 再生を終えたら停止.
            setCurrentTime(0); // 再生を終えたら再生時間を0に戻す.
            return prevTime;
          }
          sliderRef.current.blur(); // 自動更新完了後にスライダーのフォーカスを外す
          return prevTime + 1;
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPlaying, audio]);

  // 選択中の楽曲が変更された場合.
  useEffect(() => {
    console.log(`selectedMusic: ${props.selectedMusic}`);
    stopCurrentMusic();
    setSelectedMusic(props.selectedMusic);
    setIsPlaying(false); // 別の楽曲を選択した場合、強制的に再生を停止する.
    setAudio(createAudio(props.selectedMusic.song_url));

    setCurrentTime(0);
  }, [props.selectedMusic, props.isPlaying]);

  const createAudio = (url: string) => {
    let audio = new Audio(url);
    audio.volume = INIT_VOLUME / 100; // audio.volumeは0~1の間の値を取る.
    return audio;
  };

  const handleMusicSelection = () => {
    const changeFlag = !isPlaying;
    handleMusicControl();
    setIsPlaying(changeFlag);
  };

  const stopCurrentMusic = () => {
    if (audio) {
      audio.pause();
    }
  };

  // 楽曲の再生・停止をコントロールする関数.
  const handleMusicControl = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  // 楽曲の再生位置をコントロールする関数.
  const handleAudioCurrentTime = (value: number) => {
    audio.currentTime = value;
  };

  // 楽曲の音量をコントロールする関数.
  const handleAudioCurrentVolume = (value: number) => {
    audio.volume = value / 100; // audio.volumeは0~1の間の値を取る.
  };

  return (
    <HStack
      width="1152px"
      height="59px"
      top="637px"
      left="0px"
      background="#242424"
      position="absolute"
    >
      <Image
        width="44px"
        height="48px"
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

      <StopAndPlayButton
        handleClick={handleMusicSelection}
        isPlaying={isPlaying}
      />
      <SelectedSongSliderComponent
        handleClick={handleAudioCurrentTime}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        sliderRef={sliderRef}
      />
      {audio && (
        <VolumeSliderComponent
          handleClick={handleAudioCurrentVolume}
          audio={audio}
        />
      )}
      <Circle
        as={motion.div}
        size="31px"
        background="#3F3F3F"
        top="16px"
        left="1087px"
        position="absolute"
        onClick={props.handleFavoriteClick}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <MdFavorite color="#DECF83" size="23.67px" />
      </Circle>
    </HStack>
  );
}

// export default MusicPlayerBarFrame;
