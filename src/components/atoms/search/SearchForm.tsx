import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState, useContext } from "react";
import { Store } from "../../../store/store";

type Props = {
  setSearchedPokemonData: (pokemonData: any) => void;
};

export const SearchForm: FC<Props> = (props: Props) => {
  const { setSearchedPokemonData } = props;
  const [inputValue, setInputValue] = useState("");
  const { globalState, setGlobalState } = useContext(Store);

  const _search = (value: string) => {
    console.log("globalState", globalState);
    if (value !== "") {
      const filteredList = globalState.all.filter(
        (pokemon: any) =>
          String(pokemon.name)
            ?.toUpperCase()
            .indexOf(value.trim().toUpperCase()) !== -1
      );
      setSearchedPokemonData(filteredList);
      return;
    }
    const firstPokemons = globalState.all.filter(
      (pokemon: any) => pokemon.id < 21
    );
    setSearchedPokemonData(firstPokemons);

    return;
  };

  useEffect(() => {
    _search(inputValue);
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Flex justifyContent="center">
        <Box m="2" justifyItems="center">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              style={{ borderRadius: "4px" }}
              placeholder="検索"
              width="auto"
              variant="outline"
              value={inputValue}
              onChange={handleChange}
            />
          </InputGroup>
        </Box>
      </Flex>
    </>
  );
};
