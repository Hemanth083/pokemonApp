// App.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonSearch from './compponents/pokemonSearch';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [error, setError] = useState('');

  const handleLogin = () => {
    onLogin(); // Simply trigger the onLogin callback without any credential validation
  };

  return (
    <div style={{height:"100vh" ,width:"100vw"}} className="container d-flex  align-items-center  justify-content-center  flex-column  fs-1 ">
      <h2 className=' fs-1 '>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className='bg-dark-subtle'>
      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="container">
          <h2 className='border-bottom border-dark w-100 top-0 z-2 p-4 bg-dark-subtle'>Pokémon</h2>
          <PokemonSearch />
        </div>
      )}
    </div>
  );
};

export default App;
