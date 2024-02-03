import { Link } from "react-router-dom"
function PaymentFailure() {
  const handleUnlock = async () => {
    try {
      await axios.delete('http://localhost:5001/delete-last-product', { withCredentials: true }); // Replace with your actual API endpoint
    
     
    } catch (error) {
      console.error('Error during the delete request', error);
    }
  };
  return (
    
    <div className="flex flex-col items-center justify-center  min-h-screen bg-white ">
          <div className="w-full top-0 fixed">
          </div>
          <div className="p-6 bg-neutral-100 rounded shadow-md w-96 flex-col justify-evenly">
            <h1 className="font-bold text-center">PAYMENT FAILURE</h1>
          <div className="flex justify-evenly">
          <Link to="/checkout">
          <button onClick={handleUnlock} className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald">
          Return to Checkout
        </button>
          </Link>
          </div>
          </div>
    </div>
  )
}

export default PaymentFailure