import express from "express";
import redis from "redis";
import productsRouter from "./routes/products.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3005;
export const redisClient = await redis
  .createClient()
  .on("error", err => {
    console.error("Redis Client Error", err);
  })
  .connect();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Use the routes
app.use("/products", productsRouter);

app.get("/", (_req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
