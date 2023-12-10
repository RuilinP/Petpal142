import React, { useState, useEffect } from 'react';
import CommentThreads from "./CommentThreads";
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../../utils/auth';

function FlipPage(action) {
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Execute the passed action
    action();
}

function CommentList({shelterId, applicationId}) {
    const [query, setQuery] = useState({ page: 1 });
    const [totalPages, setTotalPages] = useState(1);
    const [commentType, setCommentType] = useState('shelters');
    const [comments, setComments] = useState([]);
    const [shelterEmail, setShelterEmail] = useState({});
    const accessToken = getAccessToken();
    const navigate = useNavigate();

    useEffect(() => {
        const { page } = query;
        const handleNewComment = () => {
            if (shelterId) {
                fetch(`http://localhost:8000/shelters/${shelterId}/comments/?page=${page}`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => response.json())
                    .then(json => {
                        setComments(json.results);
                        setTotalPages(Math.ceil(json.count / 10)); // page size
                    });                
            } else if (applicationId) {
                fetch(`http://localhost:8000/applications/${applicationId}/comments/?page=${page}`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => response.json())
                    .then(json => {
                        setComments(json.results);
                        setCommentType('applications');
                        setTotalPages(Math.ceil(json.count / 10)); // page size
                    });  
            }

        };

        handleNewComment();

        window.addEventListener('commentPosted', handleNewComment);

        return () => {
            window.removeEventListener('commentPosted', handleNewComment);
        };
    }, [query]);

    useEffect(() => {
        // Fetch shelter email only when the component mounts
        fetchShelterEmail();
    }, []);


    const fetchShelterEmail = () => {
            if (applicationId) {
                try {
                    fetch(`http://localhost:8000/applications/${applicationId}`, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${accessToken}`
                    }
                  })
                    .then(response => response.json())
                    .then(data => {
                        setShelterEmail(prev => ({ ...prev, [applicationId]: data.shelter.email }));
                    });
                }
                catch {
                    navigate('/404');
                }

            } else if (shelterId) { 
                try {
                    fetch(`http://localhost:8000/accounts/shelters/${shelterId}`, {
                        method: 'GET',
                        headers: {
                        'Authorization': `Bearer ${accessToken}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        setShelterEmail(prev => ({ ...prev, [shelterId]: data.email }));
                    });
                }
                catch {
                    navigate('/404');
                }

            }
    };

    
    return (
        <>
            <CommentThreads commentType={commentType} comments={comments} relevant_shelterEmail={shelterEmail} />
            <div className="d-flex justify-content-center col-12 mt-4">
                {query.page > 1 && (
                    <button className='btn btn-dark' onClick={() => FlipPage(() => setQuery({ ...query, page: query.page - 1 }))}>
                        Previous
                    </button>
                )}
                {query.page < totalPages && (
                    <button className='btn btn-dark ms-3' onClick={() => FlipPage(() => setQuery({ ...query, page: query.page + 1 }))}>
                        Next
                    </button>
                )}
            </div>
            <div className="d-flex justify-content-center col-12 mt-3">
                {!comments || comments.length === 0 ? "Be the first to comment." : `Page ${query.page} out of ${totalPages}.`}
            </div>           
        </>
    );
}

export default CommentList;
