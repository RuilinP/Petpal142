import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { scrollToTop } from '../../assets/js/scroll';

function PetList() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');

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
            <div className="container">
            <div className="row mb-3 p-3">
                <div className="col mt-3">
                    <div className="form-group">
                        <label for="orderbreed" className="form-label fw-bold">Breed:</label>
                        <div className="dropdown">
                            <button type="button" id="orderbreed" className="btn btn-dark dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false" data-default-text="Any">
                                Any
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
                </div>
    
                <div className="col mt-3">
                    <div className="form-group">
                        <label for="orderage" className="form-label fw-bold">Age:</label>
                        <div className="dropdown">
                            <button type="button" id="orderage" className="btn btn-dark dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false"  data-default-text="Any">
                                Any
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-option="Any">Any</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Kitten">Kitten</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Young">Young</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Adult">Adult</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Senior">Senior</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col mt-3">
                    <div className="form-group">
                        <label for="ordersize" className="form-label fw-bold">Size:</label>
                        <div className="dropdown">
                            <button type="button" id="ordersize" className="btn btn-dark dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false"  data-default-text="Any">
                                Any
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-option="Any">Any</a></li>
                                <li><a className="dropdown-item" href="#" data-option="S">Small (0-6 lbs)</a></li>
                                <li><a className="dropdown-item" href="#" data-option="M">Medium (7-11 lbs)</a></li>
                                <li><a className="dropdown-item" href="#" data-option="L">Large (12-16 lbs)</a></li>
                                <li><a className="dropdown-item" href="#" data-option="XL">Extra Large (&gt;=17 lbs)</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col mt-3">
                    <div className="form-group">
                        <label for="ordergender" className="form-label fw-bold">Gender:</label>
                        <div className="dropdown">
                            <button type="button" id="ordergender" className="btn btn-dark dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false"  data-default-text="Any">
                                Any
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-option="Any">Any</a></li>
                                <li><a className="dropdown-item" href="#" data-option="♂">Male</a></li>
                                <li><a className="dropdown-item" href="#" data-option="♀">Female</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col mt-3">
                    <div className="form-group">
                        <label for="ordergender" className="form-label fw-bold">Color:</label>
                        <div className="dropdown">
                            <button type="button" id="ordergender" className="btn btn-dark dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false"  data-default-text="Any">
                                Any
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-option="Grey">Any</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Grey">Grey</a></li>
                                <li><a className="dropdown-item" href="#" data-option="White">White</a></li>
                                <li><a className="dropdown-item" href="#" data-option="G&W">Grey&White</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col mt-3">
                    <div className="form-group">
                        <label for="ordergender" className="form-label fw-bold">Shelter:</label>
                        <div className="dropdown">
                            <button type="button" id="ordergender" className="btn btn-dark dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false" 
                                 data-default-text="Any">
                                Any
                            </button>
                            <ul className="dropdown-menu" id="dropdown1">
                                <li> <label for="searchshelter" className="form-label mx-2">🔍 Search by shelter name</label>
                                    <input type="text" className="form-control mx-2" id="searchshelter"
                                        aria-label="Text input with dropdown button" placeholder="Input shelter name here"/>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#" data-option="Any">Any</a></li>
                                <li><a className="dropdown-item" href="#" data-option="ACT">Annex Cat Rescue</a></li>
                                <li><a className="dropdown-item" href="#" data-option="AAS">Alberta Animal Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
    
                <div className="col offset-md-4 mt-3">
                    <div className="form-group">
                        <label for="ordergender" className="form-label fw-bold">Sort by:</label>
                        <div className="dropdown">
    
                            <button type="button" id="sortby" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false" 
                                data-default-text="Best Match">
                                Best match
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-option="Best match">Best match</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Newest">Newest addition</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Oldest">Oldest addition</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Nearest">Nearest</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Furthest">Furthest</a></li>
                                <li><a className="dropdown-item" href="#" data-option="A-Z">Name A-Z</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Z-A">Name Z-A</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Youngest">Young to Old</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Oldest">Old to Young</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Smallest">Small to Large</a></li>
                                <li><a className="dropdown-item" href="#" data-option="Largest">Large to Small</a></li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>


            <div id="filteredPetCards" style={{ display: 'none' }}></div>

        <div className="container mb-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col" data-sort-value="Best match" data-last-updated="00000000000060">
                    <div className="card h-100 bg-white">
                        <img src="assets/images/shelter-uploads/cat1.jpeg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-center text-dark">RINGO</h5>
                            <p className="card-text text-center"> Senior- Domestic Short Hair </p>
                            <p className="card-text text-center"> 2km away </p>
                            <ul className="list-group">
                                <li className="list-group-item border-0 bg-white text-center">
                                    <a href="#" className="btn btn-dark">Learn more</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer bg-info">
                            <small className="text-white">Last updated 1 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="col" data-sort-value="Best match" data-last-updated="00000000000180">
                    <div className="card h-100 bg-white">
                        <img src="assets/images/shelter-uploads/cat2.jpeg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-center text-dark">WERTHER</h5>
                            <p className="card-text text-center"> Adult- Domestic Short Hair </p>
                            <p className="card-text text-center"> 2km away </p>
                            <ul className="list-group">
                                <li className="list-group-item border-0 bg-white text-center">
                                    <a href="#" className="btn btn-dark">Learn more</a>
                                </li>

                            </ul>
                        </div>
                        <div className="card-footer bg-info">
                            <small className="text-white">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
                <div className="col" data-sort-value="Best match" data-last-updated="00000000000120">
                    <div className="card h-100 bg-white">
                        <img src="assets/images/shelter-uploads/cat3.jpeg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-center text-dark">LEMUR</h5>
                            <p className="card-text text-center"> Senior- Domestic Short Hair </p>
                            <p className="card-text text-center"> 2km away </p>
                            <ul className="list-group">
                                <li className="list-group-item border-0 bg-white text-center">
                                    <a href="pet-detail.html" className="btn btn-dark">Learn more</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer bg-info">
                            <small className="text-white">Last updated 2 mins ago</small>
                        </div>
                    </div>
                </div>

                <div className="col" data-sort-value="Best match" data-last-updated="00000000000060">
                    <div className="card h-100 bg-white">
                        <img src="assets/images/shelter-uploads/cat4.jpeg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-center text-dark">BAGEL</h5>
                            <p className="card-text text-center"> Adult- Domestic Short Hair </p>
                            <p className="card-text text-center"> 2km away </p>
                            <ul className="list-group">
                                <li className="list-group-item border-0 bg-white text-center">
                                    <a href="#" className="btn btn-dark">Learn more</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer bg-info">
                            <small className="text-white">Last updated 1 mins ago</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="no-result-message text-center mt-3" style={{ marginTop: '20px' }}>
                <h1 className="fw-bold text-center">No results found.</h1>
            </div>
        </div>
            </main>
      
      <footer>
                    <p>© 2023 Copyright: PetPal</p>
                </footer>
    </div>
  );
}

export default PetList;
