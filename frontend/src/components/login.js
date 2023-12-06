// Login.js
import React, { useState } from 'react';
import { Button, Form, Container, Navbar, Nav, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // To store any error messages
    const [isLogged, setIsLogged] = useState(false); // To check if the user is logged in

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
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
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
            <Navbar bg="primary" variant="dark" expand="lg" className="login-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="../assets/images/logo.png"
                            className="d-inline-block align-top"
                            alt="PetPal Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

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

            <footer className="login-footer">
                <Container>
                    <span>© 2023 Copyright: PetPal</span>
                </Container>
            </footer>
        </div>
    );
}

export default Login;
