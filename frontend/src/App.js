import logo from './logo.svg';
import './App.css';
import PetList from './components/pets';

function App() {
  return (
    <div className="App">
      <header>
        <h1>PetPal</h1>
      </header>
      <main>
        <PetList />
      </main>
    </div>
  );
}

export default App;
