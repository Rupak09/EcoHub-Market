import { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, X, ShoppingCart, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExampleNavbarFive } from './NavBarCartsLogin';

export const ProductOverviewTwo = () => {
  const [innovreq, setInnovreq] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInnovativeProdById = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getInnovativeProd/${id}`, { withCredentials: true });
        setInnovreq(response.data);
      } catch (error) {
        console.error('Error fetching Innovative request by ID:', error);
      }
    };

    fetchInnovativeProdById();
  }, [id]);

  const handleBuyNow = async () => {
    const userEmail = localStorage.getItem('email');
    const clearCartResponse = await axios.delete(`http://localhost:5001/buyEmpty`, { withCredentials: true });
    const response = await axios.post(
      `http://localhost:5001/buyCart`,
      {
        title: innovreq.title,
        description: innovreq.description,
        materialUsed: innovreq.materialUsed,
        price: innovreq.price,
        quantity: quantity,
        dimensions: innovreq.dimensions,
        image: innovreq.image,
      },
      { withCredentials: true }
    );
    navigate('/icheckout');
  };

  const handleAddToCart = async () => {
    if (quantity > 0) {
      try {
        console.log(innovreq);
        const userEmail = localStorage.getItem('email');
        const response = await axios.post(
          `http://localhost:5001/addToCart/`,
          {
            title: innovreq.title,
            description: innovreq.description,
            materialUsed: innovreq.materialUsed,
            price: innovreq.price,
            quantity: quantity,
            dimensions: innovreq.dimensions,
            image: innovreq.image,
          },
          { withCredentials: true }
        );
        alert('You have added ' + innovreq.title + ' to the cart');
      } catch (error) {
        console.log('Error ->', error);
      }
    } else {
      alert('Please add the product to the cart');
    }
  };

  if (!innovreq) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ExampleNavbarFive/>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-24 flex flex-wrap items-center">
          <div className="w-full lg:w-1/2">
            <img
              alt={innovreq.title}
              className="h-auto w-full rounded object-cover mx-auto lg:mx-0"
              src={innovreq.image}
            />
          </div>
          <div className="mt-6 w-full lg:w-1/2 lg:pl-10">
            <h1 className="my-4 text-3xl font-semibold text-black">{innovreq.title}</h1>
            <h3 className="text-lg font-semibold mb-2">Description:</h3>
            <p className="leading-relaxed mb-4">{innovreq.description}</p>
            <div className="my-4">
              <h3 className="text-lg font-semibold">Price:</h3>
              <span className="ml-2">${innovreq.price}</span>
            </div>
            <div className="my-4">
              <h3 className="text-lg font-semibold">Quantity:</h3>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                min="1"
                max={innovreq.quantity}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="my-4">
              <h3 className="text-lg font-semibold">Quantity Available:</h3>
              <span className="ml-2">{innovreq.quantity}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="mt-4 mb-2 w-full px-6 py-2 bg-[#617a4f] text-white rounded hover:bg-[#446536] focus:outline-none focus:ring focus:ring-green-200 transition duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full px-6 py-2 bg-[#617a4f] text-white rounded hover:bg-[#446536] focus:outline-none focus:ring focus:ring-green-200 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductOverviewTwo;
