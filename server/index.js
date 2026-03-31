// const express = require("express");
// const mongoose = require("mongoose");
// const multer=require("multer");
// const path=require("path")
// require("dotenv").config();

// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(cors());

// app.use("/uploads", express.static("uploads"));

// const authRoutes=require('./Routes/Singup.routes');
// const itemRoutes=require('./Routes/item.routes');
// const SearchItems=require('./Routes/search.routes')
// const recommendRoutes = require("./Routes/Recommend.routes");



// mongoose.connect("mongodb://localhost:27017/mydatabase")
// .then(() => {
//     console.log("MongoDB Connected");

//     app.use("/api/auth",authRoutes)
//     app.use("/api/items",itemRoutes)
//     app.use("/api/searchItem",SearchItems)
//     app.use("/api", recommendRoutes);

//     app.listen(port,() => {
//         console.log(`Server running at ${port}`);
//     });
// })
// .catch((err) => console.log(err));


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

// Your routes
const authRoutes = require("./Routes/Singup.routes");
const itemRoutes = require("./Routes/item.routes");
const SearchItems = require("./Routes/search.routes");
const recommendRoutes = require("./Routes/Recommend.routes");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.use("/api/auth", authRoutes);
    app.use("/api/items", itemRoutes);
    app.use("/api/searchItem", SearchItems);
    app.use("/api", recommendRoutes);

    app.listen(port, () => {
      console.log(`Server running at ${port}`);
    });
  })
  .catch((err) => console.log(err));
