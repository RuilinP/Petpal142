// SearchPets.js
import React, { useState } from 'react';
import { Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';

function SearchPets() {
    const [searchParams, setSearchParams] = useState({
        specie: '',
        breed: '',
        age: '',
        size: '',
        color: '',
        gender: '',
        location: '',
        health: '',
        characteristics: '',
        story: '',
        status: '',
        shelter: ''
    });
    const [pets, setPets] = useState([]);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        // Construct query string
        const queryParams = new URLSearchParams();
        for (const key of Object.keys(searchParams)) {
            if (searchParams[key]) {
                queryParams.append(key, searchParams[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:8000/pets/?' + new URLSearchParams(formData), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 假设您的 token 存储在 localStorage 中
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPets(data); // Assuming the response is an array of pets
        } catch (error) {
            setError('Failed to load pets. Please try again.');
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <Card className="p-4">
                        <h2 className="text-center mb-4">Search for Pets</h2>
                        <Form onSubmit={handleSubmit}>
                            {/* You'll create form controls for each search parameter here */}
                            {/* Example for species input: */}
                            <Form.Group className="mb-3" controlId="formSpecie">
                                <Form.Label>Specie</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter specie"
                                    name="specie"
                                    value={searchParams.specie}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            
                            {/* Add form groups for other parameters similarly... */}
                            
                            {/* Submit button */}
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </Form>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                {/* Display the search results */}
                {pets.map(pet => (
                    <Col key={pet.id} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={pet.gallery[0]} />
                            <Card.Body>
                                <Card.Title>{pet.name}</Card.Title>
                                {/* Display other pet details */}
                                <Card.Text>{pet.story}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default SearchPets;
