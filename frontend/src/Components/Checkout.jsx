import { X } from 'lucide-react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { ExampleNavbarFive } from './NavBarCartsLogin';
export function CheckoutTwo() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const[name,setName] = useState('');
  const[address,setAddress] = useState('');
  const[city,setCity] = useState('');
  const[postalcode,setPostalcode] = useState('');
  const[state,setState] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const response = await axios.get(`http://localhost:5001/getCartByEmail/`, { withCredentials: true });
        setProducts(response.data);
        calculateTotalPrice(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);
  
  const calculateTotalPrice = (items) => {
    const total = items.reduce((total, item) => total + item.price, 0);
    setTotalPrice(total);
    // if (totalPrice === 0) {
    //   alert("Please add products to the cart before making a payment.");
    // }
  };
// for making payment 

const makePayment = async () => {
  try {
    if (totalPrice === 0) {
     return  alert("Please add products to the cart before making a payment.");
    }
    const stripe = await loadStripe("pk_test_51OduLoSEuj58CJVx7U4snk3y0yi7VrFLNTiWyvRbKfMqvcvOkRJ1dN5v265uHqLYMUQ9tE633lbn635Qki4LK6mz00v2ePwhFP");
    console.log(products);
    const result =  axios.delete("http://localhost:5001/clearCart",  {
      withCredentials: true // Include credentials in the request
    });
    const itemsToSend = products.map((product, index) => ({
      id: index,
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    }));
    console.log(itemsToSend);
    
    const userDetails = {
      name: name,
      address: address,
      city: city,
      postalCode: postalcode,
      state: state,
       // assuming userEmail is declared and holds the actual user's email
    };
    console.log(userDetails);
    

    // Using axios for the POST request
    const response = await axios.post("http://localhost:5001/create-checkout-session", {
      items: itemsToSend,
      userDetails: userDetails
    }, {
      withCredentials: true // Include credentials in the request
    });

    const session = response.data;
    console.log(session);


    if (response.status === 200 && session.sessionId) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });
      

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error("Session ID not received from backend");
    }
  } catch (error) {
    console.error("Error in making payment: ", error);
  }
};

  return (
    <>
    <ExampleNavbarFive/>
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <div className="overflow-hidden  rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <form>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <h3
                          id="contact-info-heading"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Contact information
                        </h3>

                        <div className="mt-4 w-full">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="name"
                          >
                            Full Name
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            id="name"
                          ></input>
                        </div>
                      </div>
                      
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                autoComplete="street-address"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                autoComplete="address-level2"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="region"
                                name="region"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                autoComplete="address-level1"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal code
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="postal-code"
                                name="postal-code"
                                value={postalcode}
                                onChange={(e) => setPostalcode(e.target.value)}
                                autoComplete="postal-code"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                        <div className="mt-6 flex items-center">
                          <input
                            id="same-as-shipping"
                            name="same-as-shipping"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <div className="ml-2">
                            <label
                              htmlFor="same-as-shipping"
                              className="text-sm font-medium text-gray-900"
                            >
                              Same as shipping information
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                      <button
                        type="button"
                        onClick={makePayment}
                          className="rounded-md bg-[#617a4f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#617a4f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Make payment
                      </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="bg-gray-100 px-5 py-6 md:px-8">
      <div className="flow-root">
        <ul className="-my-7 divide-y divide-gray-200">
          {products.map((product) => (
            <li
              key={product._id}
              className="flex items-stretch justify-between space-x-5 py-7"
            >
              <div className="flex flex-1 items-stretch">
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="ml-5 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold">{product.title}</p>
                    <p className="mt-1.5 text-sm font-medium text-gray-500">
                      {product.dimensions}
                    </p>
                  </div>
                  <p className="mt-4 text-xs font-medium ">x {product.quantity}</p>
                </div>
              </div>
              <div className="ml-auto flex flex-col items-end justify-between">
                <p className="text-right text-sm font-bold text-gray-900">₹{product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <hr className="mt-6 border-gray-200" />
      <form action="#" className="mt-6">
        <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
          
          <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
            {/* You can add a button here to apply the coupon code */}
          </div>
        </div>
      </form>
      <ul className="mt-6 space-y-3">
        <li className="flex justify-between">
          <p className="text-sm font-medium text-gray-500">Total Price</p>
          <p className="text-sm font-bold text-gray-900">₹{totalPrice}</p>
        </li>
        {/* Add more list items here if you have additional pricing details like shipping, taxes, etc. */}
      </ul>
    </div>
        </div>
      </div>
    </div>
    </>
  )
}
