import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";
import PokeCard from "./pokecard";
import PaginationControls from "./PaginationControls";

const Details = ({ abilities }) => {
  const [ability1, ability2] = abilities;
  return (
    <div className="pokemon_details">
      {ability1 && <h3>Ability 1 is: {ability1.ability.name}</h3>}
      {ability2 && <h3>Ability 2 is: {ability2.ability.name}</h3>}
    </div>
  );
};

const getPokemonUrl = pokemonName =>
  `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

const SpriteSelector = ({ sprites }) => {
  const [orientation, setOrientation] = useState("front");

  const toggleOrientation = () =>
    setOrientation(orientation === "front" ? "back" : "front");

  return (
    <section>
      <button
        style={{ position: "absolute", left: 55, top: 300 }}
        onClick={toggleOrientation}
      >
        &lt;
      </button>
      <img
        className="pokemon_selected"
        alt="pokemon_selected"
        src={
          orientation === "front" ? sprites.front_default : sprites.back_default
        }
      />
      <button
        style={{ position: "absolute", left: 325, top: 300 }}
        onClick={toggleOrientation}
      >
        &gt;
      </button>
    </section>
  );
};

class App extends React.Component {
  state = {
    image: "",
    abilities: [],
    loading: true,
    currentPokemon: null,
    page: 1
  };

  fetchPokemon = async pokemonName => {
    const { data } = await axios.get(getPokemonUrl(pokemonName));
    console.log(data);
    this.setState({ currentPokemon: data, loading: false });
  };

  componentDidMount = async () => {
    const listResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=5&offset=${(this.state.page -
        1) *
        5}`
    );
    console.log(listResponse.data);
    this.setState({ listData: listResponse.data.results });
    setTimeout(() => this.fetchPokemon(listResponse.data.results[0].name), 100);
  };

  handlePageChange = page => {
    //this needed the callback for the set state
    this.setState({ page }, async () => {
      const listResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=5&offset=${(this.state.page -
          1) *
          5}`
      );
      console.log(listResponse.data.results);
      this.setState({ listData: listResponse.data.results });
      this.fetchPokemon(listResponse.data.results[0].name);
    });
  };

  renderList = () => {
    return this.state.listData.map(item => {
      return (
        <div
          className="pokemon_card"
          onClick={() => this.fetchPokemon(item.name)}
        >
          <div className="char_img" />
          {item.name}
        </div>
      );
    });
  };

  render() {
    const { currentPokemon } = this.state;

    return (
      <div className="App">
        <section>
          <div className="pokedex">
            {currentPokemon ? (
              <>
                <section>
                  <SpriteSelector sprites={currentPokemon.sprites} />
                  <div>{currentPokemon.name.toUpperCase()}</div>
                </section>
                <Details abilities={currentPokemon.abilities} />
              </>
            ) : (
              <h2 className="pokemon_selected timeout">loading...</h2>
            )}
          </div>
        </section>

        <section className="selection-list">
          <div className="selection-list">
            {this.state.listData && this.renderList()}
          </div>
          <PaginationControls
            page={this.state.page}
            onClick={page => this.handlePageChange(page)}
          />
        </section>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
