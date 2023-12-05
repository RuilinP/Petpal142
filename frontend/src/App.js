import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetList from './components/pets';
import SinglePetInfo from './components/pet';
import Landing from './pages/landing';
import Login from './components/login'
import ShelterSignup from './components/ShelterSignup'
import SeekerSignup from './components/SeekerSignup';
import SearchPets from './components/Searchpets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pets/" element={<PetList />} />
        <Route path="/pets/:petId" element={<SinglePetInfo />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup-shelter" element={<ShelterSignup />} />
        <Route path="/signup-seeker" element={<SeekerSignup />} />
        <Route path="/search-pets" element={<SearchPets/>} />
        {/* ... other routes ... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
