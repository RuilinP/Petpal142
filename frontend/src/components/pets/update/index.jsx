import { useEffect, useState } from "react"
import Image from 'react-bootstrap/Image';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { fetchAccessToken } from "../../../ajax";
import Header from "../../common/header";
import Footer from "../../common/footer";
import PetImageUploadModal from "../../pet/create/PetImageUploadModal";

export default function PetUpdate(props) {
    const { petId } = { petId: 18 };
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);

    const navigate = useNavigate()
    const [petData, setPetData] = useState({
        name: '',
        gallery: '',
        specie: '',
        breed: '',
        age: '',
        size: '',
        color: '',
        gender: '',
        location: '',
        health: '',
        characteristics: '',
        story: '',
        status: '',
        shelter: ''
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const token = await fetchAccessToken('123@email.com', '123');
                setAccessToken(token);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        async function fetchPetData() {
            try {
                if (accessToken) { // Check if petInfo.shelter exists
                    const response = await axios.get(`http://localhost:8000/pets/${petId}/`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    setPetData(response.data);
                }
            } catch (error) {
                setError(error.message);
            }
        }

        fetchPetData();
    }, [accessToken, petId]);

    const handleChange = event => {
        const { name, value } = event.target;
        setPetData(prevState => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = event => {
        event.preventDefault();
        try {
            if (accessToken) {
                console.log(petData)
                axios.put(`http://localhost:8000/pets/${petId}/`, petData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }).then(ret => {
                    navigate(`/pets/${ret.data.id}`)
                    
                })
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div>
            <Header />

            <div className="container mt-5">
                <div className="d-flex gap-5 justify-content-center">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 className="fs-4 fw-bold text-lg-start">Upload Image/Videos here</h1>
                        <Button className="square" onClick={() => setShowUploadModal(true)}><Image src="/assets/images/shelter-uploads/lemur1.jpeg" alt="Your Image" /></Button>
                        <Button className="square" onClick={() => setShowUploadModal(true)}><Image src="/assets/images/shelter-uploads/lemur2.jpeg" alt="Your Image" /></Button>
                        <Button className="square" onClick={() => setShowUploadModal(true)}><Image src="/assets/images/shelter-uploads/video.png" alt="Your Image" /></Button>
                        <Button className="square" onClick={() => setShowUploadModal(true)}><Image src="/assets/images/shelter-uploads/upload.png" alt="Your Image" /></Button>
                        <PetImageUploadModal show={showUploadModal} setShowUploadModal={setShowUploadModal} />
                    </div>

                    <div className="card h-300 bg-white mb-5" id="card2">
                        <div className="card-body">
                            <h1 className="fs-4 fw-bold text-lg-start mb-3">Pet Update</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Pet Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={petData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSpecie">
                                    <Form.Label>Pet Specie</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="specie"
                                        value={petData.specie}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBreed">
                                    <Form.Label>Breed</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="breed"
                                        value={petData.breed}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="gender"
                                        value={petData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formAge">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="age"
                                        value={petData.age}
                                        onChange={handleChange}
                                    >
                                        <option value="Kitten">Kitten</option>
                                        <option value="Young">Young</option>
                                        <option value="Adult">Adult</option>
                                        <option value="Senior">Senior</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formSize">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="size"
                                        value={petData.size}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formHaircolor">
                                    <Form.Label>Hair Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="color"
                                        value={petData.color}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formlocation">
                                    <Form.Label>location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        row={3}
                                        name="location"
                                        value={petData.location}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formhealth">
                                    <Form.Label>Health</Form.Label>
                                    <Form.Control
                                        type="text"
                                        row={3}
                                        name="health"
                                        value={petData.health}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCharacteristics">
                                    <Form.Label>Characteristics</Form.Label>
                                    <Form.Control
                                        type="text"
                                        row={3}
                                        name="characteristics"
                                        value={petData.characteristics}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStory">
                                    <Form.Label>Story</Form.Label>
                                    <Form.Control
                                        type="text"
                                        row={6}
                                        name="story"
                                        value={petData.story}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="status"
                                        value={petData.status}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formShelter">
                                    <Form.Label>Shelter</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="shelter"
                                        value={petData.shelter}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
