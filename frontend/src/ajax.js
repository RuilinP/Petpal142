// ajax.js
const BASE_URL = 'http://142.126.176.248:8000'; 

export async function fetchAccessToken(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }

    const tokenData = await response.json();
    return tokenData.access; // Return the access token
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchSinglePet(petId, accessToken) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      mode: 'cors'
    };

    const response = await fetch(`${BASE_URL}/pets/${petId}`, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const petData = await response.json();
    return petData; // Return the pet data
  } catch (error) {
    throw new Error(error.message);
  }
}
