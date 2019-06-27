import React from "react";

// fetch the pokemon here
// have a loading state that starts out as true, then switches to false after the pokémon is loaded into state

const PokeCard = props => {
  return (
    <div className="pokemon_card">
      <div className="char_img pichachu">some</div>
      <img
        src="https://fontmeme.com/permalink/190506/1c7b800068bd56a10f652d3975a2e4d8.png"
        alt="pokemon-font"
        border="0"
        height={70}
      />
    </div>
  );
};
export default PokeCard;
