const express = require("express");
const router = express.Router();
const sellerModel = require("../Models/Seller");
const multer = require("multer");
const authMiddleware = require("../Middlewares/AdminMiddleware");

const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mentorconnect",
    allowed_formats: ["jpg", "jpeg", "png", "avif", "webp"],
  },
});

const upload = multer({ storage });

router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
      console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const newItem = new sellerModel({
      itemName: req.body.itemName,
      personName: req.body.personName,
      description: req.body.description,
      price: req.body.price,
      contactNumber: req.body.contactNumber,

      //  Cloudinary URL (IMPORTANT CHANGE)
      image: req.file.path,

      sellerId: req.userId,
    });

    await newItem.save();

    res.json({ message: "Item successfully inserted", item: newItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading item" });
  }
});

// ---------------- GET MY ITEMS ----------------
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const items = await sellerModel.find({
      sellerId: req.userId,
      soldStatus: false,
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// ---------------- GET OTHER USERS ITEMS ----------------
router.get("/allitems", authMiddleware, async (req, res) => {
  try {
    const items = await sellerModel.find({
      soldStatus: false,
      sellerId: { $ne: req.userId },
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// ---------------- SOLD ITEMS ----------------
router.get("/sold", authMiddleware, async (req, res) => {
  try {
    const items = await sellerModel.find({
      sellerId: req.userId,
      soldStatus: true,
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- MARK AS SOLD ----------------
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