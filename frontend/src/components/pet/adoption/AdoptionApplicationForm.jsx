import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import jeff from '../../../assets/images/jeff-photo.png';
import propTypes from 'prop-types';
import { useState } from "react";
import { getAccessToken, login } from "../../../utils/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../../ErrorCard";

const AdoptionApplicationForm = (props) => {

	const { petId, petName } = props;
	const [error, setError] = useState();
	const [formData, setFormData] = useState({
		message: "",
	});
	const navigate = useNavigate();

	const onFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	const onSubmit = (e) => {
		e.preventDefault();
		async function submit() {
			try {
				await login("456@email.com", "456");
				const response = await axios.post(
					`http://localhost:8000/pets/${petId}/applications/`, formData, {
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					},
				});
				navigate(`/pets/${response.data.pet}`)
			} catch (e) {
				setError(e);
			}

		}

		submit();
	}

	return (
		<div>

			<Container className="text-center pt-5 pb-3">
				<Image
					width={100} height={100} className="object-fit-cover" src={jeff} roundedCircle
				/>
				<h3 className="mt-3">You're adopting</h3>
				<h1>{petName}</h1>
			</Container>

			<Container>
				<Col md={{ span: 8, offset: 2 }}>
					<Form onChange={onFormChange} onSubmit={onSubmit}>

						<Field label="Surname" required />
						<Field label="Given Name" name="givenName" required />
						<Field label="Address Line 1" name="addressLine1" required />
						<Field label="Address Line 2" name="addressLine2" />
						<Field label="Message" as="textarea" />

						<Row>
							<p className="text-danger text-end col-md-11">* required field</p>
						</Row>

						{
							error && (<ErrorCard error={error} />)
						}

						<Row className="justify-content-md-center">
							<Button className="col-md-4" type="submit">
								Submit
							</Button>
						</Row>
					</Form>
				</Col>
			</Container>
		</div >
	)
}

const Field = (props) => {

	const { label, required, as, value, name } = props;

	return (
		<Form.Group as={Row} className="py-3">
			<Form.Label column className="col-form-label text-md-end text-sm-start " md={4}>
				{required && <span className="text-danger">*</span>} {label}
			</Form.Label>
			<Col md={7}>
				<Form.Control required={required} as={as} type="text" name={name ? name : label.toLowerCase()} value={value} />
			</Col>
		</Form.Group>
	)
}

Field.propTypes = {
	label: propTypes.string.isRequired,
	required: propTypes.bool,
	as: propTypes.string,
	value: propTypes.string,
	name: propTypes.string
}

AdoptionApplicationForm.propTypes = {
	petId: propTypes.number.isRequired,
	petName: propTypes.string
}

AdoptionApplicationForm.defaultProps = {
	petId: 1,
	petName: "Jeff"
}

export default AdoptionApplicationForm;