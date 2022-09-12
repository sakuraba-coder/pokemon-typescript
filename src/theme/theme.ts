import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // 公式サイトから色などを見ることができる
        backgroundColor: "gray.100",
        color: "gray.800"
      }
    }
  }
});
export default theme;
