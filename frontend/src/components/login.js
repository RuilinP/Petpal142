// Login.js
import React, { useState } from 'react';
import { Button, Navbar, Nav, Container, Form, Alert } from 'react-bootstrap';
import './login.css';
import Footer from './common/footer';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // To store any error messages
    const [isLogged, setIsLogged] = useState(false); // To check if the user is logged in

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Initialize error and logged in state
        setError('');
        setIsLogged(false);

        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the tokens in local storage or context
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                setIsLogged(true);
                // Redirect user or do something upon successful login
            } else {
                // Handle errors, e.g. display error message to the user
                setError(data.detail || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-page">
            <header className="bg-primary"> 
                {/* Back to Top Button */}
                <div className="back-to-top-button">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={scrollToTop}> &#x2191; </button>
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
                                    <Nav.Link onClick={ (event) => { event.preventDefault(); navigate(`/`) } }>Home</Nav.Link>
                                </Nav>
                                <Button variant="dark" size="sm" onClick={ (event) => { event.preventDefault(); navigate(`/login`) } } role="button" className="me-0">Login</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </header>

            <Container className="login-container">
                <Form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="login-heading">Login to PetPal</h2>
                    {/* Display error alert if there is an error */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {/* Display success message if logged in */}
                    {isLogged && <Alert variant="success">You are logged in!</Alert>}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </Container>

            <Footer />
        </div>
    );
}

export default Login;
