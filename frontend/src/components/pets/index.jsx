import React, { useState, useEffect } from 'react';

function PetList() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState('');

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
    async function fetchPets() {
      try {
        const response = await fetch('http://localhost:8000/pets/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const petData = await response.json();
        setPets(petData.results); // Set the 'results' array in the state
      } catch (error) {
        setError(error.message);
      }
    }

    if (accessToken) {
      fetchPets();
    }
  }, [accessToken]); // Trigger the effect when the access token changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>List of Pets</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <h2>{pet.name}</h2>
            <p>Species: {pet.specie}</p>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            {/* Include additional details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
