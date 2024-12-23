import React from 'react';
import '../notfound/notfound.css';

export default function NotFound() {

  return (
    <div className="notfound-container">
      <a href="/" className="bs bsx-arrow">
        <i className="bx bx-arrow-back" style={{ fontSize: '24px' }}></i> Go Back
      </a>
      <div className="error">
        <h1>404</h1>
        <p>We're sorry but it looks like that page doesn't exist anymore.</p>
        <div className="search-container">
          <input
            id="searchInput"
            type="text"
            placeholder="Try searching for what you were looking for..."
            className="search-input"
          />
          
        </div>
      </div>
    </div>
  );
}
