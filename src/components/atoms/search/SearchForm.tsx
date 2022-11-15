import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import { Store } from "../../../store/store";
import { Card } from "../../organisms/Card/Card";

type MemberList = Array<any>;

type Props = {
  searched: boolean;
  setSearched: Dispatch<SetStateAction<boolean>>;
  onClickCard: (id: number) => void;
  setSearchedPokemonData: (pokemonData: any) => void;
};

export const SearchForm: FC<Props> = (props: Props) => {
  const { searched, setSearched, onClickCard, setSearchedPokemonData } = props;
  const [inputValue, setInputValue] = useState("");
  const [memberList, setMemberList] = useState<MemberList>(Array<any>);
  const [pokemonData, setPokemonData] = useState<MemberList>([]);
  const { globalState, setGlobalState } = useContext(Store);

  const fetchPokemon = async () => {
    const promises = [];
    for (let i = 1; i < 825; i++) {
      const url = `https:pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
    await Promise.all(promises).then((results) => {
      setGlobalState({ type: "SET_All", payload: { all: results } });
    });
    console.log("globalState", globalState);
  };

  useEffect(() => {
    fetchPokemon();
    console.log("globalState2", globalState);
  }, []);

  const search = (value: string) => {
    if (value !== "") {
      const filteredList = pokemonData.filter((pokemon: any) =>
        Object.values(pokemon).some(
          (item: any) =>
            String(item)?.toUpperCase().indexOf(value.trim().toUpperCase()) !==
            -1
        )
      );
      setMemberList(filteredList);
      setSearched(true);
      return;
    }
    setMemberList(pokemonData);
    setSearched(false);
    return;
  };

  const _search = (value: string) => {
    if (value !== "") {
      const filteredList = globalState.all.filter(
        (pokemon: any) =>
          // Object.values(pokemon).some(
          //   (item: any) =>
          //     String(item)?.toUpperCase().indexOf(value.trim().toUpperCase()) !==
          //     -1
          // )
          String(pokemon.name)
            ?.toUpperCase()
            .indexOf(value.trim().toUpperCase()) !== -1
      );
      setMemberList(filteredList);
      setSearchedPokemonData(filteredList);
      setSearched(true);
      return;
    }
    const firstPokemons = globalState.all.filter(
      (pokemon: any) => pokemon.id < 21
    );
    setSearchedPokemonData(firstPokemons);

    setSearched(false);
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

      {searched ? (
        <Box mb="5">
          <Wrap spacing="30px" justify="center">
            {memberList.map((pokemon) => {
              return (
                <WrapItem mx="auto" key={pokemon.id}>
                  {/* <p>{pokemon.name}</p> */}
                  <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    pokemon={pokemon}
                    onClick={onClickCard}
                  />
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      ) : (
        <div></div>
      )}
    </>
  );
};
