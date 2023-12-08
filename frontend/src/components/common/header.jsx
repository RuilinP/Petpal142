import { Button, Container, Navbar } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import '../../pages/styles/main.css'
import '../../pages/styles/custom.css'
import '../../pages/styles/fix-pos-icon.css'
import { useNotifications } from "../../contexts/NotifContexts"

import React, { useState, useEffect } from 'react';

function Header() {
    const { hasNewNotifications } = useNotifications();
    const [userType, setUserType] = useState(null);
	const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const response = await fetch('http://localhost:8000/accounts/check_user_type/', {
					method: 'GET',
					headers: {
					'Authorization': `Bearer ${accessToken}`
					}
				});
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUserType(data.user_type.toLowerCase());
            } catch (error) {
                console.error('Error fetching user type:', error);
            }
        };
		console.log(userType);
        fetchUserType();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <header>
			<div className="d-md-none fixed-bottom pr-3 pb-3">
				<a className={`notif-icon btn btn-sm navbar-brand ${hasNewNotifications ? 'has-notifications' : ''}`} 
				href="notifications.html">
					&#x1F514;
				</a>
			</div>

			<div className="back-to-top-button">
				<button type="button" className="btn btn-secondary btn-sm" onClick={scrollToTop}> &#x2191; </button>
			</div>

            <Navbar bg='primary' expand='sm' variant='light'>
                <Container fluid>
					<a href="landing.html" className="navbar-brand mb-0 h1">
						<img className="logo d-line-block" src={logo} alt="PetPal Logo"></img>
					</a>

					<button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" className="navbar-toggler"
						aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        {userType === 'shelter' ? (
                            // Shelter user navigation
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a href="" className="nav-link">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link">Shelter Reviews</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link">Shelter Pets</a>
                                </li>
                            </ul>
                        ) : (
                            // Seeker user navigation
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a href="" className="nav-link">Profile</a>
                                </li>
								<li className="nav-item">
                                    <a href="" className="nav-link">Pet Search</a>
                                </li>
                                <li className="nav-item">
                                    <a href="" className="nav-link">My Applications</a>
                                </li>
                            </ul>
                        )}

						<a className="btn btn-dark btn-sm ms-0" href="landing.html" role="button">Log out</a>
						<a className={`btn btn-sm ms-2 me-0 navbar-brand d-none d-md-block ${hasNewNotifications ? 'has-notifications' : ''}`} 
						href="notifications.html">
							&#x1F514;
						</a>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
