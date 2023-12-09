import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
// import dayjs from 'dayjs';
import { getAccessToken, login } from '../../utils/auth';
import propsType from 'prop-types';

const ApplicationCommentPage = (props) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const { applicationID } = props;
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // Create a new comment object
        const newCommentObj = {
            comment_id: comments.length + 1,
            text: newComment,
            created_at: (new Date()).toLocaleString(),
            rating: 4,
        };
        // Add the new comment to the comments list
        update(newCommentObj);
    };

    useEffect(() => {
        async function fetchCommentsData() {
            try {
                const response = await axios.get(`http://localhost:8000/applications/${applicationID}/comments/`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                setComments(response.data.results);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchCommentsData();
    }, []);

    async function update(data) {
        try {
            const response = await axios.post(`http://localhost:8000/applications/${applicationID}/comments/`, data, {
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`,
                },
            });
            console.log(response)
            window.location.reload()
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Comments</h2>
                    <ListGroup>
                        <Form onSubmit={handleCommentSubmit}>
                            <Form.Group controlId="new-comment">
                                <Form.Label>Add a comment:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={newComment}
                                    onChange={handleCommentChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <hr />
                        {comments.map((comment) => (
                            <CommentsCard comment={comment} setError={setError} />
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};
function CommentsCard(props) {
    const { comment, setError } = props;
    const [newReply, setNewReply] = useState('');
    const [rating, setrating] = useState('4')
    async function addReply(event) {
        event.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8000/applications/1/comments/${comment.id}/`, {
                text: newReply,
                rating: rating
            }, {
                headers: {
                    Authorization: `Basic ${btoa('123@email.com:123')}`,
                },
            });
            console.log(response)
            window.location.reload()
        } catch (error) {
            setError(error.message)
        }
    }
    
    return (<ListGroup.Item key={comment.id}>
        <p>{comment.text}</p>
        <p>By: {comment.author}</p>
        <p>Created at: {(new Date(comment.created_at).toLocaleString())}</p>
        <p>Rating: {comment.rating}</p>
        <Form onSubmit={addReply}>
            <Form.Group controlId={`reply-${comment.comment_id}`}>
                <Form.Control
                    type="text"
                    placeholder="Add a reply"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Reply
            </Button>
        </Form>
        <h5>Replies:</h5>
        <ListGroup>
            {comment.replies.map((reply) => (
                <ListGroup.Item key={reply.reply_id}>
                    <p>{reply.text}</p>
                    <p>By: {reply.author}</p>
                    <p>Created at: {(new Date(reply.created_at).toLocaleString())}</p>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </ListGroup.Item>)
}

ApplicationCommentPage.propsType = {
    applicationID: propsType.number.isRequired,
};

export default ApplicationCommentPage;
