import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  types: string[];
  description: string;
  imageUrl: string;
}

const PokemonSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [hoveredPokemon, setHoveredPokemon] = useState<Pokemon | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        setPokemons(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching Pokémon:', error);
      });
  }, []);

  const fetchPokemonDetails = async (url: string) => {
    try {
      const response = await axios.get(url);
      const { height, weight, abilities, types, sprites } = response.data;
      const description = ''; // Fetch description from another API or source
      const imageUrl = sprites.front_default;
      const pokemonDetails: PokemonDetails = {
        name: response.data.name,
        height,
        weight,
        abilities: abilities.map((ability: any) => ability.ability.name),
        types: types.map((type: any) => type.type.name),
        description,
        imageUrl,
      };
      setPokemonDetails(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePokemonHover = (pokemon: Pokemon) => {
    setHoveredPokemon(pokemon);
    fetchPokemonDetails(pokemon.url);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="row w-100">
      <div className="col-md-6 w-100">
        <input
          type="text"
          className="form-control p-3 mb-4 mt-4 w-50 mt-5"
          placeholder="Search Pokémon"
          value={search}
          onChange={handleSearchChange}
        />
        <ul style={{height:"100vh"}} className="list-group pokemon-list">
          {filteredPokemons.map(pokemon => (
            <li
              className="list-group-item w-50"
              key={pokemon.name}
              onClick={() => handlePokemonHover(pokemon)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractIdFromUrl(pokemon.url)}.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
              {pokemon.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6 position-fixed end-0 bg-dark-subtle  d-flex  align-items-start mt-5   justify-content-center  h-100">
        {pokemonDetails && (
          <div className=' text-white d-flex w-75   align-items-start  justify-content-center  flex-column '>
            <h3 className='text-black fs-1  border-bottom  border-dark  '>{pokemonDetails.name}</h3>
            <img src={pokemonDetails.imageUrl} alt={pokemonDetails.name}  className="pokemon-image text-center" />
            <p >Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
            <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
            <p>Types: {pokemonDetails.types.join(', ')}</p>
            <p>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, nobis perspiciatis eveniet, blanditiis, sed ea reprehenderit exercitationem necessitatibus ducimus dicta nostrum quidem doloremque ipsam possimus! Sequi non minus maiores ut.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const extractIdFromUrl = (url: string) => {
  const segments = url.split('/');
  return segments[segments.length - 2];
};

export default PokemonSearch;
