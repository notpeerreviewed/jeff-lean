import "../styles/pokemon.css";
import { useState } from "react";

const pokemons = [
  { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
  { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
  { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
  { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
  { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
  { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
  { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
  { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
  { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
  { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
  { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
  { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
  { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
  { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
  { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
  { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
  { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
  { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
  { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
  { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
];

// Sprite image URL pattern:
// `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

export default function PokemonApp() {
  const [showPokemon, setShowPokemon] = useState("");
  const [showAll, setShowAll] = useState(true);
  const uniqueTypes = [...new Set(pokemons.map((d) => d.type))];

  const updateVisibility = (x) => {
    setShowPokemon(x);
    showAll && showPokemon === x
      ? setShowAll(false)
      : showPokemon === x
        ? setShowAll(true)
        : setShowAll(false);
  };

  return (
    <>
      <div className="controls">
        {uniqueTypes.map((x, i) => (
          <button key={i} onClick={() => updateVisibility(x)}>
            {x}
          </button>
        ))}
      </div>

      <div className="grid-container">
        {pokemons.map((x, i) => (
          <div
            key={i}
            className="card"
            style={{
              opacity: showAll ? 1 : x.type === showPokemon ? 1 : 0.5,
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${x.id}.png`}
              alt={`Image of ${x.name} Pokemon.`}
            />
            <p>Name: {x.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
