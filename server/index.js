const express = require("express");
const mongoose = require("mongoose");
const multer=require("multer");
const path=require("path")
require("dotenv").config();

const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const authRoutes=require('./Routes/Singup.routes');
const itemRoutes=require('./Routes/item.routes');
const SearchItems=require('./Routes/search.routes')
const recommendRoutes = require("./Routes/Recommend.routes");




app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/searchItem", SearchItems);
app.use("/api", recommendRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch((err) => console.log(err));



