import { useState } from "react";
import { Form, Modal, Image, Button } from "react-bootstrap";
import uploadPlaceholderImage from "../../../assets/images/upload.png";
import { PropTypes } from 'prop-types';


const PetImageUploadModal = (props) => {
	const { show, setShowUploadModal } = props;
	const [image, setImage] = useState(null);

	const onCloseUpload = () => setShowUploadModal(false);
	const onRemove = () => {
		setImage(null);
	}

	const onFileSelected = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage(URL.createObjectURL(e.target.files[0]));
		}
	}

	return (
		<Modal show={show} onHide={onCloseUpload}>
			<Modal.Header closeButton>
				<Modal.Title>Image/Videos Upload</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<Image alt="Your Image" src={image === null ? uploadPlaceholderImage : image} />

				<Form>
					<Form.Group>
						<Form.Label>Upload an image file here</Form.Label>
						<Form.Control onChange={onFileSelected} accept=".png,.jpg,.jpeg,.webp,.heic,.heif,.avif" type="file" />
					</Form.Group>

					<Form.Group>
						<Form.Label>Or input a link to youtube or vimeo video here:</Form.Label>
						<Form.Control type="url" />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onCloseUpload}>Cancel</Button>
				<Button variant="danger" onClick={onRemove}>Remove</Button>
				<Button variant="dark">Submit</Button>
			</Modal.Footer>
		</Modal>
	)
}

PetImageUploadModal.propTypes = {
	show: PropTypes.bool.isRequired,
	setShowUploadModal: PropTypes.func.isRequired
}

export default PetImageUploadModal;