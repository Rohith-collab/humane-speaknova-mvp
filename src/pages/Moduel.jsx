import React from 'react';
import { Link } from 'react-router-dom';
import './Module.css';

function Module() {
  return (
    <div className="module-container">
      <h2 className="module-title">🌟 Choose Your Module</h2>
      <div className="module-boxes">
        <Link to="/InterviewBot" className="module-link">
          <div className="module-box">🗣 Interview</div>
        </Link>
        <Link to="/ShoppingBot" className="module-link">
          <div className="module-box">🛒 Shopping</div>
        </Link>
        <Link to="/RestaurantBot" className="module-link">
          <div className="module-box">📚 Restaurant</div>
        </Link>
      </div>
    </div>
  );
}

export default Module;
