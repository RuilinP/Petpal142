import { Button } from "react-bootstrap";
import uploadPlaceholderImage from "../../../assets/images/upload.png";
import { useState } from "react";
import PetImageUploadModal from "./PetImageUploadModal";
import Footer from "../../common/footer";
import Header from "../../common/header";
import PetCreationForm from "./PetCreationForm";


function CreatePet() {

	const [showUploadModal, setShowUploadModal] = useState(false);
	const onClickUpload = () => setShowUploadModal(true);

	return (
		<div>
			<Header />
			<div className="container mt-5">
				<div className="d-flex flex-column flex-md-row gap-5 justify-content-center">
					{/*Modal*/}
					<div>
						<h1 className="fs-4  fw-bold text-lg-start">Upload Image/Videos here</h1>
						<div className="square mt-5">
							<Button onClick={onClickUpload}>
								<img src={uploadPlaceholderImage} alt="Your Image" />
							</Button>
							<PetImageUploadModal show={showUploadModal} setShowUploadModal={setShowUploadModal} />
						</div>
					</div>
					{/*Form*/}
					<PetCreationForm />
				</div>
			</div>
			<Footer />
		</div >
	)
}

export default CreatePet;