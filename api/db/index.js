import pg from "pg";
const { Pool } = pg;

const pool = new Pool({ database: "berry-street-takehome-1" });

export const query = async (text, params, callback) => {
  return pool.query(text, params, callback);
};
