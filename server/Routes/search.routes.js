const Product = require("../Models/Seller");
const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/AdminMiddleware");


router.get("/search",authMiddleware, async (req, res) => {
  try {
    const search = req.query.q;

    if (!search) {
      return res.status(400).json({ msg: "Search text missing" });
    }

    const products = await Product.find({
      itemName: { $regex: search, $options: "i" },
      soldStatus: false,
      sellerId: { $ne: req.userId }   
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;