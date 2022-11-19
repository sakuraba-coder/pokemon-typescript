import { Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { Card } from "../../molecules/Card/Card";

type Props = {
  pokemonData: any[];
  onClickCard: (id: number) => void;
};

export const CardsArea: FC<Props> = (props: any) => {
  const { pokemonData, onClickCard } = props;

  return (
    <>
      <Wrap spacing="30px" justify="center">
        {pokemonData.map((pokemon: any) => {
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
    </>
  );
};
