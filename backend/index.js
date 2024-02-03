const express = require("express")
const cookieParser = require("cookie-parser")
const app = express();
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/connect")
const userRouter = require("./routes/user");
const productRouter = require('./routes/product');
const cartRouter =require("./routes/cart")

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend domain
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT, ()=>{
    console.log("Server running on port " + process.env.PORT);
})