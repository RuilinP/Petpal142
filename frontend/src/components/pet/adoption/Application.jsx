import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Header from '../../common/header';
import Footer from '../../common/footer';
import { getAccessToken } from '../../../utils/auth';

function Application() {
	const {petId} = useParams();
    const [seekerInfo, setSeekerInfo] = useState({
        email: '',
        first_name: '',
        last_name: '',
        'phone_number': '',
        address: '',
        country: '',
        state: '',
        city: '',
        zip: '',
    });

	const accessToken = getAccessToken();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let tokenUser;
    if (accessToken) {
        tokenUser = jwtDecode(accessToken); 
    } else {
        navigate(`/404`);
    }
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');


        // Perform the API call
        fetch(`http://localhost:8000/pets/${petId}/applications/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` },
        })
        .then(response => {
			if (response.status === 400) {
				// Handle Bad Request
				setErrorMessage('You already have an application with this pet.');
				throw new Error('Bad Request');
			  } else {
				setErrorMessage('Something went wrong. Please try again');
			  }
            return response.json();
        })
        .then(data => {
            // Handle successful submission
            setSuccessMessage('Application submitted!');
        })
        .catch(error => {
            // Handle errors in submission
        });
    };

    useEffect(() => {
        const fetchInfo = async () => {
			try {
				const response = await fetch(`http://localhost:8000/accounts/seekers/${tokenUser.user_id}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${accessToken}`
					}
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const dataInfo = await response.json();
				setUserId(tokenUser.user_id);
				setSeekerInfo({
					email: dataInfo.email,
					first_name: dataInfo.first_name,
					last_name: dataInfo.last_name,
					'phone_number': dataInfo.phone_number,
					address: dataInfo.address,
					country: dataInfo.country,
					state: dataInfo.state,
					city: dataInfo.city,
					zip: dataInfo.zip,
				});

			} catch (error) {
				navigate("/404");
			}
        };

        fetchInfo();

    }, [userId]);


    return (
        <div className='bg-secondary'>
            <Header />
            <main>
			<div className="d-flex flex-column align-items-center text-center pt-5 pb-3">
			</div>

				<div className="container pb-5">
					<div className="row justify-content-center">
					<div className="col-md-8">
						<form className="py-3" onSubmit={handleSubmit}>
						<div className="form-group row py-1">
							<label htmlFor="applicantEmail" className="col-md-4 col-form-label d-md-none text-nowrap">Email <span className="text-danger">*</span> </label>
							<label htmlFor="applicantEmail" className="col-md-4 col-form-label text-end d-none d-md-block text-nowrap">Email <span className="text-danger">*</span> </label>
							<div className="col-md-7">
							<input type="email" className="form-control" id="applicantEmail" defaultValue={seekerInfo.email} required />
							</div>
						</div>
						<div className="form-group row py-1">
							<label htmlFor="applicantFirstName" className="col-md-4 col-form-label d-md-none text-nowrap">First Name <span className="text-danger">*</span> </label>
							<label htmlFor="applicantFirstName" className="col-md-4 col-form-label text-end d-none d-md-block text-nowrap">First Name <span className="text-danger">*</span> </label>
							<div className="col-md-7">
							<input type="text" className="form-control" id="applicantFirstName" defaultValue={seekerInfo.first_name} required />
							</div>
						</div>
						<div className="form-group row py-1">
							<label htmlFor="applicantLastName" className="col-md-4 col-form-label d-md-none text-nowrap">Last Name <span className="text-danger">*</span> </label>
							<label htmlFor="applicantLastName" className="col-md-4 col-form-label text-end d-none d-md-block text-nowrap">Last Name <span className="text-danger">*</span> </label>
							<div className="col-md-7">
							<input type="text" className="form-control" id="applicantLastName" defaultValue={seekerInfo.last_name} required />
							</div>
						</div>
						<div className="form-group row py-1">
							<label htmlFor="applicantPhoneNumber" className="col-md-4 col-form-label d-md-none text-nowrap">Phone Number <span className="text-danger">*</span></label>
							<label htmlFor="applicantPhoneNumber" className="col-md-4 col-form-label text-end d-none d-md-block text-nowrap">Phone Number <span className="text-danger">*</span></label>
							<div className="col-md-7">
							<input type="tel" className="form-control" id="applicantPhoneNumber" defaultValue={seekerInfo.phone_number} required />
							</div>
						</div>
						<div className="form-group row py-1">
							<label htmlFor="applicantAddress1" className="col-md-4 col-form-label d-md-none text-nowrap">Address <span className="text-danger">*</span> </label>
							<label htmlFor="applicantAddress1" className="col-md-4 col-form-label text-end d-none d-md-block text-nowrap">Address <span className="text-danger">*</span> </label>
							<div className="col-md-7">
							<textarea className="form-control" id="applicantAddress1" rows="3" defaultValue={`${seekerInfo.address ? seekerInfo.address + ', ' : ''}${seekerInfo.city ? seekerInfo.city + ', ' : ''}${seekerInfo.state ? seekerInfo.state + ' ' : ''}${seekerInfo.zip ? seekerInfo.zip + ', ' : ''}${seekerInfo.country || ''}`} required ></textarea>
							</div>
						</div>
						<div className="form-group row py-1">
						<label htmlFor="applicantMessage" className="col-md-4 col-form-label d-md-none">Message</label>
						<label htmlFor="applicantMessage" className="col-md-4 col-form-label text-end d-none d-md-block">Message</label>
						<div className="col-md-7">
							<textarea className="form-control" id="applicantMessage" rows="5"></textarea>
						</div>
						</div>
						<div className="row py-1">
							<p className="text-danger text-end col-md-11">* required field</p>
						</div>
						<div>
							{successMessage && <div className="alert alert-success">{successMessage}</div>}
							{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
							<div className="row py-1 px-3 justify-content-md-center">
								<button type="submit" className="btn btn-dark col-md-4">Submit</button>
							</div>
						</div>

						</form>
					</div>
					</div>
				</div>
            </main>
            <Footer />
        </div>
    );
}

export default Application;
