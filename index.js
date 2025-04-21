import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import producerAuthRoutes from "./routes/producer/auth.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 8000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB Database");
}).catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/producer", producerAuthRoutes);

app.use((err,req,res,next)=>{
  const status = err.status || 500
  const message = err.message || "Unknown Error Occured"
  return res.status(status).json({
      success: false,
      status,
      message
  })
})

app.listen(PORT || 8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
