const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userMiddleware = require('../middlewares/user')
const jwt = require("jsonwebtoken");
const innovativeProd = require("../models/innovativeProdModel");
const stripe = require("stripe")("sk_test_51OduLoSEuj58CJVxfj0JxednavltZr3C59KJx9Ik6b9ZhHw6AmMigGRBri6vNvJkvOp1GGaT0ZUElG21zUdPQer6005hR0RkBD")
require("dotenv").config();
const cart = require('../routes/cart');
const product= require('../routes/product')
const User = require("../models/user")
const { sendVerificationEmail } = require('../utils/emailService.js'); // Updated import
const { sendResetEmail } = require('../utils/emailService.js'); // Updated import
// ... Rest of your code



//verification-email
const verification_key = (email) => {
  // use user._id , email for it to generate verification key 
return jwt.sign({ email:email }, secretKey, { expiresIn: '1d' });
}
const passwordResetToken = (email) => {
  return jwt.sign({ email: email }, secretKey, { expiresIn: '1d' });
};

const secretKey = 'Bharath601';


// verification-email


router.post("/signup", async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const cPassword = req.body.cPassword;

    // Input handling
    if (!username || !email || !password || !cPassword) {
        return res.status(400).json("All fields are required.");
    }
    
    if (!email.includes('@')) {
        return res.status(400).json('Enter a correct email address.');
    }    
    if(password.length<8){
        return res.json("Password should contain atleast 8 characters")
    }
    if(password !== cPassword){
        return res.json("Password and Confirm password should be same")
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ email});
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const Uemail = user.email
    sendVerificationEmail(email, verification_key(Uemail));
    // Save the user to the database
    await user.save();
    res.status(201).json({ msg: 'User created successfully' });
})

router.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });

  // Check if the user exists
  if (!user) {
      return res.json({ msg: 'Incorrect email and password' });
  }
  if(user.verified){
  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
      const token = jwt.sign({ email: email }, process.env.SECRET, { expiresIn: "1h" });
      res.cookie("token", token, {
          httpOnly: true,
      });

      // Return the user's email in the response
      return res.status(200).json({ msg: "Login successful", email: user.email });
    }
  } else {
      return res.json({ msg: 'Incorrect email and password' });
  }
});

router.get('/user', userMiddleware, async (req, res) => {
  try {
      // Fetching user by email
      const email = req.user.email;
      const user = await User.findOne({ email: email });

      if (!user) {
          return res.status(404).send('User not found');
      }

      // Extracting boughtProducts and filtering out Stripe session IDs
      const boughtProducts = user.boughtProducts.map(product => {
          const { stripeSessionId, ...productDetails } = product;
          return productDetails;
      });

      // Sending the modified response
      res.json({
          username: user.username,
          email: user.email,
          boughtProducts: boughtProducts
      });
      console.log(res.json)
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

//// test card -> india 4000003560000008
router.post('/create-checkout-session',userMiddleware, async (req, res) => {
  try {
    const email = req.user.email; 
    console.log(email)
    const { items, userDetails } = req.body;

    // Create line items for Stripe checkout
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session with shipping details
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:5173/success`,
      cancel_url: 'http://localhost:5173/failure',
      shipping_address_collection: {
        allowed_countries: ['IN'], // Assuming the shipping is within India
      },
      metadata: {
        customerName: userDetails.name,
        customerAddress: userDetails.address,
        customerCity: userDetails.city,
        customerState: userDetails.state,
        customerPostalCode: userDetails.postalCode,
      },
      customer_email: email, // To prefill the customer's email
    });

    // Update user's boughtProducts with purchase details
    const user = await User.findOne({ email: email});
    if (user) {
      user.boughtProducts.push({
        stripeSessionId: session.id,
        name: userDetails.name,
        address: userDetails.address,
        city: userDetails.city,
        postalCode: userDetails.postalCode,
        state: userDetails.state,
        products: items,
      });
      console.log(user.boughtProducts)
      await user.save();
    } else {
      // User not found. Handle according to your requirements
    }

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Here you'd handle a successful checkout, which you're probably already doing
  }

  // Handle the cancellation event (this is a placeholder, use the correct event name)
  if (event.type === 'checkout.session.canceled') {
    const session = event.data.object;

    // Find the user and delete the corresponding boughtProducts entry
    await User.updateOne(
      { email: session.customer_email },
      { $pull: { boughtProducts: { stripeSessionId: session.id } } }
    );
  }

  res.json({received: true});
});
// emial verification and 


router.get('/verify-email', async (req, res) => {
  try {
    const token = req.query.token;

    // Verify the token
    const payload = jwt.verify(token, secretKey);

    console.log(payload.email);
    const user = await User.findOne({ email: payload.email });
    
    if (!user) {
      return res.status(404).send('User not found.');
    }

    
    user.verified = true;
    

    // Save the user's changes
    await user.save();

    res.send('Email successfully verified!');
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(400).send('Invalid or expired token.');
  }
});

router.get('/verifyReset-email', async (req, res) => {
  try {
    const token = req.query.token;

    // Verify the token
    const payload = jwt.verify(token, secretKey);

    console.log(payload.email.email);
    const user = await User.findOne({ email: payload.email.email });
    
    if (!user) {
      return res.status(404).send('User not found.');
    }

    
    user.verified = true;
    

    // Save the user's changes
    await user.save();

    res.send('Email successfully verified!');
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(400).send('Invalid or expired token.');
  }
});

// forgot password logic 
router.post('/forgot_password',async(req,res)=>{
  try {
    console.log(req.body);
    const {email} = req.body;
    const exsist= await User.findOne({ email: email.toLowerCase() });
    if (!exsist) {
      return res.status(400).send('please give accurate email');
    }
    const resetToken = verification_key(exsist);
    console.log(resetToken)
    const Uemail=exsist.email
    console.log(exsist.email)
    exsist.verified=false;
    sendResetEmail(Uemail,resetToken);
    res.status(201).send("please check ur email we have sent you the mail , to correct the password")

  } catch (error) {
    res.status(400).send(error.message);
  }
})
//verify reset password logic

router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    

    // Find the user by email (assuming email is unique)
    const user = await User.findOne({ email: email });

   

    if(user.verified==true){

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password with the hashed password
    user.password = hashedPassword;
    await user.save();

    res.status(200).send('Password successfully updated  u can return to login ');
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.status(400).send('Invalid or expired token.');
    } else {
      res.status(500).send(error.message);
    }
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ message: 'Logged out successfully' });
});




module.exports = router;