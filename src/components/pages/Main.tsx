import { useDisclosure, Spinner } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState, useContext } from "react";
import { useSelectedPokemon } from "../../hooks/useSelectedPokemon";
import { Store } from "../../store/store";
import { Pagination } from "../atoms/pagenation/Pagination";
import { SearchForm } from "../atoms/search/SearchForm";
import { getPokemons, getPokemon, getAllPokemon } from "../utils/Pokemon";
import { PokemonDetailModal } from "../organisms/modal/PokemonDetailModal";
import { CardsArea } from "../organisms/center/CardsArea";

export const Main: FC = memo(() => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState<Array<any>>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectPokemon, selectedPokemon } = useSelectedPokemon();
  const [pokemonCount, setPokemonCount] = useState(0);
  const { globalState, setGlobalState } = useContext(Store);

  const fetchPokemonData = async (URL: string) => {
    //１ページ目のポケモンデータを取得 ※20匹
    const res: any = await getPokemons(URL);
    //すべてのポケモンデータの総数を格納
    setPokemonCount(res.count);
    //各ポケモンの詳細データを取得
    loadPokemon(res.results);
  };

  const setPokemonAllData = useCallback(async (URL: string) => {
    //全ポケモン取得
    // const promises = [];
    // let i = 1;
    // while (true) {
    //   const url = `${URL}/${i}`;
    //   const response = await fetch(url);
    //   if (response.ok) {
    //     promises.push(response.json());
    //   } else {
    //     break;
    //   }
    //   i++;
    // }

    //全ポケモンをGlobalStateに1つずつ登録
    // await Promise.all(promises).then((results) => {
    //   setGlobalState({ type: "SET_All", payload: { all: results } });
    //   setLoading(false);
    // });

    // const res: any = await Promise.all(promises);
    const res: any = await getAllPokemon(URL);

    // .then((results) => {
    //   return results;
    // });

    setGlobalState({ type: "SET_All", payload: { all: res } });
    setLoading(false);
  }, []);

  const loadPokemon = useCallback(async (data: any) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon: any) => {
        let pokemonRecord = getPokemons(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPokemonData(initialURL);
    setPokemonAllData(initialURL);
  }, []);

  const onClickCard = useCallback(
    (id: number) => {
      onSelectPokemon({ id, pokemonData, onOpen });
    },
    [pokemonData, onSelectPokemon, onOpen]
  );

  return (
    <>
      {/* 検索 */}
      <SearchForm setSearchedPokemonData={setPokemonData} />
      {/* ページネーション */}
      <Pagination
        pokemonCount={pokemonCount}
        fetchPokemonData={fetchPokemonData}
      />
      {/* ポケモン表示エリア */}

      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <CardsArea pokemonData={pokemonData} onClickCard={onClickCard} />
      )}
      {/* ページネーション */}
      <Pagination
        pokemonCount={pokemonCount}
        fetchPokemonData={fetchPokemonData}
      />
      {/* モーダル */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
