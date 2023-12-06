import React, { useEffect, useState } from 'react';

const CommentAvatar = ({ comment }) => {
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    const fetchProfileImage = async (authorId, author_is_seeker) => {
        let response;
        let author_type;

        if (author_is_seeker) {
            author_type = 'seekers'
        } else {author_type = 'shelters'}
    
        response = await fetch(`http://localhost:8000/accounts/${author_type}/${authorId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    
        // Check if the response from either endpoint is successful
        if (response.ok) {
            const data = await response.json();
            return data.avatar; // Return the avatar URL
        }
    
        // If both fetches fail
        console.error('Failed to fetch profile image from both endpoints');
        return null;
    };

    useEffect(() => {
        if (comment !== 'undefined') {
            fetchProfileImage(comment.author_id_record, comment.author_is_seeker)
                .then(url => setProfileImageUrl(url))
                .catch(error => console.error('Error fetching image:', error));
        }

    }, [comment.author_id_record]);

    return (
            <img className="review-page-pfp rounded-circle shadow-1-strong me-3" 
                 src={profileImageUrl || 'default_avatar_url'}
                 alt="avatar" />
    );
};

export default CommentAvatar;