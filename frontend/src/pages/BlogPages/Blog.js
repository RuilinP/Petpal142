import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { getAccessToken, login } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

function Blog() {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const [isAuthor, setIsAuthor] = useState(false);
    const [blog, setBlog] = useState({
        id: 0,
        title: '',
        body: '',
        image: '',
        author: 0
    });
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);

    const deleteBlog = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/blogs/${blogId}/`, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });

            navigate(`/blogs/`);
        } catch(error) {
            setError2("Could not delete blog.");
        }
    }

    useEffect(() => {
        async function fetchBlog() {
            login("shelter1@email.com", "123");

            try {
                const response = await axios.get(`http://localhost:8000/blogs/${blogId}/`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                setBlog(response.data);
                setError("");
            } catch(error) {
                setError("Blog does not exist.");
            }
        }

        fetchBlog();
    }, []);

    useEffect(() => {
        const token = getAccessToken();
        const tokenUser = jwtDecode(token); 
        setIsAuthor(blog.author == tokenUser.user_id);
    }, [blog])

    return (
        <Container className="my-5">
            { isAuthor ?
                <div>
                    <Button onClick={ () => { navigate(`/blogs/update/${blog.id}`) } }>Update Blog</Button>
                    <Button onClick={ () => { deleteBlog() } }>Delete Blog</Button>
                </div>
            : '' }

            { error2 ? <Alert>{ error2 }</Alert> : '' }

            <h1>{ error ? error : blog.title }</h1>
            <img className="mw-100" src={ blog.image } />
            <div>
                <p>{ blog.body }</p>
            </div>
        </Container>
    );
}

export default Blog;
