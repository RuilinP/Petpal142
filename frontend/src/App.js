import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetList from './components/pets';
import SinglePetInfo from './components/pet';
import Landing from './pages/landing';
import Login from './components/login'
import ShelterSignup from './components/ShelterSignup'
import SeekerSignup from './components/SeekerSignup';
import SearchPets from './components/Searchpets';
import ShelterCommentPage from './pages/CommentPages/ShelterCommentPage';
import ShelterCommentDetails from './pages/CommentPages/ShelterCommentDetailsPage';
import NotFound from './pages/404';
import CreatePet from './components/pet/create/CreatePet';
import PetUpdate from './components/pets/update';
import AdoptionApplicationForm from './components/pet/adoption/AdoptionApplicationForm';
import ApplicationList from './components/pet/adoption/ApplicationList';
import Application from './components/pet/adoption/Application';
import ApplicationCommentPage from './pages/CommentPages/ApplicationCommentPage';
import ApplicationCommentDetails from './pages/CommentPages/ApplicationCommentDetailsPage';
import { NotificationProvider } from './contexts/NotifContexts';
import NotificationPage from './pages/NotificationPages/NotificationPage';
import BlogsPage from './pages/BlogPages/Blogs';
import BlogPage from './pages/BlogPages/Blog';
import BlogUpdatePage from './pages/BlogPages/BlogUpdate';
import BlogCreatePage from './pages/BlogPages/BlogCreate';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pets/" element={<PetList />} />
          <Route path="/pets/:petId" element={<SinglePetInfo />} />
          <Route path="/login/" element={<Login />} />
          {/* ... other routes ... */}
          <Route path="/pet/create" element={<CreatePet />} />
          <Route path="/signup-shelter" element={<ShelterSignup />} />
          <Route path="/signup-seeker" element={<SeekerSignup />} />
          <Route path="/search-pets" element={<SearchPets />} />
          <Route path="/pet/update/:petId" element={<PetUpdate />} />
          <Route path="/pet/adoption" element={<AdoptionApplicationForm />} />
          <Route path="/pet/application-list" element={<ApplicationList />} />
          <Route path="/pet/application" element={<Application petId={1} />} />
          <Route path="/shelters/:shelterId/comments/" element={<ShelterCommentPage/>} />
          <Route path="/shelters/:shelterId/comments/:commentId" element={<ShelterCommentDetails/>} />
          <Route path="/applications/:applicationId/comments/" element={<ApplicationCommentPage/>} />
          <Route path="/applications/:applicationId/comments/:commentId" element={<ApplicationCommentDetails/>} />
          <Route path="/notifications/" element={<NotificationPage />} />
          <Route path="/blogs/update/:blogId" element={<BlogUpdatePage />} />
          <Route path="/blogs/create/" element={<BlogCreatePage />} />
          <Route path="/blogs/:blogId" element={<BlogPage />} />
          <Route path="/blogs/" element={<BlogsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
