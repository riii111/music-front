import { Stack, Box, Text } from "@chakra-ui/react";
import { TrackProps } from "../../utils/interface/track-info";
import { useMemo } from "react";
import { deleteFavoriteMusic } from "../../api/favorite-music";
import { topValue } from "../../utils/constants";
import { FavoriteTrack } from "./FavoriteTrack";

interface FavoriteTrackListProps {
  trackList: TrackProps[];
  setTrackList?: any;
}

const FavoriteTrackList: React.FC<FavoriteTrackListProps> = ({
  trackList,
  setTrackList,
}) => {
  const onDeleteFavorite = (index: number) => {
    const updatedTrackList = [...trackList];
    deleteFavoriteMusic(updatedTrackList[index].id);
    updatedTrackList.splice(index, 1);
    setTrackList(updatedTrackList);
  };

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
