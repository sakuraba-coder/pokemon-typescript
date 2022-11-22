import { useDisclosure } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState, useContext } from "react";
import { useSelectedPokemon } from "../../hooks/useSelectedPokemon";
import { Store } from "../../store/store";
import { Pagination } from "../atoms/pagenation/Pagination";
import { SearchForm } from "../atoms/search/SearchForm";
import { getPokemons, getAllPokemon, loadPokemon } from "../utils/Pokemon";
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
    const data = await loadPokemon(res.results);
    setPokemonData(data);
  };

  const fetchPokemonAllData = useCallback(async (URL: string) => {
    setLoading(true);
    //全ポケモン取得
    const res: any = await getAllPokemon(URL);
    setGlobalState({ type: "SET_All", payload: { all: res } });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPokemonData(initialURL);
    fetchPokemonAllData(initialURL);
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
      <CardsArea
        pokemonData={pokemonData}
        onClickCard={onClickCard}
        loading={loading}
      />
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
