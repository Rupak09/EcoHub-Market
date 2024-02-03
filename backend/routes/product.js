const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userMiddleware = require('../middlewares/user')
const jwt = require("jsonwebtoken");
const innovativeProd = require("../models/innovativeProdModel");
const Stripe = require("stripe")("sk_test_51OduLoSEuj58CJVxfj0JxednavltZr3C59KJx9Ik6b9ZhHw6AmMigGRBri6vNvJkvOp1GGaT0ZUElG21zUdPQer6005hR0RkBD")


require("dotenv").config();

const User = require("../models/user")
router.get("/getInnovativeProd", userMiddleware,async (req, res) => {
    try {
        console.log("first")
       console.log(req.user.email);
        console.log("cookie data")
        const allInnovativeProds = await innovativeProd.find();
        res.json(allInnovativeProds);
    } catch (error) {
        console.error("Error getting all innovative products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/getInnovativeProd/:id",userMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const innovativeProdById = await innovativeProd.findById(id);
  
        if (innovativeProdById ) {
            res.json(innovativeProdById );
        } else {
            res.status(404).json({ msg: "Innovative request not found" });
        }
    } catch (error) {
        console.error("Error fetching waste request:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
  });
  router.get('/search', async (req, res) => {
    try {
      const query = req.query.query;
      const products = await innovativeProd.find({ 
        title: { $regex: query, $options: 'i' } // Case-insensitive search
      });
      
      res.json(products);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  module.exports = router;