
import { useState } from 'react';
import logo from '../assets/logomain.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/signin',  { email, password }, { withCredentials: true });
      alert(response.data.msg); // Display the message in an alert

      if (response.status === 200 && response.data.msg === "Login successful") {
       
        navigate("/homepage");
      }
    } catch (err) {
      // Handle errors
      console.error('Signup error: ', err.response.data);
      alert('An error occurred during signup.'); // Display an error alert
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('src/assets/wave-haikei-og.svg')] bg-cover">
      <form className="p-6 bg-neutral-100 rounded shadow-md w-96">
      <img src={logo} alt="Logo" className="mx-auto h-40" />
        <h2 className="text-lg font-semibold mb-4 text-black text-center">Artisan Log In</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">
           <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
            Email
            </label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button className="px-4 py-2 my-2 text-white bg-[#617a4f] rounded hover:bg-emerald w-full" type="button" onClick={handleSignin}>Login</button>
        <div className="flex justify-between mt-4">
        <Link to="/forgotpassword" className="text-sm text-black-400 hover:underline focus:outline-none">
          Forgot Password?
        </Link>
        <Link to="/signup" className="text-sm text-black-400 hover:underline focus:outline-none">
          Create Account
        </Link>
        </div>
      </form>
    </div>
  );
}


export default LoginPage;