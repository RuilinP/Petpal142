import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/auth';

const ClickHandlerButton = ({ url, className, children }) => {
    
    const accessToken = getAccessToken();
    const navigate = useNavigate();

    const handleClick = async () => {
        const headers = { 'Authorization': `Bearer ${accessToken}` };

        try {
            navigate(url);
        } catch (error) {
            navigate("/404");
        }
    };

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    );
};

export default ClickHandlerButton;
