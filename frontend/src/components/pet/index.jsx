import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAccessToken, fetchSinglePet } from '../../ajax'; // Assuming ajax.js is in the same directory
import axios from 'axios'; 

function SinglePetInfo() {
  const [petInfo, setPetInfo] = useState({});
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const { petId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await fetchAccessToken('ruilin@gmail.com', '123');
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
        if (accessToken && petId) {
          const response = await axios.get(`http://localhost:8000/pets/${petId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          
          setPetInfo(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPetData();
  }, [accessToken, petId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Pet Information</h1>
      <div>
        <h2>{petInfo.name}</h2>
        <p>Species: {petInfo.species}</p>
        <p>Breed: {petInfo.breed}</p>
        <p>Age: {petInfo.age}</p>
        {/* Include additional details as needed */}
      </div>
    </div>
  );
}

export default SinglePetInfo;
