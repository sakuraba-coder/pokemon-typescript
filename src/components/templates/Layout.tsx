import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import { Footer } from "../organisms/layout/Footer";
import { Header } from "../organisms/layout/Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Box textAlign="center" minWidth="100px">
      <Header />
      {children}
      <Footer />
    </Box>
  );
};
