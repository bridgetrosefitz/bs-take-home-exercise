import express from "express";
import productsRouter from "./routes/products.js";
import testRouter from "./routes/test.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3005;

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Use the routes
app.use("/products", productsRouter);
app.use("/test", testRouter);

app.get("/", (_req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
