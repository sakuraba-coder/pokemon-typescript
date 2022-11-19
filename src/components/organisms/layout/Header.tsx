import { Box, Heading, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box as="header" borderBottom="1px solid" borderColor="gray.200" py={2}>
      <Heading size="lg" fontSize="50px" color="lightblue">
        ポケモン図鑑
      </Heading>
      <Text fontSize="xl">Do you know pokemon?</Text>
    </Box>
  );
};
