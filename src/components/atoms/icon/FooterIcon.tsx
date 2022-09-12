import { Box } from "@chakra-ui/react";
import React, { FC, memo } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { SiZenn } from "react-icons/si";

export const IconType = {
  FaGithub,
  FaTwitter,
  SiZenn,
};

type Props = {
  type: keyof typeof IconType;
  url: string;
};

export const FooterIcon: FC<Props> = memo((props) => {
  const { type, url } = props;

  const IconSvgFile = IconType[type];

  return (
    <Box mx={1} _hover={{ cursor: "pointer" }}>
      <a href={url}>
        <IconSvgFile />
      </a>
    </Box>
  );
});
