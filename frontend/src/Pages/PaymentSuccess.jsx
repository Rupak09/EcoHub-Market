import { Link } from "react-router-dom"
function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-white ">
          <div className="w-full top-0 fixed">
          </div>
          <div className="p-6 bg-neutral-100 rounded shadow-md w-96 flex-col justify-evenly">
            <h1 className="font-bold text-center">PAYMENT SUCCESS</h1>
          <div className="flex justify-evenly">
          <Link to="/homepage">
          <button className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald">
          Return to HomePage
          </button>
          </Link>
          </div>
          </div>
    </div>
  )
}

export default PaymentSuccess