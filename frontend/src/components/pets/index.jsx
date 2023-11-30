// PetList.js

import React, { useState, useEffect } from 'react';

function PetList() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPets() {
      try {
        // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxMzMwMTY0LCJpYXQiOjE3MDEzMjgzNjQsImp0aSI6ImQwOGM2NzFkYjNmNjQ1MGE5MmU5Nzk3YTQ2YTVkZGFlIiwidXNlcl9pZCI6Mn0.HG97x-S_tg8M66jgMK1c5gkyh1s4jjySU9MwMi7lJwg';
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

    fetchPets();
  }, []);

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
