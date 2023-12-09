import { Button, Container, Navbar } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import '../../pages/styles/main.css'
import '../../pages/styles/custom.css'
import '../../pages/styles/fix-pos-icon.css'
import { useNotifications } from '../../contexts/NotifContexts'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken, logout } from '../../utils/auth';

function Header() {
    const navigate = useNavigate();
    const { hasNewNotifications } = useNotifications();
    const [userType, setUserType] = useState(null);
	const accessToken = getAccessToken();
    let tokenUser;
    if (accessToken) {
        tokenUser = jwtDecode(accessToken); 
    } else {
        navigate(`/404`);
    }

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

        fetchUserType();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <header>
			<div className='d-md-none fixed-bottom pr-3 pb-3'>
				<Button className={`notif-icon btn btn-sm navbar-brand bg-transparent ${hasNewNotifications ? 'has-notifications' : ''}`} 
				    onClick={ (event) => { event.preventDefault(); navigate(`/notifications/`) } }>
					&#x1F514;
				</Button>
			</div>

			<div className='back-to-top-button'>
				<button type='button' className='btn btn-secondary btn-sm' onClick={scrollToTop}> &#x2191; </button>
			</div>

            <Navbar bg='primary' expand='sm' variant='light'>
                <Container fluid>
					<Button className='navbar-brand mb-0 h1 bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/`) } }>
						<img className='logo d-line-block' src={logo} alt='PetPal Logo'></img>
					</Button>

					<button type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' className='navbar-toggler'
						aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>

                    <div className='collapse navbar-collapse' id='navbarNav'>
                        {userType === 'shelter' ? (
                            // Shelter user navigation
                            <ul className='navbar-nav me-auto'>
                                <li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/profile/shelter/`) } }>Profile</Button>
                                </li>
                                <li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/shelters/${tokenUser.user_id}/comments/`) } }>Shelter Reviews</Button>
                                </li>
                                <li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/shelters/${tokenUser.user_id}/pets/`) } }>Shelter Pets</Button>
                                </li>
                                <li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/blogs/`) } }>Blogs</Button>
                                </li>
                            </ul>
                        ) : (
                            // Seeker user navigation
                            <ul className='navbar-nav me-auto'>
                                <li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/profile/seeker/`) } }>Profile</Button>
                                </li>
								<li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/pets/`) } }>Pet Search</Button>
                                </li>
                                <li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/pet/application-list`) } }>My Applications</Button>
                                </li>
                                <li className='nav-item'>
                                    <Button className='nav-link bg-transparent' onClick={ (event) => { event.preventDefault(); navigate(`/blogs/`) } }>Blogs</Button>
                                </li>
                            </ul>
                        )}

						<Button variant="dark" size="sm" className='btn btn-dark btn-sm ms-0' onClick={ (event) => { event.preventDefault(); logout(); navigate(`/`) } }>Log out</Button>
						<Button className={`btn btn-sm ms-2 me-0 navbar-brand d-none d-md-block bg-transparent ${hasNewNotifications ? 'has-notifications' : ''}`} 
						    onClick={ (event) => { event.preventDefault(); navigate(`/notifications/`) } }>
							&#x1F514;
						</Button>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
