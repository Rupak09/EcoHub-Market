import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react'
import user_avatar from '../assets/user_avatar.json'
import { useNavigate } from 'react-router-dom';
import { ExampleNavbarFive } from '../Components/NavBarCartsLogin';
const UserDetails = ({ label, value }) => (
  <div className="flex items-center justify-between border p-4 rounded-lg mb-4">
    <h3 className="text-md font-medium text-gray-900">{label}:</h3>
    <p className="text-md text-gray-700">{value}</p>
  </div>
);

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5001/logout');
      console.log('Logged out successfully');
      navigate('/'); // Redirect to home page or login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const toggleProductDetails = (productId) => {
    setSelectedProductId(prevSelectedProductId =>
      prevSelectedProductId === productId ? null : productId
    );
  };

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <>
    <ExampleNavbarFive/>
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-start justify-center gap-8">
      {/* User Info */}
      <div className="inline-flex items-center space-x-2">
        
        </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 max-w-md">
  <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">User Details</h1>
  <div className="flex flex-col items-center">
    <Lottie animationData={user_avatar} style={{ width: "200px", height: "200px", marginBottom: "16px" }} />
    <div className="w-full ">
      <UserDetails label="Username" value={user.username} className="pr-4" />
      <UserDetails label="Email" value={user.email} />
      <UserDetails label="Number of Orders" value={user.boughtProducts.length} />
    </div>
  </div>
  <button onClick={handleLogout} className='ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#617a4f] hover.bg-[#446536] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>LOG-OUT</button>
</div>


      {/* Bought Products */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Products Purchased</h2>
        <ul>
          {user.boughtProducts.map((order, orderIndex) => (
            <li key={orderIndex} className="mb-4">
              <button
                onClick={() => toggleProductDetails(orderIndex)}
                className="w-full text-left p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
              >
                Order Number: {orderIndex + 1}
              </button>
              {selectedProductId === orderIndex && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  {order.products.map((product, productIndex) => (
                    <div key={productIndex} className="mb-3 p-2 border-b last:border-b-0">
                      <p className="text-lg font-medium text-gray-900">Product Title: {product.title}</p>
                      <p className="text-md text-gray-600">Price: ${product.price}</p>
                      {/* Add more details as needed */}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
