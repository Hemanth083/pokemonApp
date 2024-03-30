import React from 'react';

interface PokemonDetailsProps {
  pokemonDetails: {
    name: string;
    imageUrl: string;
    height: number;
    weight: number;
    abilities: string[];
    types: string[];
  } | null;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemonDetails }) => {
  return (
    <div className="col-md-6 position-fixed end-0 bg-dark-subtle d-flex align-items-start mt-5 justify-content-center h-100">
      {pokemonDetails && (
        <div className='text-white d-flex w-75 align-items-start justify-content-center flex-column'>
          <h3 className='text-black fs-1 border-bottom border-dark'>{pokemonDetails.name}</h3>
          <img src={pokemonDetails.imageUrl} alt={pokemonDetails.name} className="pokemon-image text-center" />
          <p>Height: {pokemonDetails.height}</p>
          <p>Weight: {pokemonDetails.weight}</p>
          <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
          <p>Types: {pokemonDetails.types.join(', ')}</p>
          <p>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, nobis perspiciatis eveniet, blanditiis, sed ea reprehenderit exercitationem necessitatibus ducimus dicta nostrum quidem doloremque ipsam possimus! Sequi non minus maiores ut.</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
