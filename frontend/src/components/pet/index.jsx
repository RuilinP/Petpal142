import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SinglePetInfo() {
  const [petInfo, setPetInfo] = useState({});
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const { petId } = useParams();

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: '123@email.com',
            password: '123',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }

        const tokenData = await response.json();
        setAccessToken(tokenData.access); // Store the access token in state
      } catch (error) {
        setError(error.message);
      }
    }

    fetchAccessToken();
  }, []);

  useEffect(() => {
    async function fetchSinglePet() {
      try {
        const response = await fetch(`http://localhost:8000/pets/${petId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const petData = await response.json();
        setPetInfo(petData); // Set the pet data in the state
      } catch (error) {
        setError(error.message);
      }
    }

    if (accessToken) {
      fetchSinglePet();
    }
  }, [accessToken, petId]); // Trigger the effect when the access token or petId changes

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
