import { Stack, Box, Text, Image } from "@chakra-ui/react";
import { TrackProps } from "../utils/interface/track-info";
import { MdFavorite } from "react-icons/md";
import { useMemo } from "react";
import { motion } from "framer-motion";

// const FavoriteTrack: React.FC<TrackProps> = ({
const FavoriteTrack: React.FC<any> = ({
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

  // [TODO]お気に入りリストに追加したデータをDBテーブルに保存する.
  const saveFavorite = () => {
    console.log("called saveFavorite");
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
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="13px"
          color="#000000"
          width="170px"
          height="16px"
          left={leftValue}
          top={`${topOffset}px`}
          position="absolute"
        >
          {trackTitle}
        </Text>
        <Text
          fontFamily="Raleway"
          fontWeight="medium"
          fontSize="9px"
          color="rgba(0, 0, 0, 0.32)"
          width="170px"
          height="16px"
          left={leftValue}
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

interface FavoriteTrackListProps {
  trackList: TrackProps[];
  setTrackList?: any;
}

// お気に入りリストの先頭のTop値.
const topValue = 73;

const FavoriteTrackList: React.FC<FavoriteTrackListProps> = ({
  trackList,
  setTrackList,
}) => {
  // 指定したお気に入りリストを削除する関数.
  const onDeleteFavorite = (index: number) => {
    const updatedTrackList = [...trackList];
    updatedTrackList.splice(index, 1);
    setTrackList(updatedTrackList);
  };

  // お気に入りリストのレンダリング.
  const renderedTracks = useMemo(() => {
    if (trackList.length > 0) {
      return trackList.map((track: TrackProps, index: number) => {
        return (
          <FavoriteTrack
            key={index}
            imageSrc={track.imageSrc}
            altText={track.altText}
            trackTitle={track.trackTitle}
            artistName={track.artistName}
            positionTop={topValue + index * 80}
            onDeleteFavorite={() => onDeleteFavorite(index)}
          />
        );
      });
    } else {
      return null;
    }
  }, [trackList]);

  return (
    <Stack
      direction="row"
      justify="flex-start"
      align="flex-start"
      spacing="10px"
    >
      {renderedTracks}
    </Stack>
  );
};

interface FavoriteTrackListFrameProps {
  trackList: TrackProps[];
  setTrackList: any;
}

// 画面右側に表示する枠.
export function FavoriteTrackListFrame(props: FavoriteTrackListFrameProps) {
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
          overflowY="auto"
          position="relative"
        >
          <Text
            fontFamily="Puritan"
            fontWeight="bold"
            fontSize="25px"
            color="#363636"
            top="15px"
            left="37px"
            position="absolute"
          >
            My favorite tracks
          </Text>
          <FavoriteTrackList
            trackList={props.trackList}
            setTrackList={props.setTrackList}
          />
        </Box>
      </Stack>
    </Box>
  );
}

// export default FavoriteTrackListFrame;
