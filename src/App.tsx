import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "./theme/theme";

import "./App.css";
import { Zukan } from "./components/pages/Zukan";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" minWidth="100px">
        <Zukan />
      </Box>
    </ChakraProvider>
  );
};
