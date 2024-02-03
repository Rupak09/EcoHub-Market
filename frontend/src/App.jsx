import './App.css'
import LoginPage from './Pages/LoginScreen'
import LoginSignupScreen from './Pages/LoginSignupScreen'
import { Route,Routes } from 'react-router-dom'
import SignupPage from './Pages/SignUpScreen'
import ForgotPasswordPage from './Pages/ForgotPassword'
import HomePage from './Pages/HomePage'
import ProductOverviewTwo from './Components/ProductOverview'
import { CartTwo } from './Components/Cart'
import { CheckoutTwo } from './Components/Checkout'
import PaymentSuccess from './Pages/PaymentSuccess'
import PaymentFailure from './Pages/PaymentFailure'
import { Checkout } from './Components/Checkout2'
import ProfilePage from './Pages/ProfilePage'
import { HeroThree } from './Pages/IntroScreen';
import TableOne from './Pages/About'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HeroThree />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage/>} />
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/product/:id" element={<ProductOverviewTwo/>} />
        <Route path="/cart" element={<CartTwo/>} />
        <Route path="/checkout" element={<CheckoutTwo/>} />
        <Route path ='/icheckout'element={<Checkout/>}/>
        <Route path="/success" element={<PaymentSuccess/>} />
        <Route path="/failure" element={<PaymentFailure/>} />
        <Route path="/profilepage" element={<ProfilePage/>} />
        <Route path="/about" element={<TableOne/>} />
      </Routes>
    </div>
  )
}

export default App
