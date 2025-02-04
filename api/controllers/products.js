import * as db from "../db/index.js";

const getFilteredProducts = async (req, res) => {
  const result = await db.query(
    `SELECT p.* FROM products p 
    JOIN products_characteristics pc ON p.id = pc.product_id 
    JOIN characteristics c ON pc.characteristic_id = c.id 
    WHERE c.name = $1`,
    [req.query.characteristic]
  );

  res.json(result.rows);
};

export default { getFilteredProducts };
