import React, { useState } from 'react';
import { Button, Form, Container, Alert, Row, Col, Card } from 'react-bootstrap';
import './ShelterSignup.css';

function SeekerSignup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        organization: '',
        phone_number: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        mission_statement: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        console.log(formData);

        try {
            const response = await fetch('http://localhost:8000/accounts/seekers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={8} md={10} sm={12}>
                    <Card className="p-4 shadow">
                        <h1 className="pb-3 text-center text-primary">Seeker Registration</h1>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">Seeker registered successfully!</Alert>}

            <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Organization Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Organization</Form.Label>
                    <Form.Control
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Phone Number Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Address Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Country Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* State Field */}
                <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* City Field */}
                <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Zip Code Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Mission Statement Field */}
                <Form.Group className="mb-3">
                    <Form.Label>Mission Statement</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="mission_statement"
                        value={formData.mission_statement}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Register Button */}
                <Button variant="dark" type="submit">
                    Register
                </Button>
            </Form>
            </Card>
                </Col>
            </Row> 
        </Container>
    );
}

export default SeekerSignup;
