import React, { useState } from 'react';
import { getAccessToken } from '../../../utils/auth';

function LeaveCommentBox({ shelterId, applicationId }) {

    const [review, setReview] = useState({
        rating: '5star',
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
            endpoint = `/shelters/${shelterId}/comments/`;
        } else if (applicationId) {
            endpoint = `/applications/${applicationId}/comments/`;
        } else {
            console.error("No shelter or application ID provided");
            return;
        }
        
        // Convert the rating string to an integer
        const ratingValue = parseInt(review.rating[0]);

        // Prepare the data for submission
        const postData = {
            rating: ratingValue,
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
                throw new Error('Failed to post the comment');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful submission
            setSuccessMessage('Comment posted successfully!');
            setReview({
                rating: '5star',
                message: '',
                termsAccepted: false
            });
            const event = new Event('commentPosted');
            window.dispatchEvent(event);
        })
        .catch(error => {
            // Handle errors in submission
            setErrorMessage('Error posting the comment. Please try again.');
            console.error('Error posting the comment:', error);
        });
    };

    return (
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <h4 className="mb-0">Leave a Comment</h4>
            <div className="form-group">
                <label htmlFor="rate" className="form-label">Ratings:</label>
                <select name="rating" id="rate" className="form-select w-100" value={review.rating} onChange={handleChange}>
                    <option value="1star">1 Star</option>
                    <option value="2star">2 Star</option>
                    <option value="3star">3 Star</option>
                    <option value="4star">4 Star</option>
                    <option value="5star">5 Star</option>
                </select>
            </div>
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
                <button type="submit" id="post" className="btn btn-dark">Post Comment</button>
            </div>
        </form>
    );
}

export default LeaveCommentBox;
