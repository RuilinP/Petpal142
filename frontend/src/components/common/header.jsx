import { Button, Container, Navbar } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import '../../pages/styles/main.css'
import '../../pages/styles/custom.css'
import '../../pages/styles/fix-pos-icon.css'
import { useNotifications } from "../../contexts/NotifContexts"

function Header() {
	const { hasNewNotifications } = useNotifications();

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
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<a href="landing.html" className="nav-link">Home</a>
							</li>
							<li className="nav-item">
								<a href="shelter-mgmt.html" className="nav-link">Manage Shelter</a>
							</li>
							<li className="nav-item">
								<a href="profile-pet-shelter/profile-pet-shelter.html" className="nav-link">Profile</a>
							</li>
						</ul>

						<a className="btn btn-dark btn-sm ms-0" href="landing.html" role="button">Log out</a>
						<a className={`btn btn-sm ms-2 me-0 navbar-brand d-none d-md-block ${hasNewNotifications ? 'has-notifications' : ''}`} 
						href="notifications.html">
							&#x1F514;
						</a>
					</div>
				</Container>
			</Navbar>
		</header >
	)
}

export default Header;