import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAccessToken, refreshToken } from "../../../utils/auth";


function PetCreationForm() {

	const [error, setError] = useState();

	const [formData, setFormData] = useState({
		"name": "",
		"gallery": "",
		"specie": "",
		"breed": "",
		"age": 0,
		"size": "",
		"color": "",
		"gender": "male",
		"location": "",
		"health": "",
		"characteristics": "",
		"story": "",
		"status": "Available",
		"shelter": ""
	});
	const navigate = useNavigate();

	const onFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		async function submit() {
			try {
				const response = await axios.post(
					"http://localhost:8000/pet/", formData, {
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					},
				});
				navigate(`/pets/${response.data.id}`)
			} catch (e) {
				setError(e);
			}

		}

		submit();
	};

	useEffect(() => {
		try {
			refreshToken();
		} catch (e) {
			setError(e);
		}
	}, []);

	return (
		<Card>
			<Form onSubmit={onFormSubmit} onChange={onFormChange}>
				<Card.Body>
					<Card.Title>New Pet</Card.Title>
					<Form.Group controlId="name">
						<Form.Label>Name:</Form.Label>
						<Form.Control
							type="text"
							name="name"
							placeholder="Name"
							value={formData.name}
							required
						/>
					</Form.Group>

					<Form.Group controlId="gallery">
						<Form.Label>Gallery:</Form.Label>
						<Form.Control
							type="text"
							name="gallery"
							placeholder="gallery"
							value={formData.gallery}
							required
						/>
					</Form.Group>

					<Form.Group controlId="specie">
						<Form.Label>Specie:</Form.Label>
						<Form.Control
							type="text"
							name="specie"
							placeholder="specie"
							value={formData.specie}
							required
						/>
					</Form.Group>

					<Form.Group controlId="breed">
						<Form.Label>Breed:</Form.Label>
						<Form.Control
							type="text"
							name="breed"
							placeholder="breed"
							value={formData.breed}
							required
						/>
					</Form.Group>

					<Form.Group controlId="age">
						<Form.Label>Age:</Form.Label>
						<Form.Control
							type="number"
							name="age"
							placeholder="age"
							value={formData.age}
							required
						/>
					</Form.Group>

					<Form.Group controlId="size">
						<Form.Label>Size:</Form.Label>
						<Form.Control
							type="text"
							name="size"
							placeholder="size"
							value={formData.size}
							required
						/>
					</Form.Group>

					<Form.Group controlId="color">
						<Form.Label>Color:</Form.Label>
						<Form.Control
							type="text"
							name="color"
							placeholder="color"
							value={formData.color}
							required
						/>
					</Form.Group>

					<Form.Group controlId="gender">
						<Form.Label>Gender:</Form.Label>
						<Form.Control
							as="select"
							name="gender"
							value={formData.gender}
							required
						>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="location">
						<Form.Label>Location:</Form.Label>
						<Form.Control
							type="text"
							name="location"
							placeholder="location"
							value={formData.location}
							required
						/>
					</Form.Group>

					<Form.Group controlId="health">
						<Form.Label>Health:</Form.Label>
						<Form.Control
							type="text"
							name="health"
							placeholder="health"
							value={formData.health}
							required
						/>
					</Form.Group>

					<Form.Group controlId="characteristics">
						<Form.Label>Characteristics:</Form.Label>
						<Form.Control
							type="text"
							name="characteristics"
							placeholder="characteristics"
							value={formData.characteristics}
							required
						/>
					</Form.Group>

					<Form.Group controlId="story">
						<Form.Label>Story:</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							name="story"
							placeholder="story"
							value={formData.story}
							required
						/>
					</Form.Group>

					<Form.Group controlId="status">
						<Form.Label>Status:</Form.Label>
						<Form.Control
							as="select"
							name="status"
							value={formData.status}
							required
						>
							<option value="Available">Available</option>
							<option value="Adopted">Adopted</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="shelter">
						<Form.Label>Shelter:</Form.Label>
						<Form.Control
							type="number"
							name="shelter"
							placeholder="shelter"
							value={formData.shelter}
							required
						/>
					</Form.Group>
					{
						error && (
							<Card bg="danger" text="white">
								<Card.Body>
									<Card.Title>{error.message}</Card.Title>
								</Card.Body>
							</Card>
						)
					}
				
				</Card.Body>
				<Card.Footer>
					<Button variant="secondary" type="submit">
						Submit
					</Button>
					<Button variant="secondary">
						Cancel
					</Button>
				</Card.Footer>
			</Form>
		</Card >
	)
}

export default PetCreationForm;