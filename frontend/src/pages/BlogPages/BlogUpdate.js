import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { getAccessToken, login } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

function BlogUpdate() {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const [blog, setBlog] = useState({
        id: 0,
        title: '',
        body: '',
        image: '',
        author: 0
    });
    const [newImageFile, setNewImageFile] = useState(null);
    const [error, setError] = useState(null);

    const updateBlog = async () => {
        try {
            let form_data = new FormData();
            form_data.append('title', blog.title);
            form_data.append('body', blog.body);
            if (newImageFile) {
                form_data.append('image', newImageFile, newImageFile.name);
            }

            const response = await axios.patch(
                `http://localhost:8000/blogs/${blogId}/`,
                form_data,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            ).then((response) => {
                console.log("hello");
                navigate(`/blogs/${blogId}`)
            });
        } catch(error) {
            const token = getAccessToken();
            const tokenUser = jwtDecode(token); 
            
            console.log(error);

            setError("Could not update blog.");
        }
    }

    useEffect(() => {
        async function fetchBlog() {
            login("shelter1@email.com", "123");
            try {
                const response = await axios.get(`http://localhost:8000/blogs/${blogId}`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                setBlog(response.data);
            } catch(error) {
                setError("Blog does not exist.");
            }
        }

        fetchBlog();
    }, []);

    return (
        <Container className="my-5">
        { error ? error :
            <Form>
                <h1>Update Your Blog</h1>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Blog title</Form.Label>
                    <Form.Control type="text" placeholder="Enter blog title" value={ blog.title } onChange={ (event) => setBlog({ ...blog, title: event.target.value }) } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Blog image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={ (event) => {
                        setBlog({ ...blog, image: URL.createObjectURL(event.target.files[0]) });
                        setNewImageFile(event.target.files[0]);
                    } } />
                    <img className="mt-3 mw-100" src={ blog.image } />
                </Form.Group>

                <Form.Group className="mb-3" controlId="body">
                    <Form.Label>Blog body</Form.Label>
                    <Form.Control as="textarea" rows="20" placeholder="Enter blog body" value={ blog.body } onChange={ (event) => setBlog({ ...blog, body: event.target.value }) } />
                </Form.Group>

                <Button type="submit" onClick={ () => { updateBlog() } }>Update Blog</Button>
            </Form>
        }
        </Container>
    );
}

export default BlogUpdate;
