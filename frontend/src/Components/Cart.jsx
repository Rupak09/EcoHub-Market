import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExampleNavbarFive } from './NavBarCartsLogin';

export function CartTwo() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
    
      try {

        const userEmail = localStorage.getItem("email");
        console.log(userEmail)
        const response = await axios.get(`http://localhost:5001/getCartByEmail/`, { withCredentials: true });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate the total price, discount, etc. based on the cartItems
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const discount = cartItems.reduce((total, item) => {
    return total + (item.originalPrice - item.price);
  }, 0);

  const handleRemove = async (itemIndex) => {
  
    console.log(itemIndex)// Replace with the logged-in user's email
    try {
      const response = await axios.post(`http://localhost:5001/removeFromCart`, {
        
        itemIndex
      },{ withCredentials: true });
  
      if (response.status === 200) {
        // If the item is successfully removed from the backend, update the state
        setCartItems(prevItems => prevItems.filter((_, index) => index !== itemIndex));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error.response ? error.response.data.msg : error.message);
    }
  };
  



  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
    <ExampleNavbarFive/>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20"> {/* Added py-20 for vertical padding */}
      <div className="flex flex-col lg:flex-row gap-x-8 items-start lg:items-center"> {/* Added items-center for vertical centering */}
        {/* Cart Items */}
        <div className="flex-1">
          {cartItems.map((item, index) => (
            <div key={item._id} className="flex items-center py-6 border-b border-gray-200">
              <img src={item.image} alt={item.title} className="h-24 w-24 flex-shrink-0 rounded-md object-cover" />
              <div className="ml-6 flex flex-1 flex-col">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <button onClick={() => handleRemove(index)} className="text-red-600 hover:text-red-900">
                    Remove
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">Dimensions: {item.dimensions}</p>
                <div className="flex items-end justify-between">
                  <p className="mt-1 text-sm font-medium text-gray-900">₹{item.price}</p>
                  <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Price Details */}
        <div className="w-full lg:w-1/4 bg-white p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Price Details</h3>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Price ({cartItems.length} items)</p>
              <p className="text-sm font-medium text-gray-900">₹{totalPrice}</p>
            </div>
            {/* Add Discount and Delivery charges details here if you have them */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <h4 className="text-base font-medium text-gray-900">Total Amount</h4>
                <p className="text-base font-medium text-gray-900">₹{totalPrice}</p>
              </div>
              <button onClick={handleCheckout} className="mt-6 w-full bg-green-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  
  
        }  



// return (
  //   <div className="mx-auto max-w-7xl px-2 lg:px-0">
  //     <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
  //       <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
  //         Shopping Cart
  //       </h1>
  //       <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
  //         <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
  //           <h2 id="cart-heading" className="sr-only">
  //             Items in your shopping cart
  //           </h2>
  //           <ul role="list" className="divide-y divide-gray-200">
  //             {cartItems.map((product) => (
  //               <li key={product._id} className="flex py-6 sm:py-6">
  //                 <div className="flex-shrink-0">
  //                   <img
  //                     src={product.image}
  //                     alt={product.title}
  //                     className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
  //                   />
  //                 </div>

  //                 <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
  //                   <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
  //                     <div>
  //                       <div className="flex justify-between">
  //                         <h3 className="text-sm">
  //                           <a href="#" className="font-semibold text-black">
  //                             {product.title}
  //                           </a>
  //                         </h3>
  //                       </div>
  //                       <p className="mt-1 text-sm text-gray-500">{product.materialUsed}</p>
  //                       <p className="mt-1 text-sm text-gray-500">{product.dimensions}</p>
  //                       <div className="mt-1 flex items-end">
  //                         <p className="text-xs font-medium text-gray-500 line-through">
  //                           {/* Assuming you have a way to calculate or store the original price */}
  //                         </p>
  //                         <p className="text-sm font-medium text-gray-900">
  //                           ₹{product.price}
  //                         </p>
  //                         <p className="text-sm font-medium text-green-500">
  //                           {/* Assuming you have a way to calculate or store the discount */}
  //                         </p>
  //                       </div>
  //                     </div>
  //                     {/* Quantity and remove button */}
  //                     {/* ... */}
  //                   </div>
  //                 </div>
  //               </li>
  //             ))}
  //           </ul>
  //         </section>
  //         {/* Order summary */}
  //         {/* ... */}
  //       </form>
  //     </div>
  //   </div>
  // );