import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { getAccessToken } from '../../utils/auth';

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
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        updateBlog();
    };

    const updateBlog = async () => {
        try {
            let form_data = new FormData();
            form_data.append('title', blog.title);
            form_data.append('body', blog.body);
            if (newImageFile) {
                form_data.append('image', newImageFile, newImageFile.name);
            }

            await axios.patch(
                `http://localhost:8000/blogs/${blogId}/`,
                form_data,
                {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            ).then((response) => {
                navigate(`/blogs/${blogId}`)
            });
        } catch(error) {
        }
    }

    useEffect(() => {
        async function fetchBlog() {
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
        <Container>
            { error ? error :
            <Form noValidate validated={validated} onSubmit={ (event) => handleSubmit(event) }>
                <h1 className="mb-3">Update Your Blog</h1>
    
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Blog title</Form.Label>
                    <Form.Control required type="text" placeholder="Enter blog title" value={ blog.title } onChange={ (event) => setBlog({ ...blog, title: event.target.value }) } />
                    <Form.Control.Feedback type="invalid">
                        Please enter the blog's title.
                    </Form.Control.Feedback>
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
                    <Form.Control required as="textarea" rows="20" placeholder="Enter blog body" value={ blog.body } onChange={ (event) => setBlog({ ...blog, body: event.target.value }) } />
                    <Form.Control.Feedback type="invalid">
                        Please enter the blog's body.
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Button type="submit">Update Blog</Button>
            </Form>
            }
        </Container>
    );
}

export default BlogUpdate;
