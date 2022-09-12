import { Box, Flex } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FooterIcon } from "../../atoms/icon/FooterIcon";

type Props = {};

export const Footer: FC<Props> = memo(() => {
  return (
    <>
      <Box
        as="footer"
        borderTop="1px solid"
        borderColor="gray.200"
        color="gray.400"
        textAlign="center"
        py={4}
      >
        <Flex
          alignItems="center"
          align="center"
          justifyContent="center"
          fontSize={30}
          flexGrow={2}
        >
          <FooterIcon type="FaGithub" url="https://github.com/sakuraba-coder" />
          <FooterIcon type="FaTwitter" url="https://twitter.com/VBA02702548" />
          <FooterIcon type="SiZenn" url="https://zenn.dev/dollaga_saiore" />
        </Flex>
        &copy; 2022 by kaihatsu test.
      </Box>
    </>
  );
});
