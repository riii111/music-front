// "use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { MdFavorite } from "react-icons/md";
import { motion } from "framer-motion";

import { HStack, Circle } from "@chakra-ui/react";
import { Song } from "../../utils/interface/music-info";
import { StopAndPlayButton } from "./StopAndPlayButton";
import { VolumeSliderComponent } from "./VolumeSlider";
import { SongProgressBarComponent } from "./SongProgressBar";
import { MusicCardComponent } from "./MusicCard";
import { INIT_VOLUME, MAX_TIME } from "../../utils/constants";

interface MusicPlayerBarFrameProps {
  selectedMusic: Song;
  isPlaying: boolean;
  handleFavoriteClick: () => void;
}

export function MusicPlayerBarFrame(props: MusicPlayerBarFrameProps) {
  const [audio, setAudio] = useState<typeof Audio | null>(null);

  const [selectedMusic, setSelectedMusic] = useState(props.selectedMusic);
  const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

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

  const handleMusicControl = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleAudioCurrentTime = (value: number) => {
    if (audio) {
      audio.currentTime = value;
    }
  };

  const handleAudioCurrentVolume = (value: number) => {
    if (audio) {
      audio.volume = value / 100; // audio.volumeは0~1の間の値を取る.
    }
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
      <MusicCardComponent selectedMusic={selectedMusic} />

      <StopAndPlayButton
        handleClick={handleMusicSelection}
        isPlaying={isPlaying}
      />
      <SongProgressBarComponent
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
