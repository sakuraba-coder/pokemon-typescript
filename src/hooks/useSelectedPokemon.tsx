import React, { useCallback, useState } from "react";

type Props = {
  id: number;
  pokemonData: Array<any>;
  onOpen: () => void;
};

export const useSelectedPokemon = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const onSelectPokemon = useCallback((props: Props) => {
    const { id, pokemonData, onOpen } = props;
    const targetPokemon = pokemonData.find((pokemon) => pokemon.id === id);
    setSelectedPokemon(targetPokemon!);
    onOpen();
  }, []);

  return { onSelectPokemon, selectedPokemon };
};
