const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/recommend", (req, res) => {

  const { product, years_used, condition } = req.body;
   console.log("Body:", req.body);
  const pythonProcess = spawn("python", [
    "../ML_Model/predict.py",
    product,
    years_used,
    condition
  ]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    console.log("Python output:", data.toString());
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.log("Python error:", data.toString());
  });

  pythonProcess.on("close", () => {
    res.json({ predicted_price: result.trim() });
  });

});

module.exports = router;