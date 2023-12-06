import React from 'react';

const NotFound = () => {
  return (
    <div><main style={{ textAlign: 'center' }}>
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <img src='./assets/images/neko.gif' alt="404 GIF" style={{ width: '200px', height: '200px' }} />
  </main>
    </div>
  );
};

export default NotFound;