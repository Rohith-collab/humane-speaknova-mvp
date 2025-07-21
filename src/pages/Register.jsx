import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: 20 }}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </form>
  );
}
