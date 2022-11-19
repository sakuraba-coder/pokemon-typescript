import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

import "./App.css";
import { StoreProvider } from "./store/store";
import { Layout } from "./components/templates/Layout";
import { Main } from "./components/pages/Main";

export const App = () => {
  return (
    <StoreProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Main />
        </Layout>
      </ChakraProvider>
    </StoreProvider>
  );
};
