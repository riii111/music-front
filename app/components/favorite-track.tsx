import { Stack, Box, Text, Image } from "@chakra-ui/react";
import TrackProps from "../utils/interface/track-info";
import trackList from "../utils/constraints/constraints";

const FavoriteTrack: React.FC<TrackProps> = ({
  imageSrc,
  altText,
  trackTitle,
  artistName,
  positionTop,
}) => {
  const leftValue = "93px";
  const topOffset = 10;
  const textOffset = 26;

  return (
    <Stack align="center">
      <Image
        src={imageSrc}
        alt={altText}
        boxSize="52px"
        left="34px"
        top={`${positionTop}px`}
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
          top={`${positionTop + topOffset}px`}
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
          top={`${positionTop + textOffset}px`}
          position="absolute"
        >
          {artistName}
        </Text>
      </Box>
    </Stack>
  );
};

function FavoriteTrackList() {
  return (
    <Stack
      direction="row"
      justify="flex-start"
      align="flex-start"
      spacing="10px"
      top="0px"
      left="805px"
      position="absolute"
    >
      {trackList.map((track, index) => (
        <FavoriteTrack
          key={index}
          imageSrc={track.imageSrc}
          altText={track.altText}
          trackTitle={track.trackTitle}
          artistName={track.artistName}
          positionTop={track.positionTop}
        />
      ))}
    </Stack>
  );
}

// 画面右側に表示する枠.
function FavoriteTrackListFrame() {
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
        <Text
          fontFamily="Puritan"
          fontWeight="bold"
          fontSize="25px"
          color="#363636"
          position="absolute"
          top="15px"
          left="37px"
        >
          My favorite tracks
        </Text>

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
          overflowY="scroll"
          css={{
            scrollBehavior: "smooth",
          }}
        />
      </Stack>
      <FavoriteTrackList />
      {/* [TODO]FavoriteTrackListの領域だけをスクロールできるようにしたい. */}
    </Box>
  );
}

export default FavoriteTrackListFrame;
