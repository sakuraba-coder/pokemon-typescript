import { Box, Flex, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useSelectedPokemon } from "../../../hooks/useSelectedPokemon";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Pagination } from "../../atoms/pagenation/Pagination";
import { SearchForm } from "../../atoms/search/SearchForm";
import { getAllPokemon, getPokemon } from "../../utils/Pokemon";
import { Card } from "../Card/Card";
import { PokemonDetailModal } from "../modal/PokemonDetailModal";

export const Main: FC = memo(() => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<Array<any>>([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectPokemon, selectedPokemon } = useSelectedPokemon();
  const [pokemonCount, setPokemonCount] = useState(0);
  const [searched, setSearched] = useState(false);

  const fetchPokemonData = async (URL: string) => {
    setLoading(true);
    //すべてのポケモンデータを取得 ※20匹
    const res: any = await getAllPokemon(URL);

    //すべてのポケモンデータの総数を格納
    setPokemonCount(res.count);

    //各ポケモンの詳細データを取得
    loadPokemon(res.results);

    //次のページの情報を格納
    setNextURL(res.next);

    //前のページの情報を格納
    setPrevURL(res.previous);

    // console.log(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemonData(initialURL);
  }, []);

  const loadPokemon = useCallback(async (data: any) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon: any) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  }, []);

  const handleNextPage = async () => {
    setLoading(true);
    let data: any = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    // //前のページの情報を格納
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data: any = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const onClickCard = useCallback(
    (id: number) => {
      onSelectPokemon({ id, pokemonData, onOpen });
    },
    [pokemonData, onSelectPokemon, onOpen]
  );

  return (
    <>
      <SearchForm
        searched={searched}
        setSearched={setSearched}
        onClickCard={onClickCard}
      />

      {/* ページネーション */}

      {searched ? (
        <div></div>
      ) : (
        <>
          <Box>
            <Flex justifyContent="center" mb="16px">
              <Pagination
                pokemonCount={pokemonCount}
                fetchPokemonData={fetchPokemonData}
              />
            </Flex>
            <Wrap spacing="30px" justify="center">
              {pokemonData.map((pokemon) => {
                return (
                  <WrapItem mx="auto" key={pokemon.name}>
                    <Card
                      key={pokemon.name}
                      id={pokemon.id}
                      pokemon={pokemon}
                      onClick={onClickCard}
                    />
                  </WrapItem>
                );
              })}
            </Wrap>
            <Flex justifyContent="center" align="center" mb="16px">
              <PrimaryButton onClick={handlePrevPage}>前へ</PrimaryButton>
              <Pagination
                pokemonCount={pokemonCount}
                fetchPokemonData={fetchPokemonData}
              />
              <PrimaryButton onClick={handleNextPage}>次へ</PrimaryButton>
            </Flex>
          </Box>
        </>
      )}

      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
