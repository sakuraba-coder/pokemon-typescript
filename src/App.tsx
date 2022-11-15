import { Box, ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import theme from "./theme/theme";

import "./App.css";
import { Zukan } from "./components/pages/Zukan";
import { StoreProvider } from "./store/store";

export const App = () => {
  return (
    <StoreProvider>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" minWidth="100px">
          <Zukan />
        </Box>
      </ChakraProvider>
    </StoreProvider>
  );
};
