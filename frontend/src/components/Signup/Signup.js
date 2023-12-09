import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../assets/styles/login-signup.css';

function Signup() {
    const navigate = useNavigate();

    return (
        <main class="login-signup-main">
            <div class="login-signup-box">
                <h4 class="fw-bold text-center">Are you a Pet Seeker or a Pet Shelter?</h4>

                <div class="login-signup-form text-center">
                    <button class="btn primary d-flex flex-column align-items-center p-3" onClick={() => { navigate('/signup/seeker') }}>
                        <span class="fw-bold">Pet Seeker!</span>
                        <span>I'm looking to adopt a pet.</span>
                    </button>

                    <button class="btn primary d-flex flex-column align-items-center p-3" onClick={() => { navigate('/signup/shelter') }}>
                        <span class="fw-bold">Pet Shelter!</span>
                        <span>I'm listing pets for adoption.</span>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Signup;
