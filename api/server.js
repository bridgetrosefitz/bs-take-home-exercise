import express from "express";
import productsRouter from "./routes/products.js";
import testRouter from "./routes/test.js";
import cors from "cors";
import * as db from "./db/index.js";
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

app.get("/message", async (_req, res) => {
  try {
    const result = await db.query("SELECT $1::text as message", ["Hi"]);
    res.json({ message: result.rows[0].message });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/test-products", async (_req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    res.json(result);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (_req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
