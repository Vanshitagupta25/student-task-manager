import express from "express";
const app  = express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./routes/auth.js"
import list from "./routes/list.js"
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", auth);
app.use("/api/v2", list);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 2000;


app.get("/", (req,res) => {
  res.send("Server is working");
})

app.listen(PORT, (req,res) => {
  console.log(`Server is listening on port, ${PORT}`);
});