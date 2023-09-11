import React from "react";
import { Box, Text, Image, HStack } from "@chakra-ui/react";
import { Song } from "../../utils/interface/music-info";
import { FiPlayCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface SearchResultProps {
  musicData: Song[];
  onSelect: (music: Song) => void;
}

export const SearchResultComponent = ({
  musicData,
  onSelect,
}: SearchResultProps) => {
  const handlePlay = (music: Song) => {
    onSelect(music);
  };

  return (
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
            as={motion.div}
            position="relative"
            width="100px"
            height="100px"
            mb="2"
            cursor="pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePlay(music)}
          >
            <Image
              width="100px"
              height="100px"
              src={music.image.url}
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
  );
};
