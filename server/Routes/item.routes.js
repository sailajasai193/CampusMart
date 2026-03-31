const express = require("express");
const router = express.Router();
const sellerModel = require("../Models/Seller");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../Middlewares/AdminMiddleware");

const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null,"uploads/");
  },
  filename:function (req,file,cb) {
    cb(null, Date.now()+ path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const newItem = new sellerModel({
      itemName: req.body.itemName,
      personName: req.body.personName,
      description: req.body.description,
      price: req.body.price,
      contactNumber: req.body.contactNumber,
      image: req.file.filename,
      sellerId:req.userId   
    });

    await newItem.save();

    res.json({ message: "Item successfully inserted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading item" });
  }
});

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const items = await sellerModel.find({
      sellerId: req.userId,
      soldStatus: false
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});



router.get("/allitems", authMiddleware,async (req, res) => {
  try {
    const items = await sellerModel.find({
      soldStatus: false,
      sellerId: { $ne: req.userId }   
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});


router.get("/sold", authMiddleware, async (req, res) => {
  try {

    const items = await sellerModel.find({
      sellerId: req.userId,
      soldStatus: true
    });

    res.json(items);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});




router.put("/sold/:id", authMiddleware, async (req, res) => {
  try {
    const item = await sellerModel.findByIdAndUpdate(
      req.params.id,
      { soldStatus: true },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;