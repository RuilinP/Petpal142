import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { scrollToTop } from '../../assets/js/scroll';

function PetList() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [breed, setBreed] = useState('Any');
  const [age, setAge] = useState('Any');

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: '123@email.com',
            password: '123',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }

        const tokenData = await response.json();
        setAccessToken(tokenData.access); // Store the access token in state
      } catch (error) {
        setError(error.message);
      }
    }

    fetchAccessToken();
  }, []);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await fetch('http://localhost:8000/pets/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const petData = await response.json();
        setPets(petData.results); // Set the 'results' array in the state
      } catch (error) {
        setError(error.message);
      }
    }

    if (accessToken) {
      fetchPets();
    }
  }, [accessToken]); // Trigger the effect when the access token changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  
  function createPetCard(pet) {
    return (
      <div className="card h-100 bg-white">
        <img src={`../assets/images/shelter-uploads/${pet.gallery.split(',')[0]}`} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title fw-bold text-center text-dark">{pet.name}</h5>
          <p className="card-text text-center">{pet.age} - {pet.breed}</p>
          <p className="card-text text-center">{pet.location}</p>
          <ul className="list-group">
            <li className="list-group-item border-0 bg-white text-center">
              <a href="#" className="btn btn-dark">Learn more</a>
            </li>
          </ul>
        </div>
        <div className="card-footer bg-info">
          <small className="text-white">Last updated 1 min ago</small>
        </div>
      </div>
    );
  }


  return (
    <div className='bg-secondary'>
      <header className="bg-primary"> 
                {/* Back to Top Button */}
                <div className="back-to-top-button">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => scrollToTop()}> &#x2191; </button>
                </div>

                <Container fluid className="p-0"> 
                    <Navbar expand="sm" bg="primary" variant="light">
                        <Container fluid> 
                            <Navbar.Brand href="/">
                                <img className="logo d-inline-block ms-0" src="../assets/images/logo.png" alt="PetPal Logo" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarNav" />
                            <Navbar.Collapse id="navbarNav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/">My Applications</Nav.Link>
                                    <Nav.Link href="/">Profile</Nav.Link>
                                </Nav>
                                
                                <Button variant="dark" size="sm" href="/" role="button" className="ms-0">Log out</Button>
                                <Button variant="dark" size="sm" href="/" role="button" className="ms-2 me-0 d-none d-md-block">&#x1F514;</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </header>
            <main>
            {/* <div className="col mt-3">
        <div className="form-group">
          <label htmlFor="orderbreed" className="form-label fw-bold">Breed:</label>
          <div className="dropdown">
            <button
              type="button"
              id="orderbreed"
              className="btn btn-dark dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-default-text={breed}
            >
              {breed}
            </button>
            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-option="Any">Any</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Abyssinian">Abyssinian</a></li>
                                <li><a className="dropdown-item" href="#" data-option="American Bob">American Bobtail</a></li>
                                <li><a className="dropdown-item" href="#" data-option="American curl">American curl</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#" data-option="Balinese">Balinese</a></li>
                            </ul>
          </div>
        </div>
        
      </div> */}

<div className="container mb-5">
    <div className="row row-cols-1 row-cols-md-3 g-4">
    {pets.map((pet, index) => (
      <div className="col" key={index} data-sort-value="Best match" data-last-updated="00000000000060">
        {createPetCard(pet)}
      </div>
    ))}
  </div>
  {pets.length === 0 && (
    <div className="no-result-message text-center mt-3" style={{ marginTop: '20px' }}>
      <h1 className="fw-bold text-center">No results found.</h1>
    </div>
  )}
  </div>

            </main>
      
      <footer>
                    <p>© 2023 Copyright: PetPal</p>
                </footer>
    </div>
  );
}

export default PetList;
