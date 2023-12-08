import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { getAccessToken, login } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

function BlogCreate() {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        id: 0,
        title: '',
        body: '',
        image: '',
        author: 0
    });
    const [newImageFile, setNewImageFile] = useState(null);
    const [error, setError] = useState(null);

    const createBlog = async () => {
        login("shelter1@email.com", "123");
        const token = getAccessToken();
        const tokenUser = jwtDecode(token);
        blog.author = tokenUser.user_id;

        try {
            let form_data = new FormData();
            form_data.append('title', blog.title);
            form_data.append('body', blog.body);
            form_data.append('image', newImageFile, newImageFile.name);
            form_data.append('author', blog.author);

            const response = await axios.post(
                `http://localhost:8000/blogs/`,
                form_data,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            ).then((response) => {
                navigate(`/blogs/`);
            });
        } catch(error) {
            setError("Could not create blog.");
        }
    }

    return (
        <Container className="my-5">
        { error ? error :
            <Form>
                <h1>Create a Blog</h1>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Blog title</Form.Label>
                    <Form.Control required type="text" placeholder="Enter blog title" value={ blog.title } onChange={ (event) => setBlog({ ...blog, title: event.target.value }) } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Blog image</Form.Label>
                    <Form.Control required type="file" accept="image/*" onChange={ (event) => {
                        setBlog({ ...blog, image: URL.createObjectURL(event.target.files[0]) });
                        setNewImageFile(event.target.files[0]);
                    } } />
                    <img className="mt-3 mw-100" src={ blog.image } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Blog body</Form.Label>
                    <Form.Control required as="textarea" rows="20" placeholder="Enter blog body" value={ blog.body } onChange={ (event) => setBlog({ ...blog, body: event.target.value }) } />
                </Form.Group>

                <Button type="submit" onClick={ () => { createBlog() } }>Create Blog</Button>
            </Form>
        }
        </Container>
    );
}

export default BlogCreate;
