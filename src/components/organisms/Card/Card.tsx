import { ExternalLinkIcon } from "@chakra-ui/icons";

import {
  Box,
  Image,
  Stack,
  Text,
  extendTheme,
  keyframes,
} from "@chakra-ui/react";
import { memo, useCallback, FC } from "react";

type Props = {
  id: number;
  pokemon: any;
  onClick: (id: number) => void;
};

const theme = extendTheme({
  fonts: {
    // heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
    // body: `'Body Font Name', sans-serif`,
  },
});

const bigger = (scale: number) => keyframes`
  /* from {transform: scale(1.0, 1.0);} */
  to {transform: scale(${scale})}
`;

export const Card: FC<Props> = memo((props) => {
  const { id, pokemon, onClick } = props;
  const biggerAnimation = `${bigger(1.2)} 0.2s forwards`;

  const ShadowBox = (props: any) => (
    <Box shadow="md" borderRadius="10px" {...props} />
  );

  return (
    <>
      <ShadowBox w="260px" h="260px" bg="white" p={4}>
        <Stack textAlign="center">
          <Image
            borderRadius="full"
            boxSize="160px"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            m="auto"
            _hover={{
              cursor: "pointer",
              opacity: 0.8,
              animation: biggerAnimation,
            }}
            // 引数idを渡したonClickを返す
            onClick={() => onClick(id)}
          />
          <Text as="h2" fontSize={{ base: "md", md: "lg" }}>
            {pokemon.name}
          </Text>
        </Stack>
      </ShadowBox>
    </>
  );
});
