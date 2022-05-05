import { PokemonFetcher } from './features/pokemon/Pokemon-fetcher';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PokemonFetcher />
      </header>
    </div>
  );
}

export default App;
