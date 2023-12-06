import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ListGroup, Button } from "react-bootstrap";
import { getAccessToken, login } from "../../../utils/auth";
import ErrorCard from "../../ErrorCard";
import propTypes from "prop-types";

const ApplicationList = () => {

	const [error, setError] = useState();
	const [applications, setApplications] = useState([]);

	useEffect(() => {

		async function fetchApplications() {
			try {
				await login("123@email.com", "123");
				const response = await axios.get(
					`http://localhost:8000/applications/`, {
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					},
				});
				setApplications(response.data.results);
			} catch (e) {
				setError(e);
			}
		}

		fetchApplications();
	}, []);

	return (
		<div className="container py-5" >
			<h1>My Applications</h1>

			<ListGroup className="pt-3">
				{
					applications.map((application) => (
						<ApplicationRow key={application.pet} petId={application.pet} setError={setError} />
					))
				}
			</ListGroup>

			{error && <ErrorCard error={error} />} 
		</div >
	)

}

const ApplicationRow = (props) => {
	const { petId, setError } = props;

	const [petInfo, setPetInfo] = useState({
		name: null
	});

	useEffect(() => {

		async function fetchPetDetail() {
			try {
				const response = await axios.get(
					`http://localhost:8000/pets/${petId}/`, {
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					}
				});
				setPetInfo(response.data);
			} catch (e) {
				setError(e);
			}
		}

		fetchPetDetail();
	}, [])

	return (
		<ListGroup.Item className="d-flex align-items-center">
			<Image src="/assets/images/landing-top3.jpg" rounded width={100} height={100} className="object-fit-cover me-3" />
			<h4>{petInfo.name}</h4>
			<Button variant="dark" className="ms-auto">View</Button>
		</ListGroup.Item>
	)
}

ApplicationRow.propTypes = {
	petId: propTypes.number.isRequired,
}

export default ApplicationList;