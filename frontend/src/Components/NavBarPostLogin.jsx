import React from 'react';
import { Menu, X, ShoppingCart,ChevronRight } from 'lucide-react'; // Replace ShoppingCart with the actual cart icon if different
import logo from '../assets/logomain.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const menuItems = [
  {
    name: 'Home',
    href: '/homepage',
  },
];

export function ExampleNavbarFour() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Reset the showSearchResults to true every time a new search is initiated
      setShowSearchResults(true);
      searchProducts();
    }
  };
  const handleAddToCart = async (product) => {
    // Here you will have access to the entire product object
    // and you can destructure or directly access the properties you need
    try {
      
      const response = await axios.post(
        `http://localhost:5001/addToCart/`,
        {
          ...product,
        },
        { withCredentials: true }
      );
      alert('You have added ' + product.title + ' to the cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const searchProducts = async () => {
    if (!searchQuery) {
      // Optionally handle empty search query case
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/search?query=${searchQuery}`);
      setProducts(response.data);
      // No need to set showSearchResults here, as it's already been set in handleSearchKeyDown
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle the error case by potentially resetting or showing an error message
      setShowSearchResults(false);
    }
  };

  const closeSearchResults = () => {
    setProducts([]);
    setShowSearchResults(false);
  };

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-8xl mb-10 items-center justify-between px-6 py-2 sm:px-8 lg:px-10">
        <div className="inline-flex items-center space-x-2">
          <Link to="/homepage">
            <img src={logo} alt="Logo" className="h-16 mt-2" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-md font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex grow justify-end">
      <input
        className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mr-6"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
    </div>
        <div className="ml-2 mt-2 hidden lg:block">
          <span className="relative inline-block">
            <Link to ='/profilepage'>
            <img
              className="h-12 w-12 rounded-full mr-6"
              src="src/assets/avatar.jpg" // Update the path if necessary
              alt="User"
            />
            </Link>
          </span>
        </div>
        {/* Add to Cart Button */}
        <Link to='/cart'>
        <button
      
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#617a4f] hover:bg-[#617a4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ShoppingCart className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
          Cart
        </button>
        </Link>
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link to="/homepage">
                      <img src={logo} alt="Logo" className="h-20" />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        <ChevronRight className="ml-3 h-4 w-4" />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSearchResults && products.length > 0 && (
  <div className="my-8 mx-auto p-4 shadow-lg max-w-7xl">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold mb-4">Your Searched Products</h2>
      <button onClick={closeSearchResults} aria-label="Close search results">
        <X className="cursor-pointer" /> {/* Close button symbol (X) or icon */}
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Map over the products to display them */}
      {products.map((product) => (
  <div key={product._id} className="rounded-lg p-4 flex flex-col items-center">
    <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
    <h3 className="text-lg font-bold">{product.title}</h3>
    <p>{product.description}</p>
    <p className="text-lg font-semibold">Price: ${product.price}</p>
    <button
      onClick={() => handleAddToCart(product)} // Using an arrow function to pass the product
      className="mt-4 bg-[#617a4f] text-white px-4 py-2 rounded hover:bg-[#506a3f]"
    >
      Add to Cart
    </button>
  </div>
))}
    </div>
  </div>
)}

      
    {/* Placeholder for Other Products */}
    <div className="my-8 mx-auto p-4 max-w-7xl">
      <h2 className="text-2xl font-bold mb-4">All  Products</h2>
      {/* Map over and render other products similarly */}
    </div>
    </div>
  );
}
