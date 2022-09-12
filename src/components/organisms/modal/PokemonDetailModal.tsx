import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Stack,
  Flex,
  Box,
} from "@chakra-ui/react";

type Props = {
  pokemon?: any | null;
  isOpen: boolean;
  onClose: () => void;
};

export const PokemonDetailModal: FC<Props> = (props) => {
  const { pokemon, isOpen, onClose } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader m="auto">{pokemon?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box>
                <img
                  width="196px"
                  height="196px"
                  src={pokemon?.sprites.front_default}
                />
                <img
                  width="196px"
                  height="196px"
                  src={pokemon?.sprites.back_default}
                />
              </Box>
              <Stack>
                <Text>重さ：{pokemon?.weight}</Text>
                <Text>高さ：{pokemon?.height}</Text>
                <Text>アビリティ：{pokemon?.abilities[0].ability.name}</Text>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
