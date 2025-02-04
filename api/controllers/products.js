import * as db from "../db/index.js";

const totalScoreCalcQuery = `CAST(COALESCE(SUM(c.score_value), 0) AS INTEGER) AS total_score`;

const getFilteredProducts = async (req, res) => {
  // TO DO: Error handling
  const hasFilter = req.query.characteristic !== undefined;
  const queryArgs = [
    `SELECT 
      p.id, 
      p.name, 
      ARRAY_AGG(c.name) AS characteristics,
      ${totalScoreCalcQuery} 
      FROM products p 
      JOIN products_characteristics pc ON p.id = pc.product_id 
      JOIN characteristics c ON pc.characteristic_id = c.id 
      ${hasFilter ? "WHERE c.name = $1" : ""}
      GROUP BY p.id`,
    hasFilter ? [req.query.characteristic] : [],
  ];
  const result = await db.query(...queryArgs);

  res.json(result.rows);
};

const getProductScores = async (_req, res) => {
  // TO DO: Error handling
  const results = await db.query(
    `SELECT 
    p.id,
    p.name AS product_name,
   ${totalScoreCalcQuery}
    FROM products p
    LEFT JOIN products_characteristics pc ON p.id = pc.product_id
    LEFT JOIN characteristics c ON pc.characteristic_id = c.id
    GROUP BY p.id
    ORDER BY total_score DESC
    `
  );

  res.json(results.rows);
};

export default { getFilteredProducts, getProductScores };
