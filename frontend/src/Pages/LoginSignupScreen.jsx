import { ExampleNavbarThree } from "../Components/NavBarPreLogin"
import logo from '../assets/logomain.png'
import { Link } from "react-router-dom"
function LoginSignupScreen() {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-white ">
          <div className="w-full top-0 fixed">
            <ExampleNavbarThree/>
          </div>
          <div className="p-6 bg-neutral-100 rounded shadow-md w-96 flex-col justify-evenly">
          <img src={logo} alt="Logo" className="mx-auto h-40" />
          <div className="flex justify-evenly">
          <Link to="/login">
          <button className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald">
          Login
          </button>
          </Link>
          <Link to="/signup">
          <button className="px-4 py-2 text-white bg-emerald-600 rounded hover:bg-emerald">
          Signup
          </button>
          </Link>
          </div>
          </div>
    </div>
  )
}

export default LoginSignupScreen