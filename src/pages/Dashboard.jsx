import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={logout}>Logout</button>

      <h1 className="dashboard-title">Welcome to Angilam Dashboard</h1>

      <Link to="/Angilambot">
        <button className="dashboard-button">🎤 Start English Tutor Bot</button>
      </Link>

      <div className="dashboard-links">
        <Link to="/voicebot">Start Speaking with AI 🎙</Link>
        <Link to="/story">🎥 Create Story</Link>
      </div>
    </div>
  );
}
