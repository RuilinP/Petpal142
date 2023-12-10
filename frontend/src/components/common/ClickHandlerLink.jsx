import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/auth';

const ClickHandlerLink = ({ url, className, children }) => {
    const accessToken = getAccessToken();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault(); // Prevent default link navigation

        const headers = { 'Authorization': `Bearer ${accessToken}` };

        try {
            navigate(url);
        } catch (error) {
            navigate("/404");
        }
    };

    return (
        <a href={url} onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

export default ClickHandlerLink;
