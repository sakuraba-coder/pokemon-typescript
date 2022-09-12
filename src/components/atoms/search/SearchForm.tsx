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
import { resolve } from "path";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Card } from "../../organisms/Card/Card";

type MemberList = Array<any>;

type Props = {
  searched: boolean;
  setSearched: Dispatch<SetStateAction<boolean>>;
  onClickCard: (id: number) => void;
};

export const SearchForm: FC<Props> = (props: Props) => {
  const { searched, setSearched, onClickCard } = props;
  const [inputValue, setInputValue] = useState("");
  const [memberList, setMemberList] = useState<MemberList>(Array<any>);
  const [pokemonData, setPokemonData] = useState<MemberList>([]);

  const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i < 899; i++) {
      const url = `https:pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
      // const pokemons = results.map((data) => ({
      //   // name: data.name,
      //   id: data.id,
      //   // image: data.sprites["front_default"],
      //   // type: data.types.map((type: any) => type.type.name).join(", "),
      //   pokemon: data,
      // }));
      // setPokemons(pokemons);
      setPokemonData(results);
      console.log("fetchPokemon");
    });
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const search = useCallback(
    (value: string) => {
      if (value !== "") {
        const filteredList = pokemonData.filter((pokemon: any) =>
          Object.values(pokemon).some(
            (item: any) =>
              String(item)
                ?.toUpperCase()
                .indexOf(value.trim().toUpperCase()) !== -1
          )
        );
        setMemberList(filteredList);
        setSearched(true);
        return;
      }

      setMemberList(pokemonData);
      setSearched(false);
      return;
    },
    [setSearched, setMemberList]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    search(e.target.value);
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
