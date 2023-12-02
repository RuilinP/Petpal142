import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAccessToken, fetchSinglePet } from '../../ajax'; // Assuming ajax.js is in the same directory
import axios from 'axios'; 
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { scrollToTop } from '../../assets/js/scroll';


function SinglePetInfo() {
  const [petInfo, setPetInfo] = useState({});
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const { petId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await fetchAccessToken('ruilin@gmail.com', '123');
        setAccessToken(token);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPetData() {
      try {
        if (accessToken && petId) {
          const response = await axios.get(`http://localhost:8000/pets/${petId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          
          setPetInfo(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPetData();
  }, [accessToken, petId]);

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
            <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
			<div className="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
					aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
					aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
					aria-label="Slide 3"></button>
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
					aria-label="Slide 4"></button>
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img src="/assets/images/shelter-uploads/lemur1.jpeg" className="d-block" alt="..."/>
				</div>
				<div className="carousel-item">
					<img src="/assets/images/shelter-uploads/lemur2.jpeg" className="d-block" alt="..."/>
				</div>
				<div className="carousel-item">
					{/* <!-- Embed YouTube Video --> */}
					<div className="embed-responsive embed-responsive-16by9 video-container">
						<iframe className="embed-responsive-item" src="//player.vimeo.com/video/863395004"></iframe>
					</div>
				</div>
				<div className="carousel-item">
					{/* <!-- Embed YouTube Video --> */}
					<div className="embed-responsive embed-responsive-16by9 video-container">
						<iframe className="embed-responsive-item" src="//player.vimeo.com/video/863395014"></iframe>
					</div>
				</div>
			</div>
			<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
				data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
				data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
    <div className="container">
			<div>
				<h1 className="fs-1 mt-3 fw-bold text-center text-uppercase">{petInfo.name}</h1>
				<p className="text-center">{petInfo.breed}-{petInfo.location}</p>
			</div>
		</div>
		<div className="container">
			<hr className="border-2 border-top border-dark" />
			<output>{petInfo.age}-{petInfo.gender}-{petInfo.size}-{petInfo.color}</output>
			<hr className="border-2 border-top border-dark" />
		</div>

    <div className="container">
			<div className="row">
				<div className="col">
					<h1 className="fs-2  fw-bold text-lg-start">About</h1>
					<h1 className="fs-3 text-lg-start">Characteristics</h1>
					<p>{petInfo.characteristics}</p>
					<h1 className="fs-3 text-lg-start">Health</h1>
					<p>{petInfo.health}</p>
				</div>
				<div className="col">
					<div className="col d-flex justify-content-center">
						<div className="card bg-primary">
							<div className="card-body">
								<h5 className="card-title text-center text-white mb-3">Considering {petInfo.name} for adoption?</h5>

								<ul className="list-group">
									<li className="list-group-item border-0 bg-primary text-center">
										<a href="chat.html" className="btn btn-dark">Send an enquiry</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

    <div className="container">
			<div className="row">
				<div className="col">
					<h1 className="fs-2  fw-bold text-lg-start">{petInfo.name}'s Story</h1>

					<p>{petInfo.story}</p>
				</div>
				<div className="col">
					<div className="col d-flex justify-content-center">
						<div className="card bg-info my-5">
							<div className="card-body">
              <div
  className="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto"
  style={{ width: '150px', height: '150px' }}
>
  <img src="assets/images/chihuahua.png" height="100" alt="" loading="lazy" />
</div>

								<h5 className="card-title text-center text-white">Annex Cat Rescue</h5>
								<p className="card-text text-center text-white mb-4">Toronto, Ontario</p>
								<p className="card-text text-center text-white">
									<a href="mailto:adoption@annexcatrescue.ca" className="text-white">adoption@annexcatrescue.ca</a>
								</p>
								
								<p className="card-text text-center text-white mb-5">☎ (416) 410-3835</p>
								<ul className="list-group">
									<li className="list-group-item border-0 bg-info text-center">
										<a href="shelter-details.html" className="btn btn-dark">Shelter Page</a>
									</li>
									<li className="list-group-item border-0 bg-info text-center">
										<a href="adoption.html" className="btn btn-dark">Apply now</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

            </main>
      
      <footer>
                    <p>© 2023 Copyright: PetPal</p>
                </footer>
    </div>

    
  );
}

export default SinglePetInfo;