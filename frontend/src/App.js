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
import { UserProvider } from './contexts/UserContext';
import ShelterCommentPage from './pages/CommentPages/ShelterCommentPage';
import ShelterCommentDetails from './pages/CommentPages/ShelterCommentDetailsPage';
import NotFound from './pages/404';


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pets/" element={<PetList />} />
        <Route path="/pets/:petId" element={<SinglePetInfo />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup-shelter" element={<ShelterSignup />} />
        <Route path="/signup-seeker" element={<SeekerSignup />} />
        <Route path="/search-pets" element={<SearchPets/>} />
        <Route path="/shelters/:shelterId/comments/" element={<ShelterCommentPage/>} />
        <Route path="/shelters/:shelterId/comments/:commentId" element={<ShelterCommentDetails/>} />
        <Route path="/404/" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
