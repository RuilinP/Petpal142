import React, { useState, useEffect } from 'react';
import { Header, Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getAccessToken, login } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

function Blogs() {
    const navigate = useNavigate();
    const [isShelter, setIsShelter] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {
            login("shelter1@email.com", "123");
            const token = getAccessToken();
            const tokenUser = jwtDecode(token); 

            try {
                await axios.get(`http://localhost:8000/accounts/shelters/${tokenUser.user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsShelter(true);
            } catch(error) {
                setIsShelter(false);
            }

            try {
                const response = await axios.get(`http://localhost:8000/blogs/`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                setBlogs(response.data.results);
                setError("");
            } catch(error) {
                setError("No blogs.");
            }
        }

        fetchBlogs();
    }, []);

    return (
        <Container className="my-5">
            <h1>Blogs</h1>

            { isShelter ? <Button className="mt-4" onClick={ () => { navigate(`/blogs/create/`)} }>Create a Blog</Button> : '' }

            <Row className="mt-4">
                { error }
                {blogs.map(blog => (
                    <Col key={blog.id} md={6} lg={4} className="mb-4">
                        <Card onClick={ () => { navigate(`/blogs/${blog.id}`) } }>
                            <Card.Img variant="top" src={blog.image} />
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Blogs;
