import React from "react";
import { FiPlay, FiPause } from "react-icons/fi";
import { Box, Circle } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface StopAndPlayButtonProps {
  isPlaying: boolean;
  handleClick: () => void;
}

export function StopAndPlayButton(props: StopAndPlayButtonProps) {
  const handleClick = () => {
    props.handleClick();
  };

  return (
    <Box left="262px" position="absolute">
      <Circle
        as={motion.div}
        size="31px"
        background="#3F3F3F"
        onClick={handleClick}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {props.isPlaying ? (
          <FiPause color="rgba(235, 213, 100, 0.94)" size="23.67px" />
        ) : (
          <FiPlay color="rgba(235, 213, 100, 0.94)" size="21.67px" />
        )}
      </Circle>
    </Box>
  );
}

// export default StopAndPlayButton;
