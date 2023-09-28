import { Stack, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdFavorite } from "react-icons/md";
import { Image } from "@chakra-ui/react";
import styles from "../../layout.module.css";

interface FavoriteTrack {
  imageSrc: string;
  altText: string;
  trackTitle: string;
  artistName: string;
  positionTop: number;
  onDeleteFavorite: () => void;
}

export const FavoriteTrack: React.FC<FavoriteTrack> = ({
  imageSrc,
  altText,
  trackTitle,
  artistName,
  positionTop,
  onDeleteFavorite,
}) => {
  const leftValue = "59px";
  const topOffset = 10;
  const textOffset = 26;

  const textStyle = {
    fontFamily: "Raleway",
    fontWeight: "medium",
  };

  return (
    <Stack
      border="1px solid gray"
      borderRadius="md"
      height="52px"
      top={`${positionTop}px`}
      width="268px"
      left="34px"
      position="absolute"
      // layout.module.cssのdescriptionクラスを適用する.
      // className={styles.description}
    >
      <Image
        src={imageSrc}
        alt={altText}
        boxSize="52px"
        top="-1px"
        left="-1px"
        mr="10px"
        position="absolute"
      />
      <Box>
        <Text
          {...textStyle}
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          left={leftValue}
          // layout.module.cssのdescriptionクラスを適用する.
          // className={styles.description}
          top={`${topOffset}px`}
          position="absolute"
        >
          {trackTitle}
        </Text>
        <Text
          {...textStyle}
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          left={leftValue}
          // layout.module.cssのdescriptionクラスを適用する.
          // className={styles.description}
          top={`${textOffset}px`}
          position="absolute"
        >
          {artistName}
        </Text>
      </Box>
      <Stack
        border="1px solid gray"
        borderRadius="md"
        left="228px"
        top="-1px"
        position="absolute"
        width="39px"
        height="52px"
        align="center"
        justify="center"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDeleteFavorite()}
        >
          <MdFavorite size={24} />
        </motion.div>
      </Stack>
    </Stack>
  );
};
