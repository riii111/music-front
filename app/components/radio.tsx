import { Stack, Box, Text, Image } from "@chakra-ui/react";
export function RadioComponent() {
  const boxStyle: React.CSSProperties = {
    background: "rgba(235, 213, 100, 0.94)",
    position: "absolute",
    top: "83px",
    left: "20px",
  };

  const subBoxStyle: React.CSSProperties = {
    background: "rgba(244, 234, 179, 0.6)",
    position: "absolute",
    height: "26px",
    fontFamily: "Raleway",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#000000",
    width: "71px",
  };

  const textStyles: React.CSSProperties = {
    fontFamily: "Puritan",
    fontWeight: "bold",
    color: "#000000",
    width: "294px",
    maxWidth: "100%",
    position: "absolute",
  };

  const playStackStyle: React.CSSProperties = {
    background: "#000000",
    color: "#EBD564",
    fontFamily: "Raleway",
    fontSize: "20px",
    fontWeight: "bold",
    width: "60px",
    height: "26px",
    textAlign: "center",
    position: "absolute",
    left: "59px",
    top: "233px",
  };

  return (
    <>
      <Box
        style={{
          ...boxStyle,
          width: "707px",
          height: "224px",
          maxWidth: "100%",
        }}
      />
      <Stack>
        <Box
          style={{
            ...subBoxStyle,
            left: "59px",
            top: "134px",
          }}
        >
          <Text>&nbsp;#radio</Text>
        </Box>
        <Box
          style={{
            ...subBoxStyle,
            left: "150px",
            top: "134px",
          }}
        >
          <Text>&nbsp;#Stream</Text>
        </Box>
        <Box>
          <Text
            style={{
              ...textStyles,
              fontSize: "16px",
              height: "13px",
              left: "59px",
              top: "172px",
            }}
          >
            The Zane Lowe Show
          </Text>
          <Text
            style={{
              ...textStyles,
              fontSize: "12px",
              fontWeight: "medium",
              color: "rgba(0, 0, 0, 0.19)",
              height: "13px",
              left: "59px",
              top: "195px",
            }}
          >
            with Hiatus Kaiyote
          </Text>
        </Box>
        <Stack
          paddingX="14px"
          paddingY="3px"
          direction="row"
          justify="center"
          align="center"
          spacing="48px"
          style={{
            ...playStackStyle,
            width: "186px",
            height: "33px",
            overflow: "hidden",
          }}
        >
          <Text>Let's search!▶</Text>
        </Stack>
        <Image
          style={{
            position: "absolute",
            width: "410px",
            height: "203px",
            top: "104px",
            left: "205px",
          }}
          src="/images/zane_radio.png"
          alt="Zane Radio Show"
        />
      </Stack>
      <Box
        style={{
          ...boxStyle,
          width: "125px",
          height: "224px",
          left: "602px",
        }}
      />
      <Image
        style={{
          position: "absolute",
          width: "360px",
          height: "189px",
          top: "148px",
          left: "483px",
        }}
        src="/images/zane_lowe.png"
        alt="Zane Lowe"
      />
    </>
  );
}

export default RadioComponent;
