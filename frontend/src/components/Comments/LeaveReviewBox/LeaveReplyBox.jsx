import React, { useState } from 'react';
import { getAccessToken } from '../../../utils/auth';

function LeaveReplyBox({ shelterId, applicationId, commentId }) {

    const [review, setReview] = useState({
        message: '',
        termsAccepted: false
    });
    const accessToken = getAccessToken();
    // Adding state for success and error messages
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

      
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setReview(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        // Determine the endpoint based on the context
        let endpoint;
        if (shelterId) {
            endpoint = `/shelters/${shelterId}/comments/${commentId}/`;
        } else if (applicationId) {
            endpoint = `/applications/${applicationId}/comments/${commentId}/`;
        } else {
            console.error("No shelter or application ID provided");
            return;
        }

        // Prepare the data for submission
        const postData = {
            text: review.message,
        };

        // Perform the API call
        fetch(`http://localhost:8000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to post the reply');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful submission
            setSuccessMessage('Reply posted successfully!');
            setReview({
                rating: '5star',
                message: '',
                termsAccepted: false
            });
            const event = new Event('replyPosted');
            window.dispatchEvent(event);
        })
        .catch(error => {
            // Handle errors in submission
            setErrorMessage('Error posting the reply. Please try again.');
            console.error('Error posting the reply:', error);
        });
    };

    return (
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <h4 className="mb-0">Leave a Reply</h4>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" cols="30" rows="5" className="form-control" value={review.message} onChange={handleChange} required></textarea>
            </div>
            <div className="form-inline">
                <input type="checkbox" name="termsAccepted" id="checkbx" checked={review.termsAccepted} onChange={handleChange} required />
                <label htmlFor="checkbx" className="ms-1" >I have read and agree to the terms and conditions & privacy policy.</label>
            </div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
                <button type="submit" id="post" className="btn btn-dark">Post Reply</button>
            </div>
        </form>
    );
}

export default LeaveReplyBox;
