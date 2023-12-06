import React, { useState, useEffect } from 'react';
import ReplyThreads from './ReplyThreads';

function FlipPage(action) {
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Execute the passed action
    action();
}

function ReplyList({shelterId, applicationId, commentId}) {
    const [query, setQuery] = useState({ page: 1 });
    const [totalPages, setTotalPages] = useState(1);
    const [replies, setReplies] = useState([]);
    const [comment, setComment] = useState([]);
    const [shelterEmail, setShelterEmail] = useState({});
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const { page } = query;
        const handleNewReply = () => {
            fetch(`http://localhost:8000/shelters/${shelterId}/comments/${commentId}/?page=${page}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                }
              })
                .then(response => response.json())
                .then(json => {
                    setComment(json.comment);
                    setReplies(json.replies.results);
                    setTotalPages(Math.ceil(json.replies.count / 10)); // page size
                });
        };

        handleNewReply();

        window.addEventListener('replyPosted', handleNewReply);

        return () => {
            window.removeEventListener('replyPosted', handleNewReply);
        };
    }, [query]);

    useEffect(() => {
        // Fetch shelter email only when the component mounts
        fetchShelterEmail();
    }, []);


    const fetchShelterEmail = () => {
            if (applicationId) {
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
            } else if (shelterId) { 
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
    };

    
    return (
        <>
            <ReplyThreads replies={replies} comment={comment} relevant_shelterEmail={shelterEmail} />
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
            <div className="d-flex justify-content-center col-12 mt-3">Page {query.page} out of {totalPages}.</div>           
        </>
    );
}

export default ReplyList;
