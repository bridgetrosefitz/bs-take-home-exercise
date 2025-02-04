import * as db from "../db/index.js";

const getFilteredProducts = async (req, res) => {
  // TO DO: Error handling
  const queryArgs =
    req.query.characteristic === undefined
      ? [`SELECT * FROM products`]
      : [
          `SELECT p.* FROM products p 
    JOIN products_characteristics pc ON p.id = pc.product_id 
    JOIN characteristics c ON pc.characteristic_id = c.id 
    WHERE c.name = $1`,
          [req.query.characteristic],
        ];
  const result = await db.query(...queryArgs);

  res.json(result.rows);
};

const getProductScores = async (_req, res) => {
  // TO DO: Error handling
  const results = await db.query(
    `SELECT p.name AS product_name,
    COALESCE(SUM(c.score_value), 0) AS total_score
    FROM products p
    LEFT JOIN products_characteristics pc ON p.id = pc.product_id
    LEFT JOIN characteristics c ON pc.characteristic_id = c.id
    GROUP BY p.name
    ORDER BY total_score DESC
    `
  );

  res.json(results.rows);
};

export default { getFilteredProducts, getProductScores };
