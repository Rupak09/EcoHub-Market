// src/components/SignupPage.js

import { useState } from 'react';
import logo from '../assets/logomain.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5001/signup', {
        username,
        email,
        password,
        cPassword: confirmPassword,
      });
      alert(response.data.msg); // Display the message in an alert
      navigate("/login");
      if (response.status === 200 && response.data.msg === 'User created successfully') {
        navigate("/login");
      }
    } catch (err) {
      // Handle errors
      console.error('Signup error:', err.response.data);
      alert('An error occurred during signup.'); // Display an error alert
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('src/assets/blob-scene-haikei.svg')]">
      <form  className="p-6 bg-neutral-100 rounded shadow-md w-96">
      <img src={logo} alt="Logo" className="mx-auto h-40" />
        <h2 className="text-lg font-semibold mb-4 text-black text-center font-gilroy">Artisan Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
            Email
            </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">
          <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
            Username
            </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
            Password
            </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-black">
            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
            Confirm Password
            </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button className="px-4 py-2 my-2 text-white bg-[#617a4f] rounded hover:bg-emerald w-full" type="button" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
