import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PetList from './components/pets';

function App() {
  return <BrowserRouter>
  <Routes>
  <Route path="/pets/" element={<PetList />} />
    {/* <Route path="/login/" exact element={<Login />} /> */}
    {/* <Route path="/" element={<Layout />}> */}
      {/* <Route index element={<Landing />} /> */}
      
      {/* <Route path="topic/:topicId/" element={<Topic />} /> */}
    {/* </Route> */}
  </Routes>
</BrowserRouter>;
}

export default App;
