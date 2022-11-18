import { Box, Text } from "@chakra-ui/react";

type Props = {
  label: string;
  children: string;
};
export default function ResultBox({ label, children }: Props) {
  return (
    <Box maxH="30%">
      <Text
        paddingX={2}
        paddingY={1}
        borderTop="1px"
        borderX="1px"
        fontSize="2xl"
      >
        {label}
      </Text>
      <Text
        padding={2}
        fontSize="lg"
        border="1px"
        minH={50}
        maxH={100}
        overflow="scroll"
      >
        {children}
      </Text>
    </Box>
  );
}
