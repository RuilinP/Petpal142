import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../assets/styles/login-signup.css';
import axios from 'axios';
import { getAccessToken } from '../../utils/auth';
import { jwtDecode } from 'jwt-decode';

function SignupSeekerDone() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        first_name: '',
    });

    useEffect(() => {
        const token = getAccessToken();
        let tokenUser;
        if (token) {
            tokenUser = jwtDecode(token); 
        } else {
            navigate(`/404`);
        }

        async function fetchAccount() {
            try {
                const response = await axios.get(`http://localhost:8000/accounts/seekers/${tokenUser.user_id}/`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                });
                setAccount(response.data);
            } catch(error) {
            }
        }

        fetchAccount();
    }, []);

    return (
        <main class="login-signup-main">
            <div class="login-signup-box">
                <h3 class="fw-bold">Welcome, {account.first_name}!</h3>

                <p>Your registration is complete.</p>

                <div class="multiple-buttons">
                    <button class="btn btn-dark align-self-start" onClick={() => { navigate('/pets') }}>Start Pet Seeking</button>
                    <button class="btn btn-outline-dark align-self-start" onClick={() => { navigate('/profile/seeker') }}>View Profile</button>
                </div>
            </div>
        </main>
    );
}

export default SignupSeekerDone;
